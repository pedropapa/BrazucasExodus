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

  index: function(req, res) {
    if(CoreService.isUserAuthenticated(req)) {
      var result = function(error, results) {
        console.log(error, results);
        if(typeof results == 'object' && results.length > 0) {
          res.view('administracao/index', {'view_layout': UtilsService.getViewLayout(req)});
        } else {
          res.json({error: true, message: 'Você não possui privilégios suficientes para acessar esta funcionalidade.'})
        }
      }

      async.series([
        function(callback) {MinigamesService.hasStaffPermission(req.session.loginInfo.nick, false, false, callback)},
        function(callback) {RPGService.hasStaffPermission(req.session.loginInfo.nick, false, false, callback)}
      ], result);
    } else {
      res.json({error: true, message: 'Você deve estar autenticado para utilizar esta funcionalidade.'})
    }
  },

  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to DefaultController)
   */
  _config: {}

  
};
