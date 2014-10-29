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

  /**
   * Gera strings alpha-numéricas aleatórias.
   *
   * @param nickname
   * @returns {Array|{index: number, input: string}}
   */
  generateString: function() {
    return Math.random().toString(36).slice(2);
  },

  /**
   * Verifica se um nickname é válido.
   *
   * Nicknames devem começar com uma letra e devem ter apenas letras, números e underline.
   *
   * @param nickname
   * @returns {Array|{index: number, input: string}}
   */
  isValidNickname: function(nickname) {
    return nickname.toString().replace(/ /g, '').match(/^\w[\w,_,\d]+$/);
  },

  /**
   * Verifica se uma senha é válida.
   *
   * Senhas devem começar com uma letra e devem ter apenas letras e números.
   *
   * @param nickname
   * @returns {Array|{index: number, input: string}}
   */
  isValidPassword: function(nickname) {
    return nickname.toString().replace(/ /g, '').match(/^\w[\w,\d]+$/);
  },

  /**
   * Gera um username temporário para o usuário que ainda não foi autenticado na aplicação.
   *
   * @returns {string}
   */
  generateTemporaryUsername: function() {
    return 'PNA'+Math.round(Math.random()*10000);
  },

  /**
   * Determina o layout da página pelo tipo de requisição recebida, caso seja uma requisição ajax devemos retornar apenas o conteúdo principal da página.
   *
   * @param req
   * @returns {string}
   */
  getViewLayout: function(req) {
    if(req.xhr) {
      return 'views/no-layout.nunjucks';
    } else {
      return 'views/layout.nunjucks';
    }
  }
}