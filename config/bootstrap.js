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
  CronService.init();

  // Configuração geral do template
  UtilsService.template();

  // Carregando módulo exec.
  UtilsService.exec = require("exec");

  // Carregando módulo glob.
  UtilsService.glob = require("glob");

  // Inicializa o listener TCP do modo Competitivo
  CompetitivoService.waitForServers();

  // Obtém dados da última release da aplicação no github.
  GitHubAPIService.getLastRelease();

  // Lê o arquivo .zip das thumbnails dos objetos do sa-mp.
  UtilsService.sampObjectsThumbnailsZip();

  // Sorteio de gifs para ser utilizado como a gif principal para carregar informações.
  // options is optional
  UtilsService.glob("**/images/loading/*.gif", options, function (er, files) {
    if(files && files.length > 0) {
      var gifs = [];

      for(file in files) {
        gifs.push(files[file].match(/(\w+\.gif)$/)[1]);
      }

      UtilsService.nunjucksEnv.addGlobal('loadingGifs', gifs);
    }
  });

  // Função POG para enviar informações para socket de forma privada.
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