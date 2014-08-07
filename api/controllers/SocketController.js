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
      // Get the value of a parameter
//      var param = req.param('message');

      // Cliente passa a receber qualquer alteração dos usuários do site.
      Usuario.subscribe(req.socket);

      console.log(req.session.usuario);

      if(!req.session.usuario) {
        console.log('Cliente ainda não possui um usuário, criando...');

        res.json(UcpService.criarUsuario(req));
      } else {
        Usuario.find({id: req.session.usuario}).done(function(error, Usuario) {
          if(error) {
            console.log('Cliente possui um usuário mas este não foi encontrado na base, criando...');

            res.json(UcpService.criarUsuario(req));
          } else {
            console.log('Cliente já possui um usuário.');

            res.json(Usuario);
          }
        });
      }
  },

  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to DefaultController)
   */
  _config: {}

  
};
