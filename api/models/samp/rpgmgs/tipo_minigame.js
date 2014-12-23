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
    DERBY: 1,
    CORRIDA: 2,
    DM: 3,
    TDM: 4
  },

  attributes: {
    ID: {
      type: 'integer',
      unique: true,
      primaryKey: true,
      autoIncrement: true
    },
    TIPO: {
      type: 'integer',
      unique: true,
      required: true
    },
    NM_TIPO: {
      type: 'string',
      maxLength: 100,
      unique: true,
      required: true
    }
  }
};




