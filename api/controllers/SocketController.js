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
      // Get the value of a parameter
      var param = req.param('message');

      Usuario.create({username: 'testando', password: '123432432'}).exec(function() {console.log('Usuário criado.')});

      var getSocket = req.socket;
      Usuario.stream({username: 'testando'}).pipe(getSocket.emit);
      /*
      Usuario.subscribe(req.socket);

      Usuario.publishCreate({id: 1, username: 'teste5', password: 'lololol'});

      Usuario.publish(req, 'teste');
      */

      // Send a JSON response
//      res.json({
//          success: true,
//          message: param
//      });
  },




  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to DefaultController)
   */
  _config: {}

  
};
