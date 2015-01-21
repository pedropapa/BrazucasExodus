/**
 * Service utilizada para gerenciar as tarefas cron do sistema.
 *
 */
module.exports = {
  lastGitHubCommitsJob: null,
  serverBasicStatsJob: null,
  digitalOceanDropletsJob: null,

  /**
   * Inicializa o serviço cron.
   */
  init: function() {
    var CronJob = require('cron').CronJob;

    // Tarefa que atualiza os últimos commits da aplicação no GitHub.
    this.lastGitHubCommitsJob = new CronJob('00 00 * * * *', function() { // Executada a cada uma hora.
        GitHubAPIService.updateLastCommits();
      }, function () {
        // This function is executed when the job stops
      },
      true
    );

    // Tarefa que atualiza as informações básicas do servidor.
    this.serverBasicStatsJob = new CronJob('00 * * * * *', function() { // Executada a cada minuto.
        SampSocketService.updateServerBasicStats();
      }, function () {
        // This function is executed when the job stops
      },
      true
    );

    // Tarefa que atualiza as informações dos droplets atuais no DigitalOcean.
    this.digitalOceanDropletsJob = new CronJob('00 00 * * * *', function() { // Executada a cada hora.
        DigitalOceanAPIService.updateDroplets();
      }, function () {
        // This function is executed when the job stops
      },
      true
    );

    // Chamamos as tarefa manualmente no início para não precisarmos esperar até o primeiro loop.
    GitHubAPIService.updateLastCommits();
    SampSocketService.updateServerBasicStats();
    DigitalOceanAPIService.updateDroplets();

    sails.log.info('Tarefas Cron inicializadas.');
  }
}