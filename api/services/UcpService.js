/**
 * Service responsável pelos métodos utilizados na camada superior da aplicação.
 *
 * @type {{criarUsuario: Function}}
 */
module.exports = {
  /**
   * Cria um usuário temporário na aplicação.
   *
   * @param req - Requisição enviada pelo cliente.
   */
  criarUsuario: function(req) {
    Usuario.create({username: 'PNA'+Math.round(Math.random()*1000000000), password: '123432432'}).done(function(error, Usuario) {
      if(error) {
        return {error: 500, controller: 'Socket', message: 'Não foi possível criar o usuário temporário.'};
      } else {
        req.session.usuario = Usuario.id;

        console.log('Novo usuário criado. '+req.session.usuario);
      }
    });

    return true;
  }
}