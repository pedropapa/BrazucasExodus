/**
 * competitivo_modo
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

  attributes: {
    ID: {
      type: 'integer',
      unique: true,
      primaryKey: true,
      autoIncrement: true
    },
    DS_MODO: {
      type: 'string',
      required: true,
      maxLength: 45
    },
    LABEL_MODO: {
      type: 'string',
      maxLength: 45,
      required: true
    },
    TP_MODO: {
      model: 'competitivo_modo_tipo'
    },
    NU_JOGADORES: {
      type: 'integer'
    },
    PARENTE: {
      model: 'competitivo_modo',
      via: 'ID'
    },
    ATIVO: {
      type: 'integer',
      defaultsTo: 1
    },
    HIDDEN_TEXT: {
      type: 'string',
      required: true
    }
  }
};




