$(document).ready(function() {
  $('.server-widget').hover(function(handlerInOut) {
    if(handlerInOut.type == 'mouseenter') {
      $(this).find('.playRpgMinigames').show();
      $(this).find('h1,table').css('opacity','0.3');
    } else {
      $(this).find('.playRpgMinigames').hide();
      $(this).find('h1,table').css('opacity','1');
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

  $('.social #login').click(function() {
    $.ajax({
      url: '/ucp',
      beforeSend: function(xhr) {
        $('.social').find('div').not('.ajaxWait').not('.ajaxWait div').not('.no-opacity').css('opacity', '0.5');
        $('.social .ajaxWait').show();
      },
      timeout: 8000,
      complete: function() {
        $('.social').find('div').not('.ajaxWait').not('.ajaxWait div').not('.no-opacity').css('opacity', '1');
      }
    }).error(function(jqXHR, textStatus, errorThrown) {
      var notyText = null;
      switch(textStatus) {
        case 'timeout':
          notyText = 'Tempo limite atingido, tente novamente.';
          break;
        case 'error':
          notyText = 'URL não encontrada!';
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

      $('.social .noty-container').noty({text: notyText, type: 'warning', killer: true, timeout: 3000});
    }).success(function(data) {
        $('#loginForm').fadeOut('fast', function() {
          $('#loggedUserInfo').fadeIn();
        });
      }).always(function() {
        $('.social').find('div').not('.ajaxWait').not('.ajaxWait div').not('.no-opacity').css('opacity', '1');
        $('.social .ajaxWait').hide();
    });

  });
});