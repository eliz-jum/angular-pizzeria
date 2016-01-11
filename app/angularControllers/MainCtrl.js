angular.module('pizzeria').controller('MainController', function($scope, $state, $stateParams, $http, basket){
    $scope.basketServer = basket.listServer;
    $scope.basketView = basket.listView;
    
    $scope.addPizza = function(pizza){
        basket.add(pizza);
        
        //console.log(pizza);
    };
    
    
    
    $scope.menu = [];
    $http.get('/menu').success(function(data){
        $scope.menu = data;
        //console.log(data);
    }).error(function(data, status) {
        console.error('http.get error in MainCtrl.js', status, data);
        
     
        
    });
});