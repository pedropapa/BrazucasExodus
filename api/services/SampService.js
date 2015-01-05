/**
 * Service utilizada para abrigar métodos de busca/persistência de informações referentes ao modo RPG.
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