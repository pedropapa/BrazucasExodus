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
      var itensPerPage = 10;

      var result = function(error, results) {
        if(!error) {
          var toOrderVehicles = results[0];
          var categories = results[1];
          var levels = results[2];

          res.view('encomendarVeiculos/index', {'view_layout': UtilsService.getViewLayout(req), 'toOrderVehicles': toOrderVehicles, 'categories': categories, 'levels': levels, 'itensPerPage': itensPerPage});
        } else {
          sails.log.error(error);
          res.json({error: true, message: 'Um erro ocorreu ao acessar o banco de dados.'});
        }
      }

      async.series([
        function(callback) { RPGService.getToOrderVehicles(1, itensPerPage, null, callback) },
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
      var currentPage = parseInt(req.param('currentPage'));
      var itensPerPage = parseInt(req.param('itensPerPage'));
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
        function(callback) { RPGService.getToOrderVehicles(currentPage, itensPerPage, queryFilter, callback) }
      ], result);
    } else {
      res.json({error: true, message: 'Você deve estar autenticado para utilizar esta funcionalidade.'});
    }
  },

  buy: function(req, res) {
    var vehicleId = req.param('vehicleId');

    if(vehicleId) {
      if(CoreService.isUserAuthenticated(req)) {
        var result = function(error, results) {
          if(!error) {
            var vehicleInfo = results[0];
            var precosRpg = results[1];

            if(typeof vehicleInfo == 'object' && vehicleInfo.records.length == 1) {
              res.view('encomendarVeiculos/comprar', {'vehicleInfo': vehicleInfo.records[0], 'precosRpg': precosRpg[0]});
            } else {
              res.json({error: true, message: 'Veículo não encontrado.'});
            }
          } else {
            sails.log.error(error);
            res.json({error: true, message: 'Um erro ocorreu ao acessar o banco de dados.'});
          }
        }

        async.series([
          function(callback) { RPGService.getToOrderVehicles(1, 1, {ID_VEICULO: vehicleId}, callback) },
          function(callback) { RPGService.getPrecos(callback) }
        ], result);
      } else {
        res.json({error: true, message: 'Você deve estar autenticado para utilizar esta funcionalidade.'});
      }
    } else {
      res.json({error: true, message: 'Parâmetros não informados.'});
    }
  },

  confirmOrder: function(req, res) {
    var vehicleId = req.param('vehicleId');
    var optionals = req.param('opcionais');

    if(vehicleId) {
      if(CoreService.isUserAuthenticated(req)) {
        var result = function(error, results) {
          if(!error) {
            var vehicleInfo = results[0].records[0];
            var precosRpg = results[1][0];

            if(typeof vehicleInfo == 'object') {
              var allExists = true;
              var subTotal = parseInt(vehicleInfo.VL_COMUM_VEICULO);

              for(var optional in optionals) {
                if(!precosRpg[optional]) {
                  allExists = false;
                } else {
                  subTotal += parseInt(precosRpg[optional]);
                }
              }

              if(allExists) {
                if(subTotal > 0) {
                  if(SampSocketService.isConnected) {
                    SocketService.send(SampSocketService.sampSocket, {a: 'buyVehicle', vehicleId: vehicleId, price: subTotal}, function(data, error) {
                      if(error) {
                        if(error.timedOut) {
                          res.json({error: true, message: 'Tempo limite excedido, não houve resposta do servidor RPG/Minigames. Tente realizar a compra novamente mais tarde.'});
                        } else {
                          res.json({error: true, message: 'Um erro interno ocorreu ao confirmar a compra. Tente novamente mais tarde.'});
                        }
                      } else {
                        var success = data['success'];
                        var error = data['error'];
                        var message = data['message'];

                        var previousAccountBalance = data['previousAccountBalance'];
                        var currentAccountBalance = data['currentAccountBalance'];

                        if(success == 'true') {
                          res.json({success: true, vehicleName: vehicleInfo.NM_VEICULO, orderSubTotal: subTotal, previousAccountBalance: previousAccountBalance, currentAccountBalance: currentAccountBalance});
                        } else if(error == 'true') {
                          res.json({error: true, message: message});
                        } else {
                          res.json({error: true, message: 'Um erro interno do servidor RPG/Minigames ocorreu ao confirmar a compra. Tente novamente mais tarde.'});
                        }
                      }
                    });
                  } else {
                    res.json({error: true, message: 'No momento não há conexão com o servidor RPG/Minigames, tente realizar a compra novamente mais tarde.'});
                  }
                } else {
                  res.json({error: true, message: 'Um erro ocorreu ao calcular o valor final da compra.'});
                }
              } else {
                res.json({error: true, message: 'Opcionais informados não encontrados na base de dados.'});
              }
            } else {
              res.json({error: true, message: 'Veículo não encontrado.'});
            }
          } else {
            sails.log.error(error);
            res.json({error: true, message: 'Um erro ocorreu ao acessar o banco de dados.'});
          }
        }

        async.series([
          function(callback) { RPGService.getToOrderVehicles(1, 1, {ID_VEICULO: vehicleId}, callback) },
          function(callback) { RPGService.getPrecos(callback) }
        ], result);
      } else {
        res.json({error: true, message: 'Você deve estar autenticado para utilizar esta funcionalidade.'});
      }
    } else {
      res.json({error: true, message: 'Parâmetros não informados.'});
    }
  },

  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to DefaultController)
   */
  _config: {}

  
};
