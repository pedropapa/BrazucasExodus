/**
 * Service que armazena funções de utilidades em geral dentro do sistema.
 *
 */
module.exports = {
  lastGitHubCommitsJob: null,

  init: function() {
    var CronJob = require('cron').CronJob;
    this.lastGitHubCommitsJob = new CronJob('00 00 * * * *', function() {
        GitHubAPI.updateLastCommits();
      }, function () {
        // This function is executed when the job stops
      },
      true
    );
    GitHubAPI.updateLastCommits();

    sails.log.info('Tarefas Cron inicializadas.');
  }
}