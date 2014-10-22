var session = {};
var flashElements = [];

var webchat_tab = null;
var feedback_tab = null;
var particular_windows_tab = [];

// Callback será chamada ao carregar todas as páginas do sistema.
$(document).ready(function() {
  // Cria o tab do feedback.
  launchTaskManagerTab();
  launchFeedbackTab();
  launchWebChat();

  $(window).on("resize", function() {FloatTabs.adjustTabs()});

  $('.playButton').click(function() {
    if($(this).hasAttribute('ip')) {
      window.open('samp://'+ $(this).prop('ip'));
    }
  });

  var nav = $('.main-menu');

  $(window).scroll(function () {
    if ($(this).scrollTop() > 130) {
      nav.addClass("f-nav");
    } else {
      nav.removeClass("f-nav");
    }
  });
});

function launchTaskManagerTab() {

}

function launchFeedbackTab() {
  feedback_tab = new FloatTab('feedback', 'Problemas?');

  feedback_tab.setContent('<div style="margin-left: 5px; margin-right: 5px;">'+
    '<b>Encontrou um problema no site?</b>' +
    '<br /><br />' +
    'Por gentileza preencha o formulário abaixo para que nossa equipe possa resolver o problema o mais rápido possível.' +
    '<br /><br />'+
    'Descreva com detalhes o erro encontrado:' +
    '<br />'+
    '<textarea style="width: 100%" rows="5"></textarea>'+
    '<br /><br />'+
    'Imagem atual da tela:'+
    '<br />'+
    '<div style="width: 300px; height: 200px;"'+
    '<a onclick="window.open($(this).find(\'img:first\').attr(\'src\'))" target="_blank">' +
    '<img id="feedback_image" width="300px" height="200px"/>' +
    '</a>'+
    '</div>'+
    '<br /><br />' +
    '<div class="container-fluid">'+
    '<div class="col-md-6 text-left" style="padding: 0px;"><input type="submit" class="btn btn-danger" onclick="feedback_tab.toggle()" value="Cancelar"></div>'+
    '<div class="col-md-6 text-right" style="padding: 0px;"><input type="submit" class="btn btn-primary" value="Enviar"></div>'+
    '</div>'+
    '</div>'+
    '<br />'
  );

  feedback_tab.applyEvent('click', '.tabTitle', function() {
    html2canvas(document.body, {
      onrendered: function(canvas) {
        feedback_tab.getTabElement().find('#feedback_image').attr('src', canvas.toDataURL());
      }
    });
  });
}

function launchWebChat() {
  webchat_tab = new FloatTab('webchat', 'Chat do Servidor');

  webchat_tab.setClasses(['webchat']);

  webchat_tab.setContent('' +
    '<form id="chatForm" class="row container-fluid" style="width: 500px;">'+
    '<div class="chat col-md-8">' +
    '<div class="panel">' +
    '<div class="messages"></div>' +
    '<div class="newMessageArea row container-fluid col-md-12"><input type="text" maxlength="'+brazucasConfig.maxChatMessageLength+'" class="textArea"/></div>' +
    '</div>' +
    '</div>'+
    '<div class="loggedUsers chat col-md-4"></div>' +
    '</form>'
  );

  webchat_tab.applyEvent('click', '.tabTitle', function() {
    $(this).find('.textArea').focus();
  });

  webchat_tab.applyEvent('submit', '.tabContent', function(e) {
    var message = $(this).find('.textArea');

    if(message.val().length > 0) {
      socket.post('/socket/chatMessage', {message: message.val()}, function(data) {
        message.val('');
        message.focus();
      });
    }

    e.preventDefault();
  });

  webchat_tab.applyEvent('click', '.loggedUsers .username', function(e) {
    var userName = $(this).find('#targetName').val();

    socket.post('/socket/openParticularChat', {targetUsername: userName}, function(data) {
      if(data.error) {
        noty({text: 'Um erro ocorreu ao tentar abrir o chat.'+(data.message)?'<br /><strong>'+data.message+'</strong>':'', timeout: 8000, layout: 'top', type: 'warning'});
      } else {
        createParticularChat(userName, data.salaId);
      }
    });
  });
}

function createParticularChat(username, salaId) {
  if(!particular_windows_tab[salaId]) {
    particular_windows_tab[salaId] = new FloatTab('pvt_'+salaId, username, 150);

    particular_windows_tab[salaId].setContent('' +
      '<form id="particularChatForm" class="row container-fluid">'+
      '<input type="hidden" value="'+username+'" id="userName"/>'+
      '<input type="hidden" value="'+salaId+'" id="salaId"/>'+
      '<div class="chat col-md-12">' +
      '<div class="panel">' +
      '<div class="messages"></div>' +
      '<div class="newMessageArea row container-fluid col-md-12"><input type="text" maxlength="'+brazucasConfig.maxChatMessageLength+'" class="textArea"/></div>' +
      '</div>' +
      '</div>'+
      '</form>');

    particular_windows_tab[salaId].applyEvent('submit', '#particularChatForm*', function(e) {
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
}

