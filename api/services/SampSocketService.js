/**
 * Service responsável pela ponte entre a aplicação nodejs e o servidor sa-mp.
 *
 * @type {{sampSocket: null, init: Function, reconnect: Function, send: Function}}
 */
module.exports = {
  sampSocket: null,
  serverBasicStats: {},
  isConnected: false,

  /**
   * Inicializa a conexão entre a aplicação e o servidor SA-MP.
   */
  init: function() {
    var net = require('net');
    this.sampSocket = new net.Socket();

    this.sampSocket.setEncoding('utf8');

    // Tenta fazer a conexão com o SA-MP através de sockets, caso não seja possível a aplicação tenta fazer a reconexão automaticamente.
    this.sampSocket.connect(sails.config.brazucasConfig.serverSocketPort, sails.config.brazucasConfig.serverIp, function(error) {
      sails.log.info('Connectado ao servidor SA-MP. IP: '+sails.config.brazucasConfig.serverIp+', Porta: '+sails.config.brazucasConfig.serverSocketPort);

      SampSocketService.isConnected = true;

      CoreService.desconectarTodos(Local.servidor);

      sails.sockets.blast({ sampAction: 'serverRpgMinigamesConnect', ip: sails.config.brazucasConfig.serverIp, port: sails.config.brazucasConfig.serverSocketPort });

      if(error) {
        sails.log.error(error);
      }
    });

    // Filtra os dados recebidos do servidor SA-MP e passa para as callbacks (método 'on').
    this.sampSocket.on('data', function(data) {
      sails.log.info(data.toString());
      SocketService.executeCommandCallback(data);

      if(sampData['a'] !== undefined) {
        if(SampSocketService.on[sampData['a']] == undefined) sails.log.warn('Comando '+sampData['a']+' não reconhecido.');
        else {
          for(variable in sampData) {
            sampData[variable] = sampData[variable].replace(/\+/g, ' ');
          }

          SampSocketService.on[sampData['a']](sampData);
        }
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
        CoreService.desconectarTodos(Local.servidor);
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
        } else if(findUsuario.source == Local.ucp) {
          // Caso o jogador esteja conectado no UCP, apenas faz um update no banco alterando o source para ucp/servidor.
          Usuario.update({username: sampData['nick']}, {source: Local.ambos}).exec(function(error, objUsuario) {
            if(!error && objUsuario !== undefined) {
              objUsuario[0].event = 'sourceChange';
              Usuario.publishUpdate(objUsuario[0].id, objUsuario[0]);
            }
          });
        }
      })
    },
    playerDisconnect: function(sampData) {
      Usuario.findOne({username: sampData['nick']}).exec(function(error, findUsuario) {
        if(!error && findUsuario !== undefined) {
          if(findUsuario.source == Local.servidor) {
            Usuario.destroy({id: findUsuario.id }).exec(function(error) {
              if(!error) {
                Usuario.publishDestroy(findUsuario.id, null, {previous: findUsuario});
              }
            });
          } else if(findUsuario.source == Local.ambos) {
            Usuario.update({id: findUsuario.id }, { source: Local.ucp }).exec(function(error, updatedUsuario) {
              if(!error) {
                updatedUsuario[0].event = 'sourceChange';
                Usuario.publishUpdate(updatedUsuario[0].id, updatedUsuario[0]);
              }
            });
          }
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

    sails.log.silly(returnData);
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
   * Solicita ao servidor RPG/Minigames as informações básicas do servidor.
   */
  updateServerBasicStats: function() {
    SocketService.send(SampSocketService.sampSocket, {a: 'getServerBasicStats'}, function(data, error) {
      if(error) {
        if(error.timedOut) {
          sails.log.error('Não foi possível atualizar as informações básicas do servidor. (Timeout)');
        } else {
          sails.log.error('Não foi possível atualizar as informações básicas do servidor. (Erro Desconhecido)');
        }
      } else {
        var onlinePlayers = parseInt(data['onlinePlayers']);
        var maxPlayers    = parseInt(data['maxPlayers']);
        var mapname       = data['mapname'];
        var hostname      = data['hostname'];

        SampSocketService.serverBasicStats = { onlinePlayers: onlinePlayers, maxPlayers: maxPlayers, mapname: mapname, hostname: hostname };

        objectToBlast = SampSocketService.serverBasicStats;
        objectToBlast.sampAction = "updateServerBasicStats";

        sails.sockets.blast(objectToBlast);
      }
    });
  }
}