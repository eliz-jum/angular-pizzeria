angular.module('pizzeria').controller('StatusController', function($scope, $state, $stateParams, $http, $rootScope){
    $scope.orderId = $stateParams.orderId;
    var id = $scope.orderId;
    $scope.time = 0;
    var estimated = 0;


    $scope.message = "Order is queued";
    var ws = new WebSocket('ws://localhost:8080/order/' + id);

    ws.onopen = function() {
        console.log('Client '+ id + ' started');
    };

    ws.onmessage = function(event) {
        var res = angular.fromJson(event.data);
        console.log(res.order.status);
        if(res.order.status != 0) {
            $scope.message = getResponse(res.order.status);
        }
        setTime(estimated);
        $rootScope.$apply();
    };

    ws.onerror = function(err) {
        console.log('Client error: '+ id);
    };

    ws.onclose = function() {
        console.log('Closing client ' + id);
    };


    $scope.$on('$destroy', function () {
        ws.close();
    });

    var getResponse = function(status) {
        switch (status) {
            case 1:
                return "Order is being prepared";
                break;
            case 2:
                return "Delivering order";
                break;
            case 3:
                return "Order delivered";
            default:
                return "Unknown order state";
        }
    }
    var setTime = function(estimated) {
        var diff = (estimated - Date.now())/(60*1000);
        if (diff < 0) {
            diff = 0;
        }
        $scope.time = ~~diff; //float to int conversion
    }
    $http.get('/order/' + id).success(function(data) {
        estimated = Date.parse(data.estimated);
        setTime(estimated)
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
