/**
 * Service responsável pela ponte entre a aplicação nodejs e o servidor sa-mp.
 *
 * @type {{sampSocket: null, init: Function, reconnect: Function, send: Function}}
 */
module.exports = {
  sampSocket: null,

  init: function() {
    var net = require('net');
    this.sampSocket = new net.Socket();

    this.sampSocket.connect(sails.config.brazucasConfig.serverSocketPort, sails.config.brazucasConfig.serverIp, function(error) {
      console.log('Connectado ao servidor SA-MP. IP: '+sails.config.brazucasConfig.serverIp+', Porta: '+sails.config.brazucasConfig.serverSocketPort);

      if(error) {
        console.log(error);
      }
    });

    this.sampSocket.on('data', function(data) {
      console.log(data);
    });

    this.sampSocket.on('error', function(data) {
      if(data.syscall == 'connect') { // Quando há um erro na conexão com o socket do servidor.
        console.log('Ocorreu um erro ao estabelecer a conexão com o socket do servidor SA-MP.');
      } else {
        console.log('Conexão com o servidor SA-MP perdida, tentando reconectar...');
      }

      SampSocketService.reconnect();

      console.log(data);
    });

    this.sampSocket.on('end', function() {
      console.log('Conexão perdida com o servidor SA-MP.');

      SampSocketService.reconnect();
    });
  },

  reconnect: function() {
    // Reconexão automática.
    setTimeout(function() {SampSocketService.init()}, 4000);

    // Resetar a variável sampSocket, para dizer aos clientes que a conexão com o servidor não está estabelecida.
    this.sampSocket = null;
  },

  send: function(data) {
    if(this.sampSocket !== null) {
      this.sampSocket.write(data, function(e) {
        console.log(data + ' ' + e);
      });
    }
  }
}