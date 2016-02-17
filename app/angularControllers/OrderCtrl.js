angular.module('pizzeria').controller('OrderController', function($scope, $state, $stateParams, $http, basket, ModalService){
    $scope.basketView = basket.listView;
    $scope.client = {};
    $scope.notes = '';
    $scope.total = basket.total;


    $scope.order = function() {
        console.log(basket.fillListServer())
        $scope.orderData = basket.fillListServer();
        
    	if ($scope.client.phoneNumber!=null && $scope.client.address!=null) {
    		$http.post('/order', $scope.orderData).success(function(data){
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

            //it's a bootstrap element, use 'modal' to show it
            // modal.element.modal();
            modal.close.then(function(result) {
                console.log(result);
            });
      });
    };

});

angular.module('pizzeria').controller('ExtrasController', function($scope, close, $http) {
// when you need to close the modal, call close
    $scope.close = function(result) {
        close(result);
    }
    
    $scope.extras = [];

    $http.get('/extras').success(function(data){
        $scope.extras = data;
        //console.log(data);
    }).error(function(data, status) {
        console.error('http.get error in OrderCtrl.js', status, data);        
    });
});