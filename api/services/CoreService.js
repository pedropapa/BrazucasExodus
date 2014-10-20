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
    Usuario.create({username: 'PNA'+Math.round(Math.random()*1000000000), socketId: socket.id, source: Local.ucp}).exec(function(error, objUsuario) {

      if(error) {
        return {error: 500, controller: 'Socket', message: 'Não foi possível criar o usuário temporário.'};
      } else {
        session.usuario = objUsuario;
        session.save();

        Usuario.publishCreate(objUsuario);

        sails.log.info('Novo usuário criado: '+objUsuario.username);
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