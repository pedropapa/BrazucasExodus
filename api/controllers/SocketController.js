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
   * Responsável por receber mensagens do webchat.
   *
   * @param req
   * @param res
   */
  chatMessage: function (req, res) {
    if(req.param('message').length <=  sails.config.brazucasConfig.maxChatMessageLength) {
      SocketService.blastMessage(req, res, Salas.geral);
    }

    res.json({message: 'success'}, 200);
  },

  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to DefaultController)
   */
  _config: {}

  
};
