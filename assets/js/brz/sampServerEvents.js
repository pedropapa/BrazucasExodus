// Objeto responsável pelas notificações do servidor dentro do UCP.
var sampServerEvents = {
  // Notificações de mortes do servidor.
  sampServerKill: function(data) {
    var killerName              = data.killerName;
    var playerName              = data.deadName;
    var weapon                  = data.reason;
    var timestamp               = (new Date()).getTime();
    var gamemodeOrMinigameName  = serverRpgMinigames.getMode();

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
  },

  chatMessage: function(data) {
    webchat.othersMessage.create(data);
  },

  particularMessage: function(data) {
    webchat.othersMessage.create(data);
  },

  updateServerBasicStats: function(data) {
    serverRpgMinigames.setMode(data.hostname);
    serverRpgMinigames.setPlayersOnline(data.onlinePlayers);
    serverRpgMinigames.setMaxPlayers(data.maxPlayers);
    serverRpgMinigames.setMapname(data.mapname);

    $('.server-widget #mode').html(data.hostname);
    $('.server-widget #players').html(data.onlinePlayers);
    $('.server-widget #maxplayers').html(data.maxPlayers);
    $('.server-widget #map').html(data.mapname);
  },

  serverRpgMinigamesConnect: function(data) {
    if(serverRpgMinigames.hasBeenOnline) {
      serverWidgetNotyContainer = $('.server-widget #notyContainer').noty({text: 'Reconectado com sucesso!.', type: 'success', killer: true, timeout: 3000, closeWith: []});
    } else {
      serverRpgMinigames.hasBeenOnline = true;
      serverWidgetNotyContainer.close();
    }

    serverRpgMinigames.setIsOnline(true);
  },

  serverRpgMinigamesDisconnect: function(data) {
    serverWidgetNotyContainer = $('.server-widget #notyContainer').noty({text: 'Conexão com o servidor RPG/Minigames perdida.', type: 'error', killer: true, closeWith: []});

    serverRpgMinigames.setIsOnline(false);
  }
}