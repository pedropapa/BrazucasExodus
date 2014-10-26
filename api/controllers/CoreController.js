/**
 * CoreController
 *
 * @module      :: Controller
 * @description	:: Controller da rota /ucp, utilizado para login ao Painel.
 */

module.exports = {
  /**
   * Action login
   *
   * Responsável por tratar as tentativas de login recebidas pela aplicação.
   *
   * @param req
   * @param res
   */
  login: function(req, res) {
    var nick    = req.param('nick');
    var passwd  = req.param('senha');

    if(nick.length == 0 || passwd.length == 0) {
      res.json({error: true, message: 'Login e/ou senha não informados.'});
    } else if(UtilsService.isValidNickname(nick) && UtilsService.isValidPassword(passwd)) {
      var finishObject = {conta_mg: null, conta_rpg: null};

      var finishRequest = function(finishObject) {
        if(!finishObject.conta_mg && !finishObject.conta_rpg) {
          res.json({error: true, message: 'Login e/ou senha incorretos.'});
        } else {
          var info_nickname = (finishObject.conta_mg)?finishObject.conta_mg.NOME:finishObject.conta_rpg.NICK;

          var info_matou    = (finishObject.conta_mg)?finishObject.conta_mg.Matou:0;
          var info_morreu   = (finishObject.conta_mg)?finishObject.conta_mg.Morreu:0;
          var info_assists  = (finishObject.conta_mg)?finishObject.conta_mg.Assistencias:0;

          var loginInfo = {nick: info_nickname, kills: info_matou, deaths: info_morreu, assists: info_assists, conta_mg: (finishObject.conta_mg)?true:false, conta_rpg: (finishObject.conta_rpg)?true:false };

          // Atualiza dados temporários
          Usuario.findOne({username: req.session.usuario.username}).exec(function(error, objUsuario) {
            if(!error && objUsuario !== undefined) {
              Usuario.findOne({username: info_nickname}).exec(function(findError, findUsuario) {
                if(!findError && findUsuario !== undefined) {
                  res.json({error: true, message: 'Este usuário já está autenticado na aplicação!'});
                } else {
                  Usuario.update({username: req.session.usuario.username}, {username: info_nickname, isPlayer: true}).exec(function(updateError, updatedUsuario) {
                    if(!updateError && updatedUsuario !== undefined) {
                      // Grava/Atualiza cookies de login.
                      req.session.loginInfo = loginInfo;

                      req.session.usuario = updatedUsuario[0];
                      req.session.save();

                      Usuario.publishUpdate(updatedUsuario[0].id, {oldUsername: objUsuario.username, username: info_nickname});

                      res.json({success: true, infos: loginInfo});
                    } else {
                      res.json({error: true, message: 'Um erro ocorreu ao atualizar as informações de login!'});
                    }
                  });
                }
              });
            }
          });
        }
      }

      async.each([
        CoreService.minigamesLogin,
        CoreService.rpgLogin
      ], function(func, callback) {func(nick, passwd, finishObject, callback)}, function(err, results) {
          finishRequest(finishObject);
      });

    } else {
      res.json({error: true, message: 'Login e/ou senha mal formatados.'});
    }
  },

  /**
   * Action logout
   *
   * Responsável por receber as requisições de logout da aplicação.
   *
   * @param req
   * @param res
   */
  logout: function(req, res) {
    req.session.loginInfo = null;

    var updateSession = function(req, callback) {
      // Atualiza dados temporários
      Usuario.findOne({username: req.session.usuario.username}).exec(function(error, objUsuario) {
        if(!error && objUsuario !== undefined) {
          var newUsername = UtilsService.generateTemporaryUsername();

          Usuario.update({username: req.session.usuario.username}, {username: newUsername, isPlayer: false}).exec(function(updateError, updatedUsuario) {
            if(!updateError && updatedUsuario !== undefined) {
              req.session.usuario = updatedUsuario[0];
              req.session.save();

              Usuario.publishUpdate(updatedUsuario[0].id, {oldUsername: objUsuario.username, username: newUsername});
            }

            callback();
          });
        }
      });
    }

    async.each([
      updateSession
    ], function(func, callback) {func(req, callback)}, function(err, results) {
      res.json({success: true});
    });
  },

  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to DefaultController)
   */
  _config: {}

  
};
