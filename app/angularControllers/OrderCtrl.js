angular.module('pizzeria').controller('OrderController', function($scope, $state, $stateParams, $http, basket, ModalService){
    $scope.basketView = basket.listView;
    $scope.client = {};
    $scope.total = basket.total;
    $scope.extras = basket.extras;


    $scope.order = function() {
        var orderData = {
            order: basket.fillListServer(),
            extras: $scope.extras,
            orderInfo: $scope.client
        };

        console.log(orderData);    
        
    	if ($scope.client.phoneNumber!=null && $scope.client.address!=null) {
    		$http.post('/order', orderData).success(function(data){
    			var id = data.id;
				$state.go('status', {'orderId': id});
                basket.clearBasket();
            }).error(function(data, status) {
		        console.error('http.post error in OrderCtrl.js', status, data);
		    });

    	}
    };

    $scope.open = function() {
        ModalService.showModal({
            templateUrl: "extras.html",
            controller: "ExtrasController"
        }).then(function(modal) {
            modal.close.then(function(result) {
                console.log(result);
            });
      });
    };

});

angular.module('pizzeria').controller('ExtrasController', function($scope, close, $http, basket) {
// when you need to close the modal, call close
    $scope.close = function(result) {
        close(result);
    }
    
    $scope.extras = [];
    $scope.toOrder = basket.extras;

    $http.get('/extras').success(function(data){
        $scope.extras = data;
        //console.log(data);
    }).error(function(data, status) {
        console.error('http.get error in OrderCtrl.js', status, data);        
    });
});