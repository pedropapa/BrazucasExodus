/**
 * DefaultController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {
    
  
  /**
   * Action blueprints:
   *    `/default/main`
   */
   main: function (req, res) {
    if(!req.session.usuario) {
      console.log('Cliente ainda não possui um usuário, criando...');

      UcpService.criarUsuario(req);
    } else {
      Usuario.find({id: req.session.usuario}).exec(function(error, Usuario) {
        if(error) {
          console.log('Cliente possui um usuário mas este não foi encontrado na base, criando...');

          UcpService.criarUsuario(req);
        } else {
          console.log('Cliente já possui um usuário.');
        }
      });
    }

    // Send a JSON response
    return res.view('home/index', {ping: 'pong!'});
  },




  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to DefaultController)
   */
  _config: {}

  
};
