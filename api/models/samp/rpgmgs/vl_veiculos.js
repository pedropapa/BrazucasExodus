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
    ID_VEICULO: {
      type: 'integer'
    },
    FL_VEICULO: {
      type: 'integer',
      unique: false,
      required: true
    },
    NM_VEICULO: {
      type: 'string',
      unique: false,
      required: true
    },
    VL_COMUM_VEICULO: {
      type: 'integer',
      unique: false,
      required: true
    },
    VL_CREDITOS_VEICULO: {
      type: 'integer',
      unique: false,
      required: true
    },
    CT_VEICULO: {
      model: 'tp_veiculos',
      via: 'ID_CAT'
    },
    NV_VEICULO: {
      type: 'integer',
      unique: false,
      required: true
    }
  }
};




