/**
 * CoreController
 *
 * @module      :: Controller
 * @description	:: Controller da rota /ucp, utilizado para login ao Painel.
 */

module.exports = {
    
  
  /**
   * Action blueprints:
   *    `/default/main`
   */
   ucp: function (req, res) {
    // Send a JSON response
    return res.view('ucp/index');
  },

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

          req.session.loginInfo = loginInfo;

          res.json({success: true, infos: loginInfo});
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

    res.json({success: true});
  },

  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to DefaultController)
   */
  _config: {}

  
};
