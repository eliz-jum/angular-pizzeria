/**
 * Created by siulkilulki on 06.01.16.
 */
angular.module('pizzeria').controller('OrderController', function($scope, $state, $stateParams){
    $scope.client = {};
    $scope.notes = '';
    $scope.order = function() {
    	if ($scope.client.phoneNumber!=null && $scope.client.address!=null) {
    		$state.go('status');
    	}
    };
});