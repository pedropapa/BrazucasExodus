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
    res.view('home/index', { GitHubLastCommits: GitHubAPI.lastCommits, 'view_layout': UtilsService.getViewLayout(req) });
  },

  competitivo: function(req, res) {
    var modos = {modos: null};
    var filteredModos = [];

    var finishModosRequest = function(modos, err) {
      if(!err) {
        if(modos.length > 0) {
          for(modo in modos) {
            if(modos[modo].PARENTE == null) {
              filteredModos[modos[modo].ID] = modos[modo];
              filteredModos[modos[modo].ID].subModos = [];
            } else {
              if(typeof filteredModos[modos[modo].PARENTE.ID] == 'undefined') {
                filteredModos[modos[modo].PARENTE.ID] = modos[modo].PARENTE;
                filteredModos[modos[modo].PARENTE.ID].subModos = [];
              }

              if(typeof filteredModos[modos[modo].PARENTE.ID].subModos[modos[modo].TP_MODO] == 'undefined') {
                filteredModos[modos[modo].PARENTE.ID].subModos[modos[modo].TP_MODO] = [];
              }

              if(modos[modo].TP_MODO == competitivo_modo_tipo.domain.MODO_TIPO) {
                filteredModos[modos[modo].PARENTE.ID].subModos[modos[modo].TP_MODO][modos[modo].ID] = modos[modo];
                filteredModos[modos[modo].PARENTE.ID].subModos[modos[modo].TP_MODO][modos[modo].ID].subModos = [];
              } else if(modos[modo].TP_MODO == competitivo_modo_tipo.domain.MODO_FORMA) {
                filteredModos[modos[modo].PARENTE.PARENTE].subModos[modos[modo].PARENTE.TP_MODO][modos[modo].PARENTE.ID].subModos.push(modos[modo]);
              }
            }
          }

         console.log(filteredModos);
        } else {
          sails.log.error('Não há modos ativos para o competitivo!');
        }
      } else {
        sails.log.error(err);
      }

      res.view('competitivo/index', {'view_layout': UtilsService.getViewLayout(req), 'modos': filteredModos});
    }

    async.each([CompetitivoService.getModos], function(func, callback) {func(modos, callback)}, function(err, returningObjects) {finishModosRequest(modos.modos, err)});
  },

  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to DefaultController)
   */
  _config: {}

  
};
