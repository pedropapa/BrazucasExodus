var serverRpgMinigames = {
  isOnline: true,
  playersOnline: 0,
  maxPlayers: 0,
  mapname: null,
  mode: null,
  hasBeenOnline: false,

  setIsOnline: function(isOnline) {
    this.isOnline = isOnline;
  },

  getIsOnline: function() {
    return this.isOnline;
  },

  setPlayersOnline: function(playersOnline) {
    this.playersOnline = playersOnline;
  },

  getPlayersOnline: function() {
    return this.playersOnline;
  },

  setMaxPlayers: function(maxPlayers) {
    this.maxPlayers = maxPlayers;
  },

  getMaxPlayers: function() {
    return this.maxPlayers;
  },

  setMapname: function(mapname) {
    this.mapname = mapname;
  },

  getMapname: function() {
    return this.mapname;
  },

  setMode: function(mode) {
    this.mode = mode;
  },

  getMode: function() {
    return this.mode;
  }
}