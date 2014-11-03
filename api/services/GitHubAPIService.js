/**
 * Service que gerencia as requisições à API do GitHub.
 *
 */
module.exports = {
  lastCommits: [],

  /**
   * Configurações padrão das requisições à API do GitHub.
   *
   * @param method
   * @return object
   */
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

  /**
   * Atualiza a array local 'lastCommits' com os dados dos últimos commits da aplicação no GitHub.
   *
   * @param none
   * @return nothing
   */
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
        GitHubAPIService.lastCommits = JSON.parse(json_data);
      })
    }).on('error', function(e) {
        sails.log.error('Erro ao obter os dados dos últimos commits da aplicação no github!');
        sails.log.error(e);
      });
  }
}