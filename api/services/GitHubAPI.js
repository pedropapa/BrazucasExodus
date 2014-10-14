/**
 * Service que armazena funções de utilidades em geral dentro do sistema.
 *
 */
module.exports = {
  lastCommits: [],

  /**
   * Gera um hash de acordo com a string recebida por parâmetro.
   *
   * @param string
   */
  generateHash: function(string) {
    var md5 = require('MD5');

    return md5(sails.config.brazucasConfig.hashSalt + string);
  },

  getOptions: function(method) {
    var options = {
      host: 'api.github.com',
      path: '/repos/' + sails.config.brazucasConfig.gitHubAppPath + '/'+ method,
      headers: {
        accept: '*/*',
        'user-agent': 'node.js'
      },
      setEncoding: 'utf8',
      method: 'GET'
    }

    return options;
  },

  updateLastCommits: function() {
    sails.log.info('Atualizando últimos commits da aplicação no GitHub...');

    var https = require('https');
    options = this.getOptions('commits');

    https.get(options, function(resp) {
      var json_data = '';

      resp.on('data', function(data) {
        json_data += data;
      });

      resp.on('end', function() {
        GitHubAPI.lastCommits = JSON.parse(json_data);
      })
    }).on('error', function(e) {
        sails.log.error('Erro ao obter os dados dos últimos commits da aplicação no github!');
        sails.log.error(e);
      });
  }
}