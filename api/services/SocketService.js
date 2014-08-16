/**
 * Service responsável pelos métodos utilizados por requisições de sockets da aplicação.
 *
 */
module.exports = {
  /**
   * Funcão chamada quando um novo socket se conecta a aplicação
   *
   */
  main: function(session, socket) {
    // Captura alterações dos futuros usuários adicionados ao banco.
    Usuario.watch(socket);

    // Captura alterações de todos os usuários já adicionados ao banco.
    Usuario.find().exec(function(e, usuarios) {
      for(x in usuarios) {
        // @TODO
        // Verificar uma melhor forma enviar a lista de usuários para o cliente, req.socket.emit(usuarios) ???
        Usuario.subscribe(socket, usuarios[x]);
        Usuario.publishCreate(usuarios[x]);
      }
    });

    // Sala padrão do chat geral do UCP.
    sails.sockets.join(socket, Salas.geral);

    if(!session.usuario) {
      console.log('Cliente ainda não possui um usuário, criando...');

      CoreService.criarUsuario(session);
    } else {
      Usuario.find({id: session.usuario.id }).exec(function(error, Usuario) {
        if(Usuario.length == 0) {
          console.log('Cliente possui um usuário mas este não foi encontrado na base, criando...');

          CoreService.criarUsuario(session);
        } else {
          console.log('Cliente já possui um usuário.');
        }
      });
    }
  },

  blastMessage: function(req, res, room) {
    if(req.session.usuario) {
      if(room) {
        // Transmite a mensagem para uma determinada sala.
        sails.sockets.broadcast(room, { sampAction: 'chatMessage', username: req.session.usuario.username, message: req.param('message'), source: 'ucp'});
      } else {
        // Transmite a mensagem para todos os usuários do UCP.
        sails.sockets.blast({ sampAction: 'chatMessage', username: req.session.usuario.username, message: req.param('message'), source: 'ucp'});
      }

      res.json({message: 'success'}, 200);
    } else {
      res.json({error: true}, 300);
    }
  }
}