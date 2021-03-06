var socketDisconnected = false;

$(document).ready(function() {
  var notyAppConnection = null;

  // Responsável por receber qualquer tipo de dado enviado pela aplicação via socket.
  socket.on('message', function(data) {
    console.log(data);
    // Onde o modelsHook é iniciado.
    if(data.model) {
      modelsHook[data.model][data.verb]((data.data)?data.data:data.previous);
    }

    // Detectamos ações vindas do servidor SA-MP.
    if(data.sampAction) {
      if(typeof sampServerEvents[data.sampAction] == 'function') {
        sampServerEvents[data.sampAction](data);
      }
    }
  });

  socket.on('disconnect', function(data) {
    socketDisconnected = true;
    // @TODO
    // Desativar o webchat, competitivo e qualquer outro módulo do ucp que tenha conectividade via socket.
    notyAppConnection = noty({text: 'A conexão com o servidor foi perdida, tentando reconnectar...', type: 'error', /*killer: true,*/ timeout: false, closeWith: []});
  });

  socket.on('connect', function(data) {
    // @TODO
    // Se for um reconnect, obrigar o usuário a atualizar a página.
    if(socketDisconnected) {
      //$.noty.closeAll();
      if(notyAppConnection !== null) {
        notyAppConnection.close();
      }

      noty({text: 'Conexão reestabelecida!', type: 'success', /*killer: true,*/ timeout: 3000});

      if(confirm('A conexão com o servidor foi reestabelecida, é recomendável que se recarregue a página para que todos as informações sejam sincronizadas novamente.\n\nDeseja recarregar agora?')) {
        window.location.reload(true);
        socket.pause();
      }
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
      switch(data.event) {
        case 'usernameChange':
          var webchatUser = $('#webchatUser_'+data.oldUsername);

          if(webchatUser.size() > 0) {
            webchatUser.attr('id', 'webchatUser_' + data.username);
            webchatUser.html(webchatUser.html().replace(data.oldUsername, data.username));
            webchatUser.find('#targetName').val(data.username);

            $('#particularChatForm').find('#userName').each(function(index, obj) {
              if($(obj).val() == data.oldUsername) {
                $(obj).parents('div').parents('div').eq(0).find('.tabTitle').html($(obj).parents('div').parents('div').eq(0).find('.tabTitle').html().replace(data.oldUsername, data.username));
                $(obj).val(data.username);
                webchat.notifications.create('<b>' + data.oldUsername + '</b> alterou seu nick para <b>'+data.username+'</b>.', $(obj).parents('form').eq(0));
              }
            });

            webchat.notifications.create('<b>' + data.oldUsername + '</b> alterou seu nick para <b>'+data.username+'</b>.' );
          }
          break;
        case 'sourceChange':
          var webchatUser = $('#webchatUser_'+data.username);

          if(webchatUser.size() > 0) {
            webchatUser.find('.loginType').html(data.source);
          }
          break;
      }
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