angular.module('pizzeria').controller('OrderController', function($scope, $state, $stateParams, $http, basket, ModalService){
    $scope.basketView = basket.listView;
    $scope.client = {};
    $scope.total = basket.total;
    $scope.extras = basket.extras;


    $scope.order = function() {
        var orderData = {
            order: basket.fillListServer(),
            extras: basket.extras,
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

    $scope.update = function(){
        $scope.extras = basket.extras;
        $scope.total = basket.sumPrices();
    }

    $scope.open = function() {
        ModalService.showModal({
            templateUrl: "extras.html",
            controller: "ExtrasController",
            inputs: {
                update: $scope.update
            }
        }).then(function(modal) {
            modal.close.then(function(result) {
                console.log(result);
            });
      });
    };

});

angular.module('pizzeria').controller('ExtrasController', function($scope, close, $http, basket, update) {
// when you need to close the modal, call close
    $scope.close = function(result) {
        if (result == 'OK'){
            $scope.confirm();
        }
        close(result);
    }
    basket.extras = [];
    $scope.extras = [];
    $scope.toOrder = [];
    update();
    $scope.total = basket.total;

    $scope.toggle = function(item) {
        var index = $scope.toOrder.indexOf(item);
        if (index > -1) {
            $scope.toOrder.splice(index, 1);
        }
        else {
            $scope.toOrder.push(item);
        }
        console.log($scope.toOrder);
        $scope.updateTotal();
    };

    $scope.confirm = function() {
        $scope.toOrder.forEach(function(item) {
            item.quantity = 1;
        })
        basket.extras = $scope.toOrder;
        console.log("basketextras: " + basket.extras);
        console.log("scopetextras: " + $scope.toOrder);
        update();
    };

    $scope.updateTotal = function() {
        update();
        $scope.total = basket.total;
        $scope.toOrder.forEach(function(item) {
            $scope.total += item.price;
        })      
    }

    $http.get('/extras').success(function(data){
        $scope.extras = data;
        //console.log(data);
    }).error(function(data, status) {
        console.error('http.get error in OrderCtrl.js', status, data);        
    });
});