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
   * @TODO Ainda não está sendo verificado se existem servidores disponíveis para a criação das partidas!
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
              callback("Ainda não há jogadores suficientes para formar esta partida. ("+queueObject.length+"/"+modoObject.NU_JOGADORES+")");
            }
          } else {
            callback("Não foi possível obter informações da fila de jogadores.");
          }
        });
      } else {
        callback("Modo de jogo não encontrado.");
      }
    });
  },

  createMatch: function(queueObject, modoObject) {
    sails.log.info(queueObject, modoObject);
  },

  leaveQueue: function(userId, callback) {
    var finish = function(err, results) {
      if(!err && results && results[0]) {
        // Jogador está na fila.
        if(results[0].status == queue.domain.IN_QUEUE) {
          queue.destroy({ID: results[0].ID}).exec(function(err) {
            if(!err) {
              callback();
            } else {
              callback("Não foi possível deixar a fila de partidas.");
            }
          });
        } else if(queue.domain.IN_GAME) {
          callback("Jogador já está em uma partida, não é possível retirá-lo da fila.");
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