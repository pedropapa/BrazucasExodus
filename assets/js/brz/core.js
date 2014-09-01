var session = {};
var flashElements = [];

// Callback será chamada ao carregar todas as páginas do sistema.
$(document).ready(function() {
  // Cria o tab do webchat.
  createCoreTab('webchat', 'Chat do Servidor', false);

  // Inicializa o WebChat
  launchWebChat();
});

function launchWebChat() {
  setCoreTabContent('#webchat', '' +
    '<form id="chatForm" class="row container-fluid">'+
    '<div class="chat col-md-8">' +
    '<div class="panel">' +
    '<div class="messages"></div>' +
    '<div class="newMessageArea row container-fluid col-md-12"><input type="text" maxlength="'+brazucasConfig.maxChatMessageLength+'" class="textArea"/></div>' +
    '</div>' +
    '</div>'+
    '<div class="loggedUsers chat col-md-4"></div>' +
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
  });

  $(document).on('click', '#webchat .loggedUsers .username', function(e) {
    var userName = $(this).find('#targetName').val();

    socket.post('/socket/openParticularChat', {targetUsername: userName}, function(data) {
      if(data.error) {
        noty({text: 'Um erro ocorreu ao tentar abrir o chat.'+(data.message)?'<br /><strong>'+data.message+'</strong>':'', timeout: 8000, layout: 'top', type: 'warning'});
      } else {
        createParticularChat(userName, data.salaId);
      }
    });
  });

  $(document).on('submit', '#particularChatForm*', function(e) {
    var message = $(this).find('.textArea');
    var target = $(this).find('#userName');
    var sala = $(this).find('#salaId');

    if(message.val().length > 0) {
      socket.post('/socket/particularChatMessage', {message: message.val(), target: target.val(), salaId: sala.val()}, function(data) {
        message.val('');
        message.focus();
      });
    }

    e.preventDefault();
  });
}

function createParticularChat(username, salaId) {
  if($('#pvt_'+salaId).length == 0) {
    createCoreTab('pvt_'+salaId, username, 200);

    setCoreTabContent('#pvt_'+ salaId, '' +
      '<form id="particularChatForm" class="row container-fluid">'+
      '<input type="hidden" value="'+username+'" id="userName"/>'+
      '<input type="hidden" value="'+salaId+'" id="salaId"/>'+
      '<div class="chat col-md-12">' +
      '<div class="panel">' +
      '<div class="messages"></div>' +
      '<div class="newMessageArea row container-fluid col-md-12"><input type="text" maxlength="'+brazucasConfig.maxChatMessageLength+'" class="textArea"/></div>' +
      '</div>' +
      '</div>'+
      '</form>'
    );
  }
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
  obj.find('.tabTitle .notifications').hide();
  obj.find('.tabTitle').stopFlash();
  obj.find('.tabTitle .notifications').html('0');
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
  var notificationElement = obj.find('.tabTitle .notifications');
  var parentContent = obj.find('.tabContent');

  if(val > 0) {
    if(val > 99) {
      val = '99+';
    }

    notificationElement.html(val);

    if(parentContent.is(':hidden')) {
      notificationElement.show();

      obj.find('.tabTitle').flash(1500);
    }
  } else {
    hideNotifications(obj);
  }
}

function createCoreTab(elementId, title, width) {
  var ele = $('<div></div>')
    .addClass('floatTab')
    .click(function() {
      hideNotifications(this);
      adjustTabs();
    })
    .attr({id: elementId})
    .css({width: (width)?width:'auto'})
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
  var notificationElement = obj.find('.tabTitle .notifications');
  var notifications = parseInt(notificationElement.html());

  return notifications;
}
// Objeto responsável pelo gerenciamento do webchat.
var webchat = {
  messagesContainer: function() {return $('#webchat .panel .messages')},
  usersContainer: function() {return $('#webchat .loggedUsers')},

  othersMessage: {
    create: function(data) {
      var messageClass;
      var targetContainer;
      var targetDiv;

      if(data.socketId == session.socketId) {
        messageClass = 'userMessage';
      } else {
        messageClass = 'othersMessage';
      }

      if(data.sampAction == 'particularMessage') {
        targetContainer = $('#pvt_'+data.extra.salaId+' .panel .messages');
        targetDiv = $('#pvt_'+data.extra.salaId);

        if(targetContainer.length == 0) {
          socket.post('/socket/openParticularChat', {targetUsername: data.username}, function(_data) {
            createParticularChat(data.username, data.extra.salaId);
            targetContainer = $('#pvt_'+data.extra.salaId+' .panel .messages');
            targetDiv = $('#pvt_'+data.extra.salaId);
          });
        }
      } else {
        targetContainer = webchat.messagesContainer();
        targetDiv = $('#webchat');
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
      webchat.internalUpdateScroll(targetDiv);
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
      container = $('#webchat');
    }

    setCoreTabNotifications(container, getTabNotifications(container) + 1);

    container.scrollTop(this.messagesContainer().get(0).scrollHeight);
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