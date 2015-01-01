/**
 * Service utilizada para abrigar métodos de busca/persistência de informações referentes ao modo RPG.
 *
 */
module.exports = {
  getPlayerInfoByNickname: function(nickname, callback) {
    contas_rpg.findOne({NICK: nickname}).exec(function(error, contaRpg) {
      if(!error) {
        if(contaRpg !== null) {
          callback(null, contaRpg);
        } else {
          callback('Jogador não encontrado.');
        }
      } else {
        callback(error);
      }
    });
  }
}