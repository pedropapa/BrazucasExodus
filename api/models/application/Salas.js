/**
 * Salas
 *
 * Model responsável por guardar as constantes de cada sala da aplicação.
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {
    connection: 'memory',
    autoPK: false,

    geral: 'chat_1',

    attributes: {
      id: {
        type: 'integer',
        unique: true,
        primaryKey: true,
        autoIncrement: true
      },
      salaId: {
        type: 'string',
        unique: true,
        required: true
      },
      usuarioFrom: {
        model: 'Usuario',
        required: true
      },
      usuarioTo: {
        model: 'Usuario',
        required: true
      }
    }

};
