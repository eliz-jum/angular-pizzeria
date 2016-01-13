angular.module('pizzeria').controller('MainController', function($scope, $state, $stateParams, $http, basket){
    $scope.basketServer = basket.listServer;
    $scope.basketView = basket.listView;
    $scope.total = basket.total;
    $scope.menu = [];
    
    $scope.addPizza = function(pizza){
        basket.add(pizza);
        $scope.total = basket.sumPrices();
    };
    
    $scope.orderPizza = function(array, pizza) {
        basket.clearBasket();
        $scope.addPizza(pizza);

        $state.go('order');
    };

    $scope.removePizza = function(array, index){
        array.splice(index, 1);
        $scope.total = basket.sumPrices();
    };
    
    $scope.updateTotal = function(){
        console.log("update total");
        $scope.total = basket.sumPrices();
    };
    
    $http.get('/menu').success(function(data){
        $scope.menu = data;
        //console.log(data);
    }).error(function(data, status) {
        console.error('http.get error in MainCtrl.js', status, data);        
    });
    
});