/**
 * Service responsável pela ponte entre a aplicação nodejs e o servidor sa-mp.
 *
 * @type {{sampSocket: null, init: Function, reconnect: Function, send: Function}}
 */
module.exports = {
  sampSocket: null,
  serverBasicStats: {},
  isConnected: false,
  commandsCallback: [],

  /**
   * Inicializa a conexão entre a aplicação e o servidor SA-MP.
   */
  init: function() {
    var net = require('net');
    this.sampSocket = new net.Socket();

    // Tenta fazer a conexão com o SA-MP através de sockets, caso não seja possível a aplicação tenta fazer a reconexão automaticamente.
    this.sampSocket.connect(sails.config.brazucasConfig.serverSocketPort, sails.config.brazucasConfig.serverIp, function(error) {
      sails.log.info('Connectado ao servidor SA-MP. IP: '+sails.config.brazucasConfig.serverIp+', Porta: '+sails.config.brazucasConfig.serverSocketPort);

      SampSocketService.isConnected = true;

      sails.sockets.blast({ sampAction: 'serverRpgMinigamesConnect', ip: sails.config.brazucasConfig.serverIp, port: sails.config.brazucasConfig.serverSocketPort });

      if(error) {
        sails.log.error(error);
      }
    });

    // Filtra os dados recebidos do servidor SA-MP e passa para as callbacks (método 'on').
    this.sampSocket.on('data', function(data) {
      sails.log.info(data.toString());
      var sampData = SampSocketService.filterData(data.toString());

      if(typeof sampData['a'] == undefined) sails.log.warn('Comando '+sampData['a']+' não reconhecido.');
      else {
        for(variable in sampData) {
          sampData[variable] = sampData[variable].replace(/\+/g, ' ');
        }

        if(sampData['cmdId'] !== undefined && typeof SampSocketService.commandsCallback[sampData['cmdId']] == 'object') {
          if(!SampSocketService.commandsCallback[sampData['cmdId']].executed) {
            SampSocketService.commandsCallback[sampData['cmdId']].callback(sampData);
            SampSocketService.commandsCallback[sampData['cmdId']].executed = true;
          }
        }

        SampSocketService.on[sampData['a']](sampData);
      }
    });

    /**
     * Quando a conexão com o servidor SA-MP é perdida, tentamos fazer a reconexão automaticamente.
     */
    this.sampSocket.on('error', function(data) {
      if(data.syscall == 'connect') { // Quando há um erro na conexão com o socket do servidor.
        sails.log.error('Ocorreu um erro ao estabelecer a conexão com o socket do servidor SA-MP.');
      } else {
        sails.log.info('Conexão com o servidor SA-MP perdida, tentando reconectar...');
      }

      if(SampSocketService.isConnected) {
        sails.sockets.blast({ sampAction: 'serverRpgMinigamesDisconnect' });
      }

      SampSocketService.isConnected = false;

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
        SocketService.blastMessage({username: sampData['nick'], message: sampData['msg'], req: false, source: Local.servidor, action: 'chatMessage'}, Salas.geral);
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

  /**
   * Método que filtra os dados recebidos pelo servidor SA-MP.
   *
   * @param data
   * @returns {Array|*}
   */
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

  /**
   * Método que tenta fazer a reconexão com o servidor SA-MP após uma queda de conexão.
   */
  reconnect: function() {
    // Reconexão automática.
    setTimeout(function() {SampSocketService.init()}, 4000);

    // Resetar a variável sampSocket, para dizer aos clientes que a conexão com o servidor não está estabelecida.
    this.sampSocket = null;
  },

  /**
   * Método que envia informações para o servidor SA-MP.
   *
   * @param data
   */
  send: function(data, callback) {
    if(this.sampSocket !== null && this.sampSocket.readable) {
      if(callback) {
        var callbackId = UtilsService.generateString();
        data.cmdId = callbackId;
      }

      // Devemos enviar os dados para o servidor sa-mp em forma de string, infelizmente é o único formato que o SocketPlugin aceita.
      var inlineData = '';
      for(key in data) {
        inlineData += key + '=' + data[key] + '&';
      }

      if(inlineData.length == 0) {
        return false;
      }

      this.sampSocket.write(inlineData, function(e) {
        sails.log.info(data + ' ' + e);

        /**
         * Caso tenha sido passado uma callback, devemos chamá-la quando o comando for executado pelo servidor.
         * Isso é feito registrando a callback em uma array com um ID como key, e quando o servidor responder verificamos se o ID passado é o mesmo enviado,
         * caso seja, chamamos a callback com o primeiro argumento sendo os dados enviados pelo servidor, caso a requisição caia em timeout ou o comando não possa ser
         * enviado, também chamamos a callback mas passando o primeiro parâmetro como false e o segundo parâmetro como um objeto do tipo 'error' com informações sobre
         * o erro ocorrido.
         */
        if(callback) {
          if(e) {
            callback(false, e);
          } else {
            SampSocketService.commandsCallback[callbackId] = {callback: callback, executed: false};

            setTimeout(function() {
              if(typeof SampSocketService.commandsCallback[callbackId] == 'object') {
                // Se o comando não for executado em até 10 segundos, fazemos um timeout e informamos para a callback que o comando não foi executado pelo servidor.
                if(!SampSocketService.commandsCallback[callbackId].executed) {
                  SampSocketService.commandsCallback[callbackId].callback(false, {error: true, timedOut: true, timeoutTime: sails.config.brazucasConfig.sampServerCmdTimeout});
                  SampSocketService.commandsCallback[callbackId].executed = true;
                  SampSocketService.commandsCallback[callbackId].timedOut = true;
                }
              }
            }, sails.config.brazucasConfig.sampServerCmdTimeout);
          }
        }
      });

      return true;
    } else {
      return false;
    }
  }
}