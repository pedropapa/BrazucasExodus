/**
 * SocketController
 *
 * @module      :: Controller
 * @description	:: Controller responsável por todas as requisições através dos sockets.
 */

module.exports = {


  /**
   * Action blueprints:
   *    `/default/main`
   */
   main: function (req, res) {
      if(req.isSocket) {
        if(!req.session.usuario) {
          console.log('Cliente ainda não possui um usuário, criando...');

          CoreService.criarUsuario(req);
        } else {
          Usuario.find({id: req.session.usuario}).exec(function(error, Usuario) {
            if(Usuario.length == 0) {
              console.log('Cliente possui um usuário mas este não foi encontrado na base, criando...');

              CoreService.criarUsuario(req);
            } else {
              console.log('Cliente já possui um usuário.');
            }
          });
        }

        // Captura alterações dos futuros usuários adicionados ao banco.
        Usuario.watch(req.socket);

        // Captura alterações de todos os usuários já adicionados ao banco.
        Usuario.find({id: '*'}).exec(function(e, usuarios) {
          Usuario.subscribe(req.socket, usuarios);
        });
      } else {
        res.json({error: 500, message: '#'});
      }
  },

  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to DefaultController)
   */
  _config: {}

  
};
