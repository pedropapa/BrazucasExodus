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