var socketDisconnected = false;

$(document).ready(function() {
  // Respons�vel por receber qualquer tipo de dado enviado pela aplica��o via socket.
  socket.on('message', function(data) {
    console.log(data);
    // Onde o modelsHook � iniciado.
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
    // Desativar o webchat, competitivo e qualquer outro m�dulo do ucp que tenha conectividade via socket.
    // Obrigar o usu�rio a atualizar a p�gina ao reestabelecer a conex�o.
    noty({text: 'A conex�o com o servidor foi perdida, tentando reconnectar...', type: 'error', killer: true, timeout: false, closeWith: []});
  });

  socket.on('connect', function(data) {
    // @TODO
    // Se for um reconnect, obrigar o usu�rio a atualizar a p�gina.
    if(socketDisconnected) {
      $.noty.closeAll();
      noty({text: 'Conex�o reestabelecida!', type: 'success', killer: true, timeout: 3000});
    }
  });
});

/**
 * modelsHook
 * Respons�vel por receber qualquer tipo de instru��o realizada em uma determinada model.
 * Sendo a instru��o de cada model criada da seguinte maneira: 'model.instru��o()'.
 */
var modelsHook = {
  // Usuario.js Model
  // Respons�vel por gerenciar os usu�rios da aplica��o.
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