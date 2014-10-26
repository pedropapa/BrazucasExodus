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

    var broadcastUsuariosInfo = function(callback) {
      // Captura alterações de todos os usuários já adicionados ao banco.
      Usuario.find().exec(function(e, usuarios) {
        if(usuarios.length > 0) {
          Usuario.subscribe(socket, usuarios);

          sails.sockets.customBroadcastTo(socket, 'usuario', 'create', usuarios);
        }

        callback();
      });
    }

    var joinRooms = function(callback) {
      // Sala padrão do chat geral do UCP.
      sails.sockets.join(socket, Salas.geral);

      // Sala própria do jogador (para conversas particulares)
      sails.sockets.join(socket, socket.id);

      callback();
    }

    var createUser = function(callback) {
      if(!session.usuario) {
        CoreService.criarUsuario(session, socket, callback);
      } else {
        Usuario.findOne({id: session.usuario.id }).exec(function(error, Usuario) {
          if(Usuario == undefined) {
            CoreService.criarUsuario(session, socket, callback);
          }
        });
      }
    }

    var finishRequest = function(err, results) {

      // Envia informações básicas do servidor RPG/Minigames para o jogador.
      var objectToBlast = SampSocketService.serverBasicStats;
      objectToBlast.sampAction = "updateServerBasicStats";
      sails.sockets.emit(socket.id, objectToBlast);

      // Envia para o jogador se o servidor RPG/Minigames está ou não online.
      if(SampSocketService.isConnected) {
        sails.sockets.emit(socket.id, { sampAction: 'serverRpgMinigamesConnect', ip: sails.config.brazucasConfig.serverIp, port: sails.config.brazucasConfig.serverSocketPort });
      } else {
        sails.sockets.emit(socket.id, { sampAction: 'serverRpgMinigamesDisconnect' });
      }
    }

    async.series([
      broadcastUsuariosInfo,
      joinRooms,
      createUser
    ], finishRequest);
  },

  /**
   * Funcão chamada quando um novo socket se desconecta da aplicação
   *
   */
  onDisconnect: function(session, socket) {
    if(session.usuario) {
      Usuario.destroy({id: session.usuario.id }).exec(function(error) {
        if(!error) {
          Usuario.publishDestroy(session.usuario.id, socket, {previous: session.usuario});
        }
      });
    }
  },

  blastMessage: function(data, room) {
    if(room) {
      // Transmite a mensagem para uma determinada sala.
      sails.sockets.broadcast(room, {sampAction: data.action, socketId: (data.req)?data.req.socket.id:false, username: data.username, message: data.message, source: data.source, extra: data.extra});
    } else {
      // Transmite a mensagem para todos os usuários do UCP.
      sails.sockets.blast({ sampAction: data.action, socketId: (data.req)?data.req.socket.id:false, username: data.username, message: data.message, source: data.source});

      SampSocketService.send('action='+data.action+'&username='+data.username+'&message='+data.message+'&source='+data.source+'&room='+room);
    }
  }
}