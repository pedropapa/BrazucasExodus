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
  },

  hasStaffPermission: function(PlayerInfoOrPlayerNick, adminLevel, modLevel, callback) {
    var result = function(error, results) {
      if(!error) {
        var mgsAccountInfo = results[0];

        if(!adminLevel) {
          adminLevel = 1;
        }

        if(!modLevel) {
          modLevel = 1;
        }

        if(parseInt(mgsAccountInfo.Administrador) >= adminLevel || parseInt(mgsAccountInfo.NivelModerador) >= modLevel) {
          callback(null, {adminLevel: mgsAccountInfo.Administrador, modLevel: mgsAccountInfo.NivelModerador});
        } else {
          callback('Jogador não possui privilégios suficientes.')
        }
      } else {
        callback(error);
      }
    }

    async.series([
      function(callback) {
        if(typeof PlayerInfoOrPlayerNick == 'object') { // Se for um objeto significa que a query já foi feita anteriormente e precisamos verificar apenas os dados.
          callback(null, PlayerInfoOrPlayerNick);
        } else if(typeof PlayerInfoOrPlayerNick == 'string') { // Caso contrário está sendo enviado apenas o nick do jogador e devemos fazer a query para obtermos os dados.
          MinigamesService.getPlayerInfoByNickname(PlayerInfoOrPlayerNick, callback);
        }
      }
    ], result);
  }
}