/**
 * Service responsável pela ponte entre a aplicação nodejs e o servidor sa-mp.
 *
 * @type {{sampSocket: null, init: Function, reconnect: Function, send: Function}}
 */
module.exports = {
  sampSocket: null,
  serverBasicStats: {},

  init: function() {
    var net = require('net');
    this.sampSocket = new net.Socket();

    this.sampSocket.connect(sails.config.brazucasConfig.serverSocketPort, sails.config.brazucasConfig.serverIp, function(error) {
      sails.log.info('Connectado ao servidor SA-MP. IP: '+sails.config.brazucasConfig.serverIp+', Porta: '+sails.config.brazucasConfig.serverSocketPort);

      if(error) {
        sails.log.error(error);
      }
    });

    this.sampSocket.on('data', function(data) {
      sails.log.info(data.toString());
      sampData = SampSocketService.filterData(data.toString());

      if(typeof sampData['a'] == undefined) sails.log.warn('Comando '+sampData['a']+' não reconhecido.');
      else {
        for(variable in sampData) {
          sampData[variable] = sampData[variable].replace(/\+/g, ' ');
        }
        SampSocketService.on[sampData['a']](sampData);
      }
    });

    this.sampSocket.on('error', function(data) {
      if(data.syscall == 'connect') { // Quando há um erro na conexão com o socket do servidor.
        sails.log.error('Ocorreu um erro ao estabelecer a conexão com o socket do servidor SA-MP.');
      } else {
        sails.log.info('Conexão com o servidor SA-MP perdida, tentando reconectar...');
      }

      SampSocketService.reconnect();

      sails.log.silly(data);
    });

    this.sampSocket.on('end', function() {
      sails.log.error('Conexão perdida com o servidor SA-MP.');

      SampSocketService.reconnect();
    });
  },

  // Callbacks que são chamadas por comandos do servidor SA-MP.
  on: {
    kill: function(sampData) {
      sails.sockets.blast({ sampAction: 'sampServerKill', killerName: sampData['killerName'], deadName: sampData['deadName'], reason: sampData['reason'] });
    },
    msg: function(sampData) {
      if(sampData['msg'].length <= sails.config.brazucasConfig.maxChatMessageLength) {
        SocketService.blastMessage(sampData['nick'], sampData['msg'], Salas.geral, false, 'servidor');
      }
    },
    playerConnect: function(sampData) {
      Usuario.findOne({username: sampData['nick']}).exec(function(err, findUsuario) {
        if(!findUsuario) {
          Usuario.create({username: sampData['nick'], source: Local.servidor}).exec(function(error, objUsuario) {
            if(!error) {
              Usuario.publishCreate(objUsuario);
            }
          });
        }
      })
    },
    playerDisconnect: function(sampData) {
      Usuario.find({username: sampData['nick']}).exec(function(error, findUsuario) {
        if(!error && findUsuario.length > 0) {
          Usuario.destroy({id: findUsuario[0].id }).exec(function(error) {
            if(!error) {
              Usuario.publishDestroy(findUsuario[0].id, null, {previous: findUsuario[0]});
            }
          });
        }
      });
    },
    particularMessage: function(sampData) {
      if(sampData['message'].length > 0) {
        Usuario.findOne({username: sampData['from']}).exec(function(error, findUsuario) {
          if(!error && findUsuario) {
            Salas.findOne({salaId: sampData['salaId'], usuarioTo: findUsuario.id}).populate('usuarioFrom').exec(function(error2, findSala) {
              if(!error2 && findSala) {
                SocketService.blastMessage({username: sampData['from'], message: sampData['message'], req: false, source: findUsuario.source, action: 'particularMessage', extra: {targetUsername: findSala.usuarioFrom.username, salaId: sampData['salaId']}}, findSala.usuarioFrom.socketId);
              }
            });
          }
        });
      }
    },
    updateServerBasicStats: function(sampData) {
      var onlinePlayers = parseInt(sampData['onlinePlayers']);
      var maxPlayers    = parseInt(sampData['maxPlayers']);
      var mapname       = sampData['mapname'];
      var hostname      = sampData['hostname'];

      SampSocketService.serverBasicStats = { onlinePlayers: onlinePlayers, maxPlayers: maxPlayers, mapname: mapname, hostname: hostname };

      objectToBlast = SampSocketService.serverBasicStats;
      objectToBlast.sampAction = "updateServerBasicStats";

      sails.sockets.blast(objectToBlast);
    }
  },

  filterData: function(data) {
    variables = data.split('&');
    returnData = [];

    for(ind in variables) {
      variableData = variables[ind].split('=');
      index = variableData[0];
      value = variableData[1];

      returnData[index] = value;
    }

    sails.log.info(returnData);
    return returnData;
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
        sails.log.info(data + ' ' + e);
      });
    }
  }
}