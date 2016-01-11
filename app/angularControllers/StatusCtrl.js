angular.module('pizzeria').controller('StatusController', function($scope, $state, $stateParams, $http){
    $scope.id = $stateParams.id;
    $http.get('/order:id').success(function(data){
        $scope.orderJson = $scope.data;
        $scope.orderData = $scope.data.order;
        $scope.ordered = $scope.data.ordered;
        $scope.estimated = $scope.data.estimated;
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
