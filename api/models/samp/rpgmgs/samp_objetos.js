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
    NR_OBJETO: {
      type: 'integer',
      unique: true
    },
    CT_OBJETO: {
      type: 'string',
      unique: false,
      required: true
    },
    NM_OBJETO: {
      type: 'string',
      unique: false,
      required: true
    }
  }
};




