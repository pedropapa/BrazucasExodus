/**
 * Service que gerencia as requisições à API do DigitalOcean.
 *
 */
module.exports = {
  droplets: [],

  /**
   * Configurações padrão das requisições à API do GitHub.
   *
   * @param method
   * @return object
   */
  getOptions: function(method) {
    var options = {
      host: sails.config.brazucasConfig.digitalOceanApiHost,
      path: sails.config.brazucasConfig.digitalOceanApiPath + '/'+ method,
      headers: {
        accept: '*/*',
        'user-agent': 'node.js',
        'content-type': 'application/json',
        Authorization: 'Bearer ' + sails.config.brazucasConfig.digitalOceanToken
      },
      setEncoding: 'utf8',
      method: 'GET'
    }

    return options;
  },

  /**
   * Atualiza a array local 'droplets' com os dados dos Droplets (servidores) atuais do servidor.
   *
   * @param none
   * @return nothing
   */
  updateDroplets: function() {
    sails.log.info('Atualizando os droplets atuais no DigitalOcean...');

    var https = require('https');
    options = this.getOptions('droplets');

    https.get(options, function(resp) {
      var json_data = '';

      resp.on('data', function(data) {
        json_data += data;
      });

      resp.on('end', function() {
        DigitalOceanAPIService.droplets = JSON.parse(json_data);

        // Atualmente a API do DigitalOcean não oferece informações de preço dos servidores (billing), por isso por enquanto o preço dos droplets deve ser hardcoded.
        for(droplet in DigitalOceanAPIService.droplets.droplets) {
          switch(DigitalOceanAPIService.droplets.droplets[droplet].memory) {
            case 4096:
              DigitalOceanAPIService.droplets.droplets[droplet].price = 40;
              break;
            case 512:
              DigitalOceanAPIService.droplets.droplets[droplet].price = 5;
              break;
          }
        }
      })
    }).on('error', function(e) {
      sails.log.error('Erro ao obter os dados dos droplets atuais no DigitalOcean!');
      sails.log.error(e);
    });
  }
}