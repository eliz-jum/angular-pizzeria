/**
 * Created by siulkilulki on 06.01.16.
 */
angular.module('pizzeria').controller('OrderController', function($scope, $state, $stateParams){
    $scope.firstName = 'andriu';
    $scope.surname = 'anrzejewski';
    $scope.phoneNumber = 999888777;
    $scope.adress = 'osiedle kolejowe';
    $scope.notes = 'bez sosow';
    /*$scope.canSubmit = true;*/
});