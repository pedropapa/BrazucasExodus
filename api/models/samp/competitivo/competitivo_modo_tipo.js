/**
 * competitivo_modo_tipo
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
    MODO: 1,
    MODO_TIPO: 2,
    MODO_FORMA: 3
  },

  attributes: {
    ID: {
      type: 'integer',
      unique: true,
      primaryKey: true,
      autoIncrement: true
    },
    CO_TIPO: {
      type: 'integer',
      required: true
    },
    DS_TIPO: {
      type: 'string',
      maxLength: 45,
      required: true
    }
  }
};




