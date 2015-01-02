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
  },

  hasStaffPermission: function(PlayerInfoOrPlayerNick, adminLevel, modLevel, callback) {
    var result = function(error, results) {
      if(!error) {
        var rpgAccountInfo = results[0];

        if(!adminLevel) {
          adminLevel = 1;
        }

        if(!modLevel) {
          modLevel = 1;
        }

        if(parseInt(rpgAccountInfo.Administrador) >= adminLevel || parseInt(rpgAccountInfo.Moderacao) >= modLevel) {
          callback(null, {adminLevel: rpgAccountInfo.Administrador, modLevel: rpgAccountInfo.Moderacao});
        } else {
          callback('Jogador n�o possui privil�gios suficientes.');
        }
      } else {
        callback(error);
      }
    }

    async.series([
      function(callback) {
        if(typeof PlayerInfoOrPlayerNick == 'object') { // Se for um objeto significa que a query j� foi feita anteriormente e precisamos verificar apenas os dados.
          callback(null, PlayerInfoOrPlayerNick);
        } else if(typeof PlayerInfoOrPlayerNick == 'string') { // Caso contr�rio est� sendo enviado apenas o nick do jogador e devemos fazer a query para obtermos os dados.
          RPGService.getPlayerInfoByNickname(PlayerInfoOrPlayerNick, callback);
        }
      }
    ], result);
  }
}