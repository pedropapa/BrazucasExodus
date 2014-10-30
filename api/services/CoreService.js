/**
 * Service responsável pelos métodos utilizados na camada superior da aplicação.
 *
 * @type {{criarUsuario: Function}}
 */
module.exports = {
  /**
   * Cria um usuário temporário na aplicação caso o usuário ainda não esteja autenticado.
   * Caso já esteja autenticado, apenas cria novamente os registros de login.
   *
   * @param session - Requisição enviada pelo cliente.
   */
  criarUsuario: function(session, socket, callback) {
    var varsObj = {};

    if(session.usuario && session.usuario.isPlayer) {
      varsObj = {username: session.usuario.username, socketId: socket.id, source: session.usuario.source, isPlayer: true};
    } else {
      varsObj = {username: UtilsService.generateTemporaryUsername(), socketId: socket.id, source: Local.ucp};
    }

    Usuario.findOne({username: varsObj.username}).exec(function(errorFind, findObjUsuario) {
      if(findObjUsuario !== undefined && (findObjUsuario.source == Local.ucp || findObjUsuario.source == Local.ambos)) {
        sails.log.info('Usuário '+varsObj.username+ ' já está autenticado na aplicação!');

        session.usuario = null;
        session.loginInfo = null;
        session.save();
      } else if(findObjUsuario !== undefined && findObjUsuario.source == Local.servidor) {
        // Caso o jogador esteja conectado no Servidor, apenas faz um update no banco alterando o source para ucp/servidor.
        Usuario.update({username: varsObj.username}, {source: Local.ambos}).exec(function(error, objUsuario) {
          if(!error && objUsuario !== undefined) {
            objUsuario[0].event = 'sourceChange';
            Usuario.publishUpdate(objUsuario[0].id, objUsuario[0]);
          }
        });
      } else {
        Usuario.create(varsObj).exec(function(error, objUsuario) {
          if(error) {
            sails.log.error('Não foi possível criar o usuário temporário.');
          } else {
            session.usuario = objUsuario;
            session.save();

            Usuario.publishCreate(objUsuario);

            sails.log.info('Novo usuário criado/reconectado: '+objUsuario.username);
          }

          if(callback) {
            callback();
          }
        });
      }
    });
  },

  /**
   * Realiza login nos minigames.
   * É necessário executar este método utilizando a biblioteca async.
   *
   * @param nick
   * @param passwd
   * @param finishObject
   * @param callback
   */
  minigamesLogin: function(nick, passwd, finishObject, callback) {
    contas_mgs.findOne({NOME: nick, Senha: passwd}).exec(function(error, conta_mg) {
      if(conta_mg && !error !== null) {
        finishObject.conta_mg = conta_mg;
      }

      callback();
    });
  },

  /**
   * Realiza login no RPG.
   * É necessário executar este método utilizando a biblioteca async.
   *
   * @param nick
   * @param passwd
   * @param finishObject
   * @param callback
   */
  rpgLogin: function(nick, passwd, finishObject, callback) {
    contas_rpg.findOne({NICK: nick, Senha: passwd}).exec(function(error, conta_rpg) {
      if(conta_rpg && !error) {
        finishObject.conta_rpg = conta_rpg;
      }

      callback();
    });
  }
}