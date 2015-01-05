/**
 * Service que armazena funções de utilidades em geral dentro do sistema.
 *
 */
module.exports = {
  nunjucks: null,
  dateformatter: null,
  exec: null,
  glob: null,
  nunjucksEnv: null,
  sampObjectsThumbnails: null,

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
  },

  /**
   * Carregamos as thumbnails dos objetos do sa-mp.
   *
   * @constructor
   */
  sampObjectsThumbnailsZip: function() {
    var fs = require("fs");
    var JSZip = require("jszip");

    fs.readFile(sails.config.brazucasConfig.sampObjectsPublicPath, function(err, data) {
      if (err) throw err;
      UtilsService.sampObjectsThumbnails = new JSZip(data);
    });
  },

  /**
   * Inicializamos as configurações de template.
   */
  template: function() {
    this.nunjucks = require('nunjucks');
    this.dateFormatter = require('dateformatter').format;
    this.nunjucksEnv = this.nunjucks.configure(null, {watch: false});

    this.nunjucksEnv.addFilter('json', function(str) {return JSON.stringify(str)});
    this.nunjucksEnv.addFilter('getRandom', function(array) {
      if(typeof array == 'object') {
        return array[Math.round(Math.random() * array.length)];
      } else {
        return false;
      }
    });

    this.nunjucksEnv.addFilter('fixDirtyName', function(str) {
      var str = str.toLowerCase();
      var words = str.split('_');
      var output = [];

      for(word in words) {
        words[word] = words[word].split('');
        words[word][0] = words[word][0].toUpperCase();

        output.push(words[word].join(''));
      }

      return output.join(' ');
    });

    this.nunjucksEnv.addFilter('sampObjectThumbnail', function(objectId) {
      var binary = new Buffer(UtilsService.sampObjectsThumbnails.file(objectId + '.jpg').asBinary()).toString('base64');

      return '<img src="data:image/gif;base64,'+binary+'"/>';
    });

    this.nunjucksEnv.addFilter('date', function (input, format, offset, abbr) {
      return UtilsService.dateFormatter(format, input);
    });
  }
}