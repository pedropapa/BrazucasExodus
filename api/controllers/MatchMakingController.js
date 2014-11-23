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

  queue: function(req, res) {
    /**
     * results[0] = (Model) queueObject.
     *
     * @param err
     * @param results
     */
    var finish = function(err, results) {
      var modo_jogo = req.param("modo-forma");

      if(!err) {
        var queueObject = results[0];

        // Caso o queueObject retorne falso, significa que o jogador ainda não está na fila.
        if(!queueObject) {
          queue.create({Usuario: req.session.usuario.id, modo: modo_jogo, status: queue.domain.IN_QUEUE}).exec(function(err, newQueue) {
            if(!err && newQueue) {
              var finishMatchVerification = function(err, results) {
                if(!err && results) {
                  MatchMakingService.createMatch(results[0].queueObject, results[0].modoObject);
                } else {
                  sails.log.error(err);
                }

                // Não precisamos esperar a partida ser criada para retornarmos a resposta para o navegador.
                res.json({success: true, queueObject: newQueue});
              }

              async.series([function(callback) {MatchMakingService.isMatchReady(modo_jogo, callback)}], finishMatchVerification);
            } else {
              res.json({error: true, message: 'Não foi possível entrar na fila para procurar partidas, tente novamente em instantes.'});
            }
          });
        } else {
          if(queueObject.status == queue.domain.IN_GAME) {
            res.json({error: true, message: "Você já está em uma partida!"});
          } else if(queueObject.status == queue.domain.IN_QUEUE) {
            res.json({error: true, message: "Você já está na fila!"});
          }
        }
      } else {
        res.json({error: true, message: "Um erro ocorreu ao procurar partidas."});
      }
    }

    async.series(
      [function(callback) {MatchMakingService.getQueueStatus(req.session.usuario.id, callback)}],
      finish
    );
  },

  leaveQueue: function(req, res) {
    var finish = function(err, results) {
      if(!err && results) {
        res.json({success: true});
      } else {
        res.json({error: true, message: err});
      }
    }

    async.series(
      [function(callback) {MatchMakingService.leaveQueue(req.session.usuario.id, callback)}],
      finish
    );
  },

  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to DefaultController)
   */
  _config: {}

  
};
