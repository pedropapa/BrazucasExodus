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
      if(req.isSocket) {
        Usuario.stream({username:'teste' }).pipe(req.socket.emit);
        /* @Deprecated
        // Captura alterações dos futuros usuários adicionados ao banco.
        Usuario.subscribe(req.socket);

        // Captura alterações de todos os usuários já adicionados ao banco.
        Usuario.find({}).exec(function(e, usuarios) {
          Usuario.subscribe(req.socket, usuarios);
        });
        */
      } else {
        res.json({error: 500, message: '#'});
      }
  },

  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to DefaultController)
   */
  _config: {}

  
};
