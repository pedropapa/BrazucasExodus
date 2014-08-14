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
    '<div class="chat">' +
    '<div class="panel">' +
    '<div class="messages"></div>' +
    '<div class="newMessageArea"><input type="text" maxlength="128" class="textArea"/></div>' +
    '</div>' +
    '<div class="loggedUsers"></div>' +
    '</div>'
  );


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