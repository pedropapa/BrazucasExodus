/**
 * UcpController
 *
 * @module      :: Controller
 * @description	:: Controller da rota /ucp, utilizado para login ao Painel.
 */

module.exports = {
    
  
  /**
   * Action blueprints:
   *    `/default/main`
   */
   main: function (req, res) {

    // Send a JSON response
    return res.view('home/ucp/index');
  },




  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to DefaultController)
   */
  _config: {}

  
};
