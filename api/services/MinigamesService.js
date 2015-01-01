/**
 * Service utilizada para armazenar queries de montagem do ranking do servidor.
 *
 */
module.exports = {
  getMinigamesByType: function(tpMinigame, callback) {
    tp_minigames.find({
      where: {TP_MINIGAME: tpMinigame},
      sort: 'NM_MINIGAME DESC'
    }).exec(function(error, minigames) {
      if(error) {
        if(callback) {
          callback(error);
        }
      } else {
        if(callback) {
          callback(null, minigames);
        }
      }
    });
  },

  getPlayerInfoByNickname: function(nickname, callback) {
    contas_mgs.findOne({NOME: nickname}).exec(function(error, contaMg) {
      if(!error) {
        if(contaMg !== null) {
          callback(null, contaMg);
        } else {
          callback('Jogador não encontrado.');
        }
      } else {
        callback(error);
      }
    });
  }
}