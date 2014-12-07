/**
 * SocketController
 *
 * @module      :: Controller
 * @description	:: Controller responsável por todas as requisições através dos sockets.
 */

module.exports = {


  /**
   * Action blueprints:
   *    `/default/main`
   */
   main: function (req, res) {

  },

  /**
   * Action chatMessage
   *
   * Responsável por receber mensagens globais do webchat.
   *
   * @param req
   * @param res
   */
  chatMessage: function (req, res) {
    if(req.param('message').length <= sails.config.brazucasConfig.maxChatMessageLength) {
      SocketService.blastMessage({username: req.session.usuario.username, message: req.param('message'), req: req, source: Local.ucp, action: 'chatMessage'}, Salas.geral, true);
    }

    res.json({message: 'success'}, 200);
  },

  /**
   * Action chatMessage
   *
   * Responsável por receber mensagens particulares do webchat.
   *
   * @param req
   * @param res
   */
  particularChatMessage: function(req, res) {
    targetUsername = req.param('target');
    salaId = req.param('salaId');

    if(targetUsername !== req.session.usuario.username) {
      Usuario.findOne({username: targetUsername}).exec(function(err, objUsuario) {
        if(!err && objUsuario !== undefined && req.param('message').length <= sails.config.brazucasConfig.maxChatMessageLength) {
          // Mensagem particular enviada para um jogador logado no servidor.
          if(sails.sockets.subscribers(objUsuario.socketId).indexOf(req.socket.id)) {
            sails.sockets.join(req.socket, objUsuario.socketId);
          }

          if(objUsuario.source == Local.servidor || objUsuario.source == Local.ambos) {
            SocketService.send(SampSocketService.sampSocket, {a: 'particularMessage', from: req.session.usuario.username, to: targetUsername, message: req.param('message'), source: req.session.usuario.source, salaId: salaId});

            // Emite a mensagem para o usuário que está enviando.
            SocketService.blastMessage({username: req.session.usuario.username, message: req.param('message'), req: req, source: objUsuario.source, action: 'particularMessage', extra: {targetUsername: targetUsername, salaId: salaId}}, req.session.usuario.socketId);

//            if(objUsuario.source == Local.ambos || objUsuario.source == Local.ucp) {
//              SocketService.blastMessage({username: req.session.usuario.username, message: req.param('message'), req: req, source: objUsuario.source, action: 'particularMessage', extra: {targetUsername: targetUsername, salaId: salaId}}, objUsuario.socketId);
//            }
          } else if(objUsuario.source == Local.ucp || objUsuario.source == Local.ambos) {
            // Quando o usuário alvo se desconecta e conecta denovo na aplicação devemos conectá-lo novamente na sala particular.
            SocketService.blastMessage({username: req.session.usuario.username, message: req.param('message'), req: req, source: objUsuario.source, action: 'particularMessage', extra: {targetUsername: targetUsername, salaId: salaId}}, objUsuario.socketId);
          }
        } else {
          res.json({error: '500'}, 200);
        }
      });
    }

    res.json({message: 'success'}, 200);
  },

  /**
   * Gera um hash da sala particular entre dois jogadores, este pode ser gerado ao se criar uma nova sala ou se, caso a sala já exista, apenas busca o hash do banco de dados.
   *
   * @param req
   * @param res
   */
  openParticularChat: function(req, res) {
    targetUsername = req.param('targetUsername');

    // Procuramos a sala pelos dois hashs gerados.
    salaId1 = UtilsService.generateHash(targetUsername+req.session.usuario.username);
    salaId2 = UtilsService.generateHash(req.session.usuario.username+targetUsername);

    // Verifica se o jogador requisitante e o jogador requisitado são diferentes.
    if(targetUsername !== req.session.usuario.username) {
      // Verifica se o jogador alvo está conectado.
      Usuario.findOne({username: targetUsername}).exec(function(err, objUsuario) {
        if(!err && objUsuario) {
          // Verifica se a sala entre os dois jogadores já está criada.
          Salas.findOne().where({or: [{salaId: salaId1}, {salaId: salaId2}]}).exec(function(err3, existsSala) {
            if(!existsSala) {
              // Caso não exista, cria.
              Salas.create({salaId: salaId1, usuarioFrom: req.session.usuario.id, usuarioTo: objUsuario.id}).exec(function(err2, newSala) {
                if(!err2) {
                  sails.sockets.join(req.socket, objUsuario.socketId);
                  res.json({message: 'success', salaId: newSala.salaId}, 200);
                } else {
                  res.json({error: 500}, 300);
                }
              })
            } else {
              // Caso exista, envia informações da sala para os usuários.
              sails.sockets.join(req.socket, objUsuario.socketId);
              res.json({message: 'success', salaId: existsSala.salaId}, 200);
            }
          });
        } else {
          res.json({error: 500}, 300);
        }
      });
    } else {
      res.json({error: 500, message: 'Você não pode conversar particularmente consigo mesmo.'}, 300);
    }
  },

  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to DefaultController)
   */
  _config: {}

  
};
