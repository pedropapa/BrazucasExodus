/**
 * Service utilizada para gerenciar as partidas do modo competitivo.
 *
 */
module.exports = {
  getQueueStatus: function(userId, callback) {
    queue.findOne({Usuario: userId}).exec(function(err, queueObject) {
      if(!err && queueObject) {
        callback(null, queueObject);
      } else if(err) {
        callback(err);
      } else {
        callback(null, false);
      }
    });
  },

  /**
   * Verifica se uma partida para o modo selecionado pode ser criada.
   *
   * @TODO Ainda n�o est� sendo verificado se existem servidores dispon�veis para a cria��o das partidas!
   *
   * @param modo
   * @param callback
   */
  isMatchReady: function(modo, callback) {
    competitivo_modo.findOne({ID: modo}).exec(function(err, modoObject) {
      if(!err && modoObject) {
        queue.find({where: {modo: modo, status: queue.domain.IN_QUEUE}, limit: modoObject.NU_JOGADORES, sort: 'createdAt ASC'}).populate('Usuario').exec(function(err, queueObject) {
          if(!err && queueObject) {
            if(queueObject.length == modoObject.NU_JOGADORES) {
              callback(null, {queueObject: queueObject, modoObject: modoObject});
            } else {
              callback("Ainda n�o h� jogadores suficientes para formar esta partida. ("+queueObject.length+"/"+modoObject.NU_JOGADORES+")");
            }
          } else {
            callback("N�o foi poss�vel obter informa��es da fila de jogadores.");
          }
        });
      } else {
        callback("Modo de jogo n�o encontrado.");
      }
    });
  },

  createMatch: function(queueObject, modoObject) {
    sails.log.info(queueObject, modoObject);
  },

  leaveQueue: function(userId, callback) {
    var finish = function(err, results) {
      if(!err && results && results[0]) {
        // Jogador est� na fila.
        if(results[0].status == queue.domain.IN_QUEUE) {
          queue.destroy({ID: results[0].ID}).exec(function(err) {
            if(!err) {
              callback();
            } else {
              callback("N�o foi poss�vel deixar a fila de partidas.");
            }
          });
        } else if(queue.domain.IN_GAME) {
          callback("Jogador j� est� em uma partida, n�o � poss�vel retir�-lo da fila.");
        } else {
          callback("Um erro ocorreu ao deixar a partida.");
        }
      } else {
        callback(err);
      }
    }

    async.series(
      [function(_callback) {MatchMakingService.getQueueStatus(userId, _callback)}],
      finish
    );
  }
}