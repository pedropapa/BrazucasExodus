/**
 * competitivo_modo
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {
  connection: 'memory',
  autoPK: false,

  domain: {
    IN_QUEUE: 1,
    IN_GAME: 2
  },

  attributes: {
    ID: {
      type: 'integer',
      unique: true,
      primaryKey: true,
      autoIncrement: true
    },
    modo: {
      model: 'competitivo_modo'
    },
    Usuario: {
      model: 'Usuario'
    },
    status: {
      type: 'integer',
      required: true
    }
  }
};




