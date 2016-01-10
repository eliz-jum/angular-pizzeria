/**
 * Created by siulkilulki on 06.01.16.
 */
angular.module('pizzeria').controller('OrderController', function($scope, $state, $stateParams, $http){
    $scope.client = {};
    $scope.notes = '';
    $scope.order = [
    			{
    				id: 10,
    				quantity: 5
    			}];
    $scope.order = function() {
    	if ($scope.client.phoneNumber!=null && $scope.client.address!=null) {
    		$http.post('/order').success(function(data){
    			data = $scope.order;
		    }).error(function(data, status) {
		        console.error('http.get error in OrderCtrl.js', status, data);
		    });
    	}
    };
});