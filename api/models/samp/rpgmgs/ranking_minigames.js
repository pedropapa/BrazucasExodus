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

  attributes: {
    ID: {
      type: 'integer',
      unique: true,
      primaryKey: true,
      autoIncrement: true
    },
    NICK: {
      model: 'contas_mgs',
      via: 'NOME'
    },
    TP_RANKING: {
      model: 'tp_ranking_mgs',
      via: 'NU_RANKING'
    },
    SCORE: {
      type: 'integer',
      unique: false,
      required: false
    },
    PARTIDAS: {
      type: 'integer',
      unique: false,
      required: false
    }
  }
};




