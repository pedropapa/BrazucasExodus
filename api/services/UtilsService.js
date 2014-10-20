/**
 * Service que armazena funções de utilidades em geral dentro do sistema.
 *
 */
module.exports = {
  /**
   * Gera um hash de acordo com a string recebida por parâmetro.
   *
   * @param string
   */
  generateHash: function(string) {
    var md5 = require('MD5');

    return md5(sails.config.brazucasConfig.hashSalt + string);
  },

  isValidNickname: function(nickname) {
    return nickname.toString().replace(/ /g, '').match(/^\w[\w,_,\d]+$/);
  },

  isValidPassword: function(nickname) {
    return nickname.toString().replace(/ /g, '').match(/^\w[\w,\d]+$/);
  }
}