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

    prefix: 'chat_',
    geral: this.prefix + '1'

};
