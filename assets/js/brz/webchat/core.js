// Objeto responsável pelo gerenciamento do webchat.
var webchat = {
  messagesContainer: function() {return $('#'+webchat_tab.getId()+' .panel .messages')},
  usersContainer: function() {return $('#'+webchat_tab.getId()+' .loggedUsers')},

  othersMessage: {
    create: function(data) {
      var messageClass;
      var targetContainer;
      var targetDiv;
      var private_room;

      if(data.socketId == session.socketId) {
        messageClass = 'userMessage';
      } else {
        messageClass = 'othersMessage';
      }

      if(data.sampAction == 'particularMessage') {
        private_room = particular_windows_tab[data.extra.salaId];

        if(!private_room) {
          socket.post('/socket/openParticularChat', {targetUsername: data.username}, function(_data) {
            createParticularChat(data.username, data.extra.salaId);
          });
        }

        targetContainer = private_room.getTabElement().find('.panel .messages');
        targetDiv = private_room.getTabElement();
      } else {
        targetContainer = webchat.messagesContainer();
        targetDiv = $('#'+webchat_tab.getId());
      }

      var newMessageDiv = $('<div></div>')
        .addClass('col-md-12')
        .css({margin: 0, padding: 0})
        .append(
          $('<div></div>')
            .addClass(messageClass)
            .addClass('geral')
            .append(
              $('<div></div>')
                .addClass('username')
                .append($('<b></b>')
                  .append(data.username)
                )
            ).append(
              $('<div></div>')
                .addClass('messageText')
                .addClass('force-break-line')
                .append(data.message)
            )
        );


      targetContainer.append(newMessageDiv);
      webchat.internalUpdateScroll(targetDiv.find('.messages'));
    }
  },

  notifications: {
    create: function(message) {
      var notificationDiv = $('<div></div>')
          .addClass('text-center')
          .addClass('notification')
          .append(message)
        ;

      webchat.messagesContainer().append(notificationDiv);

      webchat.internalUpdateScroll();
    }
  },

  users: {
    login: function(username, loginType) {
      if($('#webchatUser_'+username).length == 0) {
        var userDiv = $('<div></div>')
          .attr({'id': 'webchatUser_'+username})
          .addClass('col-md-12')
          .addClass('text-left')
          .addClass('username')
          .addClass('force-break-line')
          .append(username)
          .append(
            $('<span></span>')
              .addClass('loginType')
              .append(loginType)
          ).append(
            $('<input/>')
              .attr({'id': 'targetName', value: username, type: 'hidden'})
          );

        webchat.usersContainer().append(userDiv);

        webchat.notifications.create('<b>' + username + '</b> entrou.' );
      }
    },
    logout: function(username) {
      var user = $('#webchatUser_'+username);

      if(user.length > 0) {
        user.remove();

        webchat.notifications.create('<b>' + username + '</b> saiu.' );
      }
    }
  },

  internalUpdateScroll: function(container) {
    if(!container) {
      container = $('#'+webchat_tab.getId());
    }

    setCoreTabNotifications(container, getTabNotifications(container) + 1);

    container.scrollTop(this.messagesContainer().get(0).scrollHeight);
  }
}