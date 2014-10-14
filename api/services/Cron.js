/**
 * Service que armazena funções de utilidades em geral dentro do sistema.
 *
 */
module.exports = {
  lastGitHubCommitsJob: null,

  init: function() {
    var CronJob = require('cron').CronJob;

    // Tarefa que atualiza os últimos commits da aplicação no GitHub.
    this.lastGitHubCommitsJob = new CronJob('00 00 * * * *', function() { // Executada a cada uma hora.
        GitHubAPI.updateLastCommits();
      }, function () {
        // This function is executed when the job stops
      },
      true
    );

    // Chamamos a tarefa manualmente no início para não precisarmos esperar uma hora até a primeira atualização.
    GitHubAPI.updateLastCommits();

    sails.log.info('Tarefas Cron inicializadas.');
  }
}