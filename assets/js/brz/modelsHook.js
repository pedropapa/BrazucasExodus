var socketDisconnected = false;

$(document).ready(function() {
  // Responsável por receber qualquer tipo de dado enviado pela aplicação via socket.
  socket.on('message', function(data) {
    console.log(data);
    // Onde o modelsHook é iniciado.
    if(data.model) {
      modelsHook[data.model][data.verb]((data.data)?data.data:data.previous);
    }

    if(data.sampAction) {
      switch(data.sampAction) {
        // Evento de morte no servidor
        case 'sampServerKill':
          sampServerNotifications.killEvent(data.killerName, data.deadName, data.reason, (new Date()).getTime(), 'TODO');
          break;
        case 'chatMessage':
        case 'particularMessage':
          webchat.othersMessage.create(data);
          break;
      }
    }
  });

  socket.on('disconnect', function(data) {
    socketDisconnected = true;
    // @TODO
    // Desativar o webchat, competitivo e qualquer outro módulo do ucp que tenha conectividade via socket.
    // Obrigar o usuário a atualizar a página ao reestabelecer a conexão.
    noty({text: 'A conexão com o servidor foi perdida, tentando reconnectar...', type: 'error', killer: true, timeout: false, closeWith: []});
  });

  socket.on('connect', function(data) {
    // @TODO
    // Se for um reconnect, obrigar o usuário a atualizar a página.
    if(socketDisconnected) {
      $.noty.closeAll();
      noty({text: 'Conexão reestabelecida!', type: 'success', killer: true, timeout: 3000});
    }
  });
});

/**
 * modelsHook
 * Responsável por receber qualquer tipo de instrução realizada em uma determinada model.
 * Sendo a instrução de cada model criada da seguinte maneira: 'model.instrução()'.
 */
var modelsHook = {
  // Usuario.js Model
  // Responsável por gerenciar os usuários da aplicação.
  usuario: {
    update: function(data) {
      alert(data.toSource());
    },
    create: function(data) {
      if(data.length > 0) {
        for(x in data) {
          webchat.users.login(data[x].username, data[x].source);
        }
      } else {
        webchat.users.login(data.username, data.source);
      }
    },
    destroy: function(data) {
      webchat.users.logout(data.username);
    },
    init: function(data) {
      session.socketId = data;
    }
  }
}