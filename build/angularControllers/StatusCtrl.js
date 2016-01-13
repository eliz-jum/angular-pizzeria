angular.module('pizzeria').controller('StatusController', function($scope, $state, $stateParams, $http){
    $scope.orderId = $stateParams.orderId;
    var id = $scope.orderId
    $http.get('/order/' + id).success(function(data){
        //$scope.orderJson = data;
        //$scope.orderData = data.order;
        var ordered = data.ordered;
        var estimated = data.estimated;
        $scope.orderTime = (estimated - ordered)/60000;
    }).error(function(data, status) {
        console.error('http.get error in StatusCtrl.js', status, data);
    });
});
/*
order: req.body.map(function (position) {
    return {
        pizza: _.find(menu, {
            id: position.id
        }),
        quantity: position.quantity
    };
}),
    ordered: new Date(now),
    estimated: new Date(now + _.random(15, 90))*/
