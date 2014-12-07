/**
 * Service utilizada para gerenciar toda a funcionalidade do modo Competitivo.
 *
 */
module.exports = {
  lastGitHubCommitsJob: null,

  waitForServers: function() {
    var net = require('net');

    var server = net.createServer(function(socket) {
      sails.log.info('Novo servidor do modo Competitivo conectado ('+socket.remoteAddress+':'+socket.remotePort+')');

      SocketService.send(socket, {a: 'teste'}, function(data, error) {
        sails.log.info('meu deus ');
        sails.log.info(data);
      });

      socket.setEncoding('utf8');

      socket.on('data', function (data) {
        SocketService.executeCommandCallback(data);
      });

      socket.on('end', function() {
        console.log(data);
      });

      socket.on('error', function(data) {
        if(data.errno == 'ECONNRESET') {
          sails.log.info('Conexão com um servidor do modo Competitivo perdida.');
        } else {
          sails.log.info("Um erro desconhecido ocorreu ao ler dados do servidor competitivo. ("+data.errno+")");
        }
      });
    });

    server.listen(8675, function() {
      console.log('server bound');
    });
  },

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