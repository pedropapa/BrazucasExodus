/**
 * Service utilizada para gerenciar toda a funcionalidade do modo Competitivo.
 *
 */
module.exports = {
  lastGitHubCommitsJob: null,

  /**
   * Busca os modos de jogo do modo Competitivo.
   *
   * @param modos
   * @param callback
   */
  getModos: function(modos, callback) {
    competitivo_modo.find({ATIVO: 1}).populate('PARENTE').exec(function(err, objModos) {
      if(err) {
        callback('Erro ao buscar os modos do competitivo! '+err);
      } else {
        modos.modos = objModos;

        callback();
      }
    });
  }
}