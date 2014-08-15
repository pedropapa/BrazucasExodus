/**
 * CoreController
 *
 * @module      :: Controller
 * @description	:: Controller da rota /ucp, utilizado para login ao Painel.
 */

module.exports = {
    
  
  /**
   * Action blueprints:
   *    `/default/main`
   */
   ucp: function (req, res) {
    // Send a JSON response
    return res.view('ucp/index');
  },




  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to DefaultController)
   */
  _config: {}

  
};
