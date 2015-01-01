/**
 * Service utilizada para abrigar m�todos de busca/persist�ncia de informa��es referentes ao modo RPG.
 *
 */
module.exports = {
  getPlayerInfoByNickname: function(nickname, callback) {
    contas_rpg.findOne({NICK: nickname}).exec(function(error, contaRpg) {
      if(!error) {
        if(contaRpg !== null) {
          callback(null, contaRpg);
        } else {
          callback('Jogador n�o encontrado.');
        }
      } else {
        callback(error);
      }
    });
  }
}