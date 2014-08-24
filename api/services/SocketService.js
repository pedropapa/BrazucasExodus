/**
 * Service responsável pelos métodos utilizados por requisições de sockets da aplicação.
 *
 */
module.exports = {
  /**
   * Funcão chamada quando um novo socket se conecta a aplicação
   *
   */
  onConnect: function(session, socket) {
    // Diz para o cliente qual é o socketId dele.
    sails.sockets.customBroadcastTo(socket, 'usuario', 'init', socket.id);

    // Captura alterações dos futuros usuários adicionados ao banco.
    Usuario.watch(socket);

    // Captura alterações de todos os usuários já adicionados ao banco.
    Usuario.find().exec(function(e, usuarios) {
      if(usuarios.length > 0) {
        Usuario.subscribe(socket, usuarios);

        sails.sockets.customBroadcastTo(socket, 'usuario', 'create', usuarios);
      }
    });

    // Sala padrão do chat geral do UCP.
    sails.sockets.join(socket, Salas.geral);

    // Sala própria do jogador (para conversas particulares)
    console.log('Sala própria: '+socket.id);
    sails.sockets.join(socket, socket.id);

    if(!session.usuario) {
      console.log('Cliente ainda não possui um usuário, criando...');

      CoreService.criarUsuario(session, socket);
    } else {
      Usuario.find({id: session.usuario.id }).exec(function(error, Usuario) {
        if(Usuario.length == 0) {
          console.log('Cliente possui um usuário mas este não foi encontrado na base, criando...');

          CoreService.criarUsuario(session, socket);
        } else {
          console.log('Cliente já possui um usuário.');
        }
      });
    }
  },

  /**
   * Funcão chamada quando um novo socket se desconecta da aplicação
   *
   */
  onDisconnect: function(session, socket) {
    Usuario.destroy({id: session.usuario.id }).exec(function(error) {
      if(!error) {
        Usuario.publishDestroy(session.usuario.id, socket, {previous: session.usuario});
      }
    });
  },

  blastMessage: function(data, room) {
    if(room) {
      // Transmite a mensagem para uma determinada sala.
      sails.sockets.broadcast(room, {sampAction: data.action, socketId: (data.req)?data.req.socket.id:false, username: data.username, message: data.message, source: data.source, extra: data.extra});
    } else {
      // Transmite a mensagem para todos os usuários do UCP.
      sails.sockets.blast({ sampAction: data.action, socketId: (data.req)?data.req.socket.id:false, username: data.username, message: data.message, source: data.source});
    }

    // @TODO
    // Verificar uma melhor maneira de enviar os comandos para o servidor SA-MP, o ideal seria enviar em forma de array.
    if(data.source == Local.ucp) {
      SampSocketService.send('action='+data.action+'&username='+data.username+'&message='+data.message+'&source='+data.source+'&room='+room);
    }
  }
}