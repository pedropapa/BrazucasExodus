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
    NM_MINIGAME: {
      type: 'string',
      maxLength: 45,
      unique: true,
      required: true
    },
    ID_MINIGAME: {
      type: 'integer',
      unique: true,
      required: true
    },
    TP_MINIGAME: {
      model: 'tipo_minigame',
      via: 'TIPO'
    },
    NM_EQUIPE1: {
      type: 'string',
      maxLength: 45,
      unique: false,
      required: false
    },
    NM_EQUIPE2: {
      type: 'string',
      maxLength: 45,
      unique: false,
      required: false
    },
    NM_EQUIPE3: {
      type: 'string',
      maxLength: 45,
      unique: false,
      required: false
    },
    NM_EQUIPE4: {
      type: 'string',
      maxLength: 45,
      unique: false,
      required: false
    }
  }
};




