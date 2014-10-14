/**
 * Bootstrap
 *
 * An asynchronous boostrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#documentation
 */

module.exports.bootstrap = function (cb) {
  // Método que inicia a conexão do site com o servidor sa-mp do Brazuca's.
  SampSocketService.init();

  // Iniciamos a configuração das tarefas cronjobs utilizadas pela aplicação.
  Cron.init();

  sails.sockets.customBroadcastTo = function(socket, model, verb, data) {
    socketData = {};
    socketData.model = model;
    socketData.verb = verb;
    socketData.data = data;
    sails.sockets.emit(socket.id, socketData);
  }

  // It's very important to trigger this callack method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
  cb();
};