/**
 * Created by siulkilulki on 06.01.16.
 */
angular.module('pizzeria').controller('OrderController', function($scope, $state, $stateParams){
    $scope.client = {};
    $scope.notes = '';
    /*$scope.canSubmit = true;*/
    $scope.order = function() {
    	$state.go('status');
    }
});