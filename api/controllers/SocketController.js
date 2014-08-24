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
      SocketService.blastMessage({username: req.session.usuario.username, message: req.param('message'), req: req, source: Local.ucp, action: 'chatMessage'}, Salas.geral);
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
          console.log(objUsuario);
          // Mensagem particular enviada para um jogador logado no servidor.
          if(objUsuario.source == Local.servidor || objUsuario.source == Local.ambos) {
            SampSocketService.send('a=particularMessage&from='+req.session.usuario.username+'&to='+targetUsername+'&message='+req.param('message')+'&source='+req.session.usuario.source+'&salaId='+salaId);
          }

          // Mensagem particular enviada para um usuário do UCP.
          if(objUsuario.source == Local.ucp || objUsuario.source == Local.ambos) {
            SocketService.blastMessage({username: req.session.usuario.username, message: req.param('message'), req: req, source: objUsuario.source, action: 'particularMessage', extra: {targetUsername: targetUsername, salaId: salaId}}, objUsuario.socketId);
          }
        } else {
          console.log('Usuário '+ targetUsername+ 'não encontrado.');
        }
      });
    }

    res.json({message: 'success'}, 200);
  },

  openParticularChat: function(req, res) {
    salaId = 'SALA'+Math.round(Math.random()*1000000000);

    targetUsername = req.param('targetUsername');

    if(targetUsername !== req.session.usuario.username) {
      Usuario.findOne({username: targetUsername}).exec(function(err, objUsuario) {
        if(!err) {
          Salas.create({salaId: salaId, usuarioFrom: req.session.usuario.id, usuarioTo: objUsuario.id}).exec(function(err2, newSala) {
            if(!err2) {
              console.log('chegou');
              sails.sockets.join(req.socket, objUsuario.socketId);
              res.json({message: 'success', salaId: salaId}, 200);
            } else {
              res.json({error: 500}, 300);
            }
          })
        } else {
          res.json({error: 500}, 300);
        }
      });
    } else {
      res.json({error: 500}, 300);
    }
  },

  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to DefaultController)
   */
  _config: {}

  
};
