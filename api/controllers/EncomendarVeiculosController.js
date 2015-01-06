/**
 * DefaultController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {

  index: function(req, res) {
    if(CoreService.isUserAuthenticated(req)) {
      var result = function(error, results) {
        if(!error) {
          var toOrderVehicles = results[0];
          var categories = results[1];
          var levels = results[2];

          res.view('encomendarVeiculos/index', {'view_layout': UtilsService.getViewLayout(req), 'toOrderVehicles': toOrderVehicles, 'categories': categories, 'levels': levels});
        } else {
          sails.log.error(error);
          res.json({error: true, message: 'Um erro ocorreu ao acessar o banco de dados.'});
        }
      }

      async.series([
        function(callback) { RPGService.getToOrderVehicles(null, callback) },
        function(callback) { SampService.getVehicleCategories(callback) },
        function(callback) { RPGService.getDistinctedVehicleLevel(callback) }
      ], result)
    } else {
      res.json({error: true, message: 'Você deve estar autenticado para utilizar esta funcionalidade.'})
    }
  },

  search: function(req, res) {
    if(CoreService.isUserAuthenticated(req)) {
      var category = req.param('category');
      var minPrice = parseInt(req.param('minPrice'));
      var maxPrice = parseInt(req.param('maxPrice'));
      var minLevel = parseInt(req.param('minLevel'));
      var maxLevel = parseInt(req.param('maxLevel'));
      var vehicleName = req.param('nmVeiculo');

      var queryFilter = {};

      if(category) {
        queryFilter.CT_VEICULO = category;
      }

      if(minPrice) {
        queryFilter.VL_COMUM_VEICULO = {'>=': minPrice};
      }

      if(maxPrice) {
        queryFilter.VL_COMUM_VEICULO = {'<=': maxPrice};
      }

      if(minLevel) {
        queryFilter.NV_VEICULO = {'>=': minLevel};
      }

      if(maxLevel) {
        queryFilter.NV_VEICULO = {'<=': maxLevel};
      }

      if(vehicleName) {
        queryFilter.NM_VEICULO = {contains: vehicleName}
      }

      if(Object.keys(queryFilter).length == 0) {
        queryFilter = null;
      } else {
        queryFilter.FL_VEICULO = 1;
      }

      var result = function(error, results) {
        if(!error) {
          var toOrderVehicles = results[0];

          res.json({success: true, data: toOrderVehicles});
        } else {
          sails.log.error(error);
          res.json({error: true, message: 'Um erro ocorreu ao acessar o banco de dados.'});
        }
      }

      async.series([
        function(callback) { RPGService.getToOrderVehicles(queryFilter, callback) }
      ], result);
    } else {
      res.json({error: true, message: 'Você deve estar autenticado para utilizar esta funcionalidade.'})
    }
  },

  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to DefaultController)
   */
  _config: {}

  
};
