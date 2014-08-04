exports.sampSocket = null;

exports.init = function() {
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
    }

    console.log(data);
  });
}

exports.write = function(data) {
  if(this.sampSocket !== null) {
    this.sampSocket.write(data, function(e) {
      console.log(e);
    });
  }
}