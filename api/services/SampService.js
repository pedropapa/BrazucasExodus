/**
 * Service utilizada para abrigar m�todos de busca/persist�ncia de informa��es referentes ao modo RPG.
 *
 */
module.exports = {
  getVehicleCategories: function(callback) {
    tp_veiculos.find().exec(function(error, categorias) {
      if(!error) {
        callback(null, categorias);
      } else {
        callback(error);
      }
    })
  }
}