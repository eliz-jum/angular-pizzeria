/**
 * Created by siulkilulki on 06.01.16.
 */
angular.module('pizzeria').controller('OrderController', function($scope, $state, $stateParams, $http){
    $scope.client = {};
    $scope.notes = '';
    $scope.orderData = [
    			{
    				id: 10,
    				quantity: 5
    			}];
    $scope.order = function() {
    	if ($scope.client.phoneNumber!=null && $scope.client.address!=null) {
    		$http.post('/order', $scope.orderData).success(function(data){
    			$scope.id = data.id;
            }).error(function(data, status) {
		        console.error('http.post error in OrderCtrl.js', status, data);
		    });
    	}
    };
});