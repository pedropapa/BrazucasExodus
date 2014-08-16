var flashElements = [];

// Callback será chamada ao carregar todas as páginas do sistema.
$(document).ready(function() {
  // Cria o tab do webchat.
  createCoreTab('webchat', 'Chat do Servidor', 200);

  // Inicializa o WebChat
  launchWebChat();
});

function launchWebChat() {
  setCoreTabContent('#webchat', '' +
    '<form id="chatForm">'+
    '<div class="chat">' +
    '<div class="panel">' +
    '<div class="messages"></div>' +
    '<div class="newMessageArea"><input type="text" maxlength="'+brazucasConfig.maxChatMessageLength+'" class="textArea"/></div>' +
    '</div>' +
    '<div class="loggedUsers"></div>' +
    '</div>'+
    '</form>'
  );

  $('#webchat').click(function() {
    $(this).find('.textArea').focus();
  });

  $('#chatForm').submit(function(e) {
    var message = $(this).find('.textArea');

    if(message.val().length > 0) {
      socket.post('/socket/chatMessage', {message: message.val()}, function(data) {
        message.val('');
        message.focus();
      });
    }

    e.preventDefault();
  })
}

function adjustTabs() {
  var nextRight = 0;

  $('.floatTabs').find('.floatTab').each(function() {
    $(this).css('right', nextRight);
    nextRight += parseInt($(this).css('width')) + 15;
  });

  // Notificações chegaram no limite da página, habilitar gerenciador de notificações
  if($('.floatTab').last().offset().left <= 0) {
    alert(123);
  }
}

function hideNotifications(obj) {
  $(obj).find('.tabTitle .notifications').hide();
  $(obj).find('.tabTitle').stopFlash();
  $(obj).find('.tabTitle .notifications').html('0');
}

function showNotifications(obj) {
  if(getTabNotifications(obj) > 0) {
    $(obj).find('.tabTitle .notifications').show();
  }
}

function setCoreTabContent(obj, content) {
  $(obj).find('.tabContent').html(content);
}

function setCoreTabNotifications(obj, val) {
  var notificationElement = $(obj).find('.tabTitle .notifications');
  var parentContent = $(obj).find('.tabContent');

  if(val > 0) {
    if(val > 99) {
      val = '99+';
    }

    notificationElement.html(val);

    if(parentContent.is(':hidden')) {
      notificationElement.show();

      $(obj).find('.tabTitle').flash(1500);
    }
  } else {
    hideNotifications(obj);
  }
}

function createCoreTab(elementId, title, width) {
  var ele = $('<div></div>')
    .addClass('floatTab')
    .css({minWidth: width})
    .click(function() {
      hideNotifications(this);
      adjustTabs();
    })
    .attr({id: elementId})
    .append(
      $('<div></div>')
        .addClass('tabTitle')
        .append(
          $('<span></span>')
            .addClass('notifications')
            .append('0')
        )
        .click(function() {
          var floatTab     = $(this).parent('div');
          var tabContent  = floatTab.find('.tabContent');

          if(tabContent.is(':hidden')) {
            hideNotifications(floatTab);
            tabContent.show();
          } else {
            showNotifications(floatTab);
            tabContent.hide();
          }
        })
        .append(' '+title)
    )
    .append(
      $('<div></div>')
        .addClass('tabContent')
    )

  $('.floatTabs').append(ele);

  adjustTabs();
}

function getTabNotifications(obj) {
  var notificationElement = $(obj).find('.tabTitle .notifications');
  var notifications = parseInt(notificationElement.html());

  return notifications;
}
// Objeto responsável pelo gerenciamento do webchat.
var webchat = {
  messagesContainer: function() {return $('#webchat .chat .panel .messages')},
  usersContainer: function() {return $('#webchat .chat .loggedUsers')},

  othersMessage: {
    create: function(username, message) {
      var newMessageDiv = $('<div></div>')
        .addClass('othersMessage')
        .append(
          $('<div></div>')
            .addClass('username')
            .append($('<b></b>')
              .append(username)
            )
        ).append(
          $('<div></div>')
            .addClass('messageText')
            .append(message)
        );

      webchat.messagesContainer().append(newMessageDiv);

      webchat.internalUpdateScroll();
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
          .addClass('username')
          .append(username)
          .append(
            $('<span></span>')
              .addClass('loginType')
              .append(loginType)
          );

        webchat.usersContainer().append(userDiv);

        webchat.notifications.create('<b>' + data.username + '</b> entrou.' );
      }
    }
  },

  internalUpdateScroll: function() {
    setCoreTabNotifications('#webchat', getTabNotifications('#webchat') + 1);

    this.messagesContainer.scrollTop(messagesContainer.get(0).scrollHeight);
  }
}

// Objeto responsável pelas notificações do servidor dentro do UCP.
var sampServerNotifications = {
  // Notificações de mortes do servidor.
  killEvent: function(killerName, playerName, weapon, timestamp, gamemodeOrMinigameName) {
    var dateObject = new Date(timestamp);
    noty({
      text: '' +
        '<div class="container-fluid text-center">' +
          '<b>'+killerName+'</b> mata <b>'+playerName+'</b>' +
        '</div>' +

        '<hr style="margin: 3px"/>' +

        '<div class="container-fluid">' +
          '<div class="weapon col-md-6">' +
            '<img src="/images/sampWeapons/'+weapon+'.png"/>' +
          '</div>' +
          '<div class="gamemodeOrMinigameName col-md-6 text-center">' +
            gamemodeOrMinigameName+
            '<br /><br />'+
            '<small>'+dateObject.getHours()+':'+dateObject.getMinutes()+';'+dateObject.getSeconds()+'</small>' +
          '</div>' +
        '</div>' +
      '',
      timeout: 3000,
      layout: 'bottomLeft',
      template: '<div class="noty_message row"><span class="noty_text"></span><div class="noty_close"></div></div>'
    });
  },
  userQuoteEvent: function(quoterName, message) {
    noty({
      text: '' +
        '<div class="container-fluid text-center">' +
        'Você foi citado no servidor!' +
        '</div>' +

        '<hr style="margin: 3px"/>' +

        '<div class="container-fluid">' +
          '<div class="weapon col-md-12">' +
            '<b>'+quoterName+'</b>: '+ message +
          '</div>' +
        '</div>' +
        '',
      timeout: 3000,
      layout: 'bottomLeft',
      type: 'warning',
      template: '<div class="noty_message row"><span class="noty_text"></span><div class="noty_close"></div></div>'
    });
  }
}