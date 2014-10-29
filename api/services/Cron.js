/**
 * Service utilizada para gerenciar as tarefas cron do sistema.
 *
 */
module.exports = {
  lastGitHubCommitsJob: null,

  /**
   * Inicializa o serviço cron.
   */
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

    // Tarefa que atualiza as informações básicas do servidor.
    this.lastGitHubCommitsJob = new CronJob('00 * * * * *', function() { // Executada a cada uma hora.
        SampSocketService.updateServerBasicStats();
      }, function () {
        // This function is executed when the job stops
      },
      true
    );

    // Chamamos as tarefa manualmente no início para não precisarmos esperar até o primeiro loop.
    GitHubAPI.updateLastCommits();
    SampSocketService.updateServerBasicStats();

    sails.log.info('Tarefas Cron inicializadas.');
  }
}