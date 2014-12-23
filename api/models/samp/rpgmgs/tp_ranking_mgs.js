/**
 * Usuario
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {
  connection: 'sampDb',
  migrate: 'safe',
  autoPK: false,
  autoCreatedAt: false,
  autoUpdatedAt: false,

  domain: {
    DM: 1,
    TDM: 2,
    CORRIDA: 3,
    DERBY: 4
  },

  attributes: {
    ID: {
      type: 'integer',
      unique: true,
      primaryKey: true,
      autoIncrement: true
    },
    NU_RANKING: {
      type: 'integer',
      unique: true,
      required: true
    },
    NM_RANKING: {
      type: 'string',
      maxLength: 45,
      unique: true,
      required: true
    },
    DESC_RANKING: {
      type: 'string',
      unique: false,
      required: true,
      maxLength: 500
    },
    TP_MINIGAME: {
      model: 'tipo_minigame',
      via: 'TIPO'
    }
  }
};




