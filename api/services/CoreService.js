/**
 * Service responsável pelos métodos utilizados na camada superior da aplicação.
 *
 * @type {{criarUsuario: Function}}
 */
module.exports = {
  /**
   * Cria um usuário do UCP temporário na aplicação.
   *
   * @param session - Requisição enviada pelo cliente.
   */
  criarUsuario: function(session, socket) {
    var varsObj = {};

    if(session.usuario.isPlayer) {
      varsObj = {username: session.usuario.username, socketId: socket.id, source: session.usuario.source, isPlayer: true};
    } else {
      varsObj = {username: UtilsService.generateTemporaryUsername(), socketId: socket.id, source: Local.ucp};
    }

    Usuario.create(varsObj).exec(function(error, objUsuario) {

      if(error) {
        return {error: 500, controller: 'Socket', message: 'Não foi possível criar o usuário temporário.'};
      } else {
        session.usuario = objUsuario;
        session.save();

        Usuario.publishCreate(objUsuario);

        sails.log.info('Novo usuário criado/reconectado: '+objUsuario.username);
      }
    });
  },

  updateServerBasicStats: function() {
    SampSocketService.send('a=getServerBasicStats');
  },

  minigamesLogin: function(nick, passwd, finishObject, callback) {
    contas_mgs.findOne({NOME: nick, Senha: passwd}).exec(function(error, conta_mg) {
      if(conta_mg && !error !== null) {
        finishObject.conta_mg = conta_mg;
      }

      callback();
    });
  },

  rpgLogin: function(nick, passwd, finishObject, callback) {
    contas_rpg.findOne({NICK: nick, Senha: passwd}).exec(function(error, conta_rpg) {
      if(conta_rpg && !error) {
        finishObject.conta_rpg = conta_rpg;
      }

      callback();
    });
  }
}