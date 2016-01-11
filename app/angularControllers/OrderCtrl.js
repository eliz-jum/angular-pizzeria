angular.module('pizzeria').controller('OrderController', function($scope, $state, $stateParams, $http, basket){
    $scope.basketView = basket.listView;
    $scope.client = {};
    $scope.notes = '';
    
    $scope.order = function() {
        console.log(basket.fillListServer())
        $scope.orderData = basket.fillListServer();
        
    	if ($scope.client.phoneNumber!=null && $scope.client.address!=null) {
    		$http.post('/order', $scope.orderData).success(function(data){
    			var id = data.id;
				$state.go('status', {'orderId': id});
            }).error(function(data, status) {
		        console.error('http.post error in OrderCtrl.js', status, data);
		    });
    	}
    };
});