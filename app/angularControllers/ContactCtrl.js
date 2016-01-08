/**
 * Created by siulkilulki on 08.01.16.
 */
angular.module('pizzeria').controller('ContactController', function($scope, $state, $stateParams, $http){
    $scope.name = '';
    $scope.street = '';
    $scope.city = '';
    $scope.phone = '';
    $scope.hours = '';
    $http.get('/contact').success(function(data){
        $scope.name = data.name;
        $scope.street = data.address.street;
        $scope.city = data.address.city;
        $scope.phone = data.phone;
        $scope.hours = data.hours;
    });
} );

