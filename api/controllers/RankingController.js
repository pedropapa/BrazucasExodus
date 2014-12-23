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

  rankingGeral: function(req, res) {
    var finish = function(error, results) {
      if(!error) {
        var minigamesRanking = results[0];

        res.view('ranking/index', {'view_layout': UtilsService.getViewLayout(req), 'mgsRanking': minigamesRanking});
      }
    }

    async.series(
      [function(callback) {RankingService.getMinigamesRanking(1, 10, callback)}],
      finish
    );
  },

  rankingMinigamesSearch: function(req, res) {
    if(req.param('filterForm')) {
      var currentPage = parseInt(req.param('currentPage'));
      var itensPerPage = parseInt(req.param('itensPerPage'));
      var playerName = req.param('playerName');
      var rankingType = parseInt(req.param('rankingType'));

      var result = function(error, results) {
        if(!error) {
          res.json({success: true, data: results});
        } else {
          res.json({error: true, message: 'Um erro ocorreu ao processar a requisição!'});
        }
      }

      if(rankingType == 0) {
        async.series([function(callback) {RankingService.getMinigamesRankingGeral(currentPage, itensPerPage, callback, playerName)}], result);
      } else {
        async.series([function(callback) {RankingService.getMinigamesSubRanking(rankingType, currentPage, itensPerPage, callback, playerName)}], result);
      }
    } else {
      res.json({error: true});
    }
  },

  rankingMinigames: function(req, res) {
    var finish = function(error, results) {
      if(!error) {
        var minigamesRanking = results[0];
        var minigamesDerbyRanking = results[1];
        var minigamesRaceRanking = results[2];
        var minigamesDMRanking = results[3];
        var minigamesTDMRanking = results[4];
        var derbyMinigamesList = results[5];
        var raceMinigamesList = results[6];
        var dmMinigamesList = results[7];
        var tdmMinigamesList = results[8];

        res.view('ranking/minigames', {
          view_layout: UtilsService.getViewLayout(req),
          mgsDerbyRanking: minigamesDerbyRanking,
          mgsRaceRanking: minigamesRaceRanking,
          mgsDmRanking: minigamesDMRanking,
          mgsTdmRanking: minigamesTDMRanking,
          mgsRanking: minigamesRanking,
          mgsDerbyList: derbyMinigamesList,
          mgsRaceList: raceMinigamesList,
          mgsDmList: dmMinigamesList,
          mgsTdmList: tdmMinigamesList,
          rankingMgsDomain: tp_ranking_mgs.domain
        });
      } else {
        res.json({error: true, message: 'Um erro ocorreu ao obter o ranking dos minigames!'})
      }
    }

    async.series(
      [
        function(callback) {RankingService.getMinigamesRankingGeral(1, 10, callback)},
        function(callback) {RankingService.getMinigamesSubRanking(tp_ranking_mgs.domain.DERBY, 1, 10, callback)},
        function(callback) {RankingService.getMinigamesSubRanking(tp_ranking_mgs.domain.CORRIDA, 1, 10, callback)},
        function(callback) {RankingService.getMinigamesSubRanking(tp_ranking_mgs.domain.DM, 1, 10, callback)},
        function(callback) {RankingService.getMinigamesSubRanking(tp_ranking_mgs.domain.TDM, 1, 10, callback)},
        function(callback) {MinigamesService.getMinigamesByType(tipo_minigame.domain.DERBY, callback)},
        function(callback) {MinigamesService.getMinigamesByType(tipo_minigame.domain.CORRIDA, callback)},
        function(callback) {MinigamesService.getMinigamesByType(tipo_minigame.domain.DM, callback)},
        function(callback) {MinigamesService.getMinigamesByType(tipo_minigame.domain.TDM, callback)}
      ],
      finish
    );
  },

  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to DefaultController)
   */
  _config: {}

  
};
