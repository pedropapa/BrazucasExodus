var serverWidgetNotyContainer = null;

$(document).ready(function() {
  serverWidgetNotyContainer = $('.server-widget #notyContainer').noty({text: 'Sem conexão com o servidor RPG/Minigames.', type: 'error', killer: false, closeWith: []});

  changeMenuActivePage($('[href="'+window.location.pathname+'"]'));

  $('.server-widget').hover(function(handlerInOut) {
    if(serverRpgMinigames.getIsOnline()) {
      if(handlerInOut.type == 'mouseenter') {
        $(this).find('.playRpgMinigames').show();
        $(this).find('h1,table').css('opacity','0.3');
      } else {
        $(this).find('.playRpgMinigames').hide();
        $(this).find('h1,table').css('opacity','1');
      }
    }
  });

  $('.playRpgMinigames').click(function() {
    isProtocolSupported('samp', function(protocol_name, isSupported) {
      if(isSupported) {
        window.location = 'samp://'+brazucasConfig.serverIp+ ':' + brazucasConfig.serverPort;
      }
    });
  });

  $('.social').hover(function(handlerInOut) {
    if(handlerInOut.type == 'mouseenter') {
      $(this).find('img').css('opacity','0.3');
    } else {
      $(this).find('img').css('opacity','1');
    }
  });

  $('.social img').hover(function(handlerInOut) {
    if(handlerInOut.type == 'mouseenter') {
      $(this).addClass('shadowed');
      $(this).css('opacity','1');
    } else {
      $(this).removeClass('shadowed');
      $(this).css('opacity','0.3');
    }
  });

  $('.main-menu span').hover(function(handlerInOut) {
    if(handlerInOut.type == 'mouseenter') {
      if($(this).find('.menuItem').html().length > 0) {
        $(this).find('.menuItem').show();

        var menuItemMarginLeft = (parseInt($(this).css('width')) - parseInt($(this).find('.menuItem').css('width')))/2;

        if(menuItemMarginLeft < 0) {
          $(this).find('.menuItem').css('margin-left', menuItemMarginLeft);
        }
      }
    } else {
      $(this).find('.menuItem').hide();
    }
  });

  $('#loginForm form').submit(function() {
    $.ajax({
      url: '/login',
      type: 'POST',
      data: {nick: $('#loginForm #nick').val(), senha: $('#loginForm #senha').val()},
      beforeSend: function(xhr) {
        $('#loginForm').find('div').not('.ajaxWait').not('.ajaxWait div').not('.no-opacity').css('opacity', '0.5');
        $('#loginForm .ajaxWait').show();
      },
      timeout: 8000
    }).error(function(jqXHR, textStatus, errorThrown) {
      var notyText = null;
      switch(textStatus) {
        case 'timeout':
          notyText = 'Tempo limite atingido, tente novamente.';
          break;
        case 'error':
          notyText = 'Um erro interno de servidor ocorreu!';
          break;
        case 'abort':
          notyText = 'Requisição abortada! tente novamente.';
          break;
        case 'parsererror':
          notyText = 'Requisição mal formatada, tente novamente.';
          break;
        default:
          notyText = 'Um erro desconhecido ocorreu, tente novamente.';
          break;
      }

      $('#loginForm .noty-container').noty({text: notyText, type: 'warning', /*killer: true,*/ timeout: 3000});
    }).success(function(data) {
        if(data.error) {
          $('#loginForm .noty-container').noty({text: data.message, type: 'error', /*killer: true,*/ timeout: 3000});
        } else if(data.success) {
          var kills   = data.infos.kills;
          var deaths  = data.infos.deaths;
          var assists = data.infos.assists;
          var nick    = data.infos.nick;

          $('#loggedUserInfo #nickname').html(nick);
          $('#loggedUserInfo #kills').html(kills);
          $('#loggedUserInfo #deaths').html(deaths);
          $('#loggedUserInfo #assists').html(assists);

          $('#loginForm').fadeOut('fast', function() {
            $('#loggedUserInfo').fadeIn();
          });
        } else {
          $('#loginForm .noty-container').noty({text: 'Um erro desconhecido ocorreu!', type: 'error', /*killer: true,*/ timeout: 3000});
        }
      }).always(function() {
        $('#loginForm').find('div').not('.ajaxWait').not('.ajaxWait div').not('.no-opacity').css('opacity', '1');
        $('#loginForm .ajaxWait').hide();
    });

    return false;
  });

  $("#loggedUserInfo #sair").click(function() {
    $.ajax({
      url: '/logout',
      type: 'POST',
      beforeSend: function(xhr) {
        $('#loggedUserInfo').find('div').not('.ajaxWait').not('.ajaxWait div').not('.no-opacity').css('opacity', '0.5');
        $('#loggedUserInfo .ajaxWait').show();
      },
      timeout: 8000
    }).error(function(jqXHR, textStatus, errorThrown) {
        var notyText = getAjaxErrorText(textStatus);

        $('#loggedUserInfo .noty-container').noty({text: notyText, type: 'warning', /*killer: true,*/ timeout: 3000});
      }).success(function(data) {
        if(data.error) {
          $('#loggedUserInfo .noty-container').noty({text: data.message, type: 'error', /*killer: true,*/ timeout: 3000});
        } else if(data.success) {
          window.location.reload();
        } else {
          $('#loggedUserInfo .noty-container').noty({text: 'Um erro desconhecido ocorreu!', type: 'error', /*killer: true,*/ timeout: 3000});
        }
      }).always(function() {
        $('#loggedUserInfo').find('div').not('.ajaxWait').not('.ajaxWait div').not('.no-opacity').css('opacity', '1');
        $('#loggedUserInfo .ajaxWait').hide();
      });
  });

  $('.main-menu a').click(function(e) {
    var parent = this;
    var iframeLoadInterval = null;

    $.ajax({
      url: $(parent).attr('href'),
      type: 'GET',
      beforeSend: function(xhr) {
        $('.page-content-overlay').css('width', $('.page-content').css('width'));
        $('.page-content-overlay').css('height', $('.page-content').css('height'));

        $('.page-content-overlay').show();
        iframeLoadInterval = setInterval(function() {$('#hiddenIframe').attr('src', 'data:text/html')}, 1);
      },
      timeout: 8000
    }).error(function(jqXHR, textStatus, errorThrown) {
        var notyText = getAjaxErrorText(textStatus);

        $('.page-content .noty-container').noty({text: notyText, type: 'warning', /*killer: true,*/ timeout: 3000});
      }).success(function(data) {
        if(data.error) {
          $('.page-content .noty-container').noty({text: data.message, type: 'warning', /*killer: true,*/ timeout: 3000});
        } else {
          var elements = $.parseHTML(data);
          var windowTitle = null;

          $.each(elements, function(i, el) {
            switch($(el).attr('id')) {
              case '_call_ajax_page_title':
                windowTitle = $(el).val();
                break;
            }
          });

          $('.page-content').html(data);

          changeMenuActivePage(parent);

          History.pushState({state: 3,rand:Math.random()}, windowTitle, $(parent).attr('href'));
        }
      }).always(function() {
        clearInterval(iframeLoadInterval);
        $('.page-content-overlay').hide();
      });

    e.preventDefault();
    return false;
  })
});

function changeMenuActivePage(element) {
  $('.main-menu').find('.active').removeClass('active');

  if($(element).parent('.menuItem').size() > 0) {
    $(element).parents('span').find('li').addClass('active');
  } else {
    $(element).find('li').addClass('active');
  }
}