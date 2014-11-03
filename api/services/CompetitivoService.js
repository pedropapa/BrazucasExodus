/**
 * Service utilizada para gerenciar toda a funcionalidade do modo Competitivo.
 *
 */
module.exports = {
  lastGitHubCommitsJob: null,

  getModos: function(modos, callback) {
    competitivo_modo.find({ATIVO: 1}).populate('PARENTE').exec(function(err, objModos) {
      if(err) {
        callback('Erro ao buscar os modos do competitivo!');
      } else {
        modos.modos = objModos;

        callback();
      }
    });
  }
}