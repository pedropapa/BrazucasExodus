/**
 * Service utilizada para armazenar queries de montagem do ranking do servidor.
 *
 */
module.exports = {
  getMinigamesRankingGeral: function(page, rows, callback, playerName) {
    if(!page) {
      page = 1;
    }

    if(!rows) {
      rows = 10;
    }

    if(!playerName) {
      playerName = '';
    }

    ranking_minigames.query('select nick from ranking_minigames group by nick', function(error, total) {
      if(!error) {
        ranking_minigames.query('' +
            'select dm.NICK, dm.SCORE DM_SCORE, tdm.SCORE TDM_SCORE, race.SCORE RACE_SCORE, derby.SCORE DERBY_SCORE, ROUND(((dm.SCORE/dm.PARTIDAS) + (tdm.SCORE/tdm.PARTIDAS) + (race.SCORE/race.PARTIDAS) + derby.SCORE/derby.PARTIDAS) / 4, 2) MP from ranking_minigames dm' +
            ' join ranking_minigames tdm on tdm.NICK = dm.NICK and tdm.TP_RANKING = ' + tp_ranking_mgs.domain.TDM +
            ' join ranking_minigames race on race.NICK = tdm.NICK and race.TP_RANKING = ' + tp_ranking_mgs.domain.CORRIDA +
            ' join ranking_minigames derby on derby.NICK = race.NICK and derby.TP_RANKING = ' + tp_ranking_mgs.domain.DERBY +
            ' where dm.TP_RANKING = ' + tp_ranking_mgs.domain.DM +
            ' and upper(dm.NICK) like \'%'+playerName.toString().toUpperCase()+'%\'' +
            ' order by MP desc' +
            ' limit '+((page - 1) * rows)+','+rows
        ,function(error2, results) {
          if(error2) {
            if(callback) {
              callback(error2);
            }
          } else {
            if(callback) {
              var result = {};
              result.records = results;
              result.total = total.length;
              result.pages = Math.ceil(total.length / rows);

              callback(null, result);
            }
          }
        });
      } else {
        callback(error);
      }
    });
  },

  getMinigamesSubRanking: function(tpRanking, page, rows, callback, playerName) {
    if(!page) {
      page = 1;
    }

    if(!rows) {
      rows = 10;
    }

    if(!playerName) {
      playerName = '';
    }

    // Obtendo o total de linhas.
    ranking_minigames.find({TP_RANKING: tpRanking}).exec(function(error, total) {
      if(!error) {


        ranking_minigames.query('' +
          'select NICK, PARTIDAS, SCORE from ranking_minigames' +
          ' where TP_RANKING = ' + tpRanking +
          ' and upper(NICK) like \'%'+playerName.toString().toUpperCase()+'%\'' +
          ' order by SCORE DESC' +
          ' limit '+((page - 1) * rows)+','+rows
        ,function(error2, mgsRanking) {
          if(error2) {
            if(callback) {
              callback(error2);
            }
          } else {
            if(callback) {
              var result = {};
              result.records = mgsRanking;
              result.total = total.length;
              result.pages = Math.ceil(total.length / rows);

              callback(null, result);
            }
          }
        });
      } else {
        callback(error);
      }
    });
  }
}