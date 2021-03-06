/**
 * Usuario
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {
    connection: 'memory',
    autoPK: false,

//    beforeCreate: function (attrs, next) {
//        var bcrypt = require('bcryptjs');
//
//        bcrypt.genSalt(10, function(err, salt) {
//            if (err) return next(err);
//
//            bcrypt.hash(attrs.password, salt, function(err, hash) {
//                if (err) return next(err);
//
//                attrs.password = hash;
//                next();
//            });
//        });
//    },

    attributes: {
        id: {
          type: 'integer',
          unique: true,
          primaryKey: true,
          autoIncrement: true
        },
        socketId: {
          type: 'string',
          unique: true,
          required: false
        },
        source: {
          type: 'string',
          required: true
        },
        username: {
          type: 'string',
          unique: true,
          required: true
        }//,
//        password: {
//            type: 'string',
//            required: true,
//            minLength: 6
//        }
    }

};
