/**
 * Created by siulkilulki on 08.01.16.
 */
angular.module('pizzeria').controller('ContactController', function($scope, $state, $stateParams){
    $scope.cos = 'wysiwetla';
    /*$http.get('/contact').success(function(data){
        $scope.jsonContact = data;

    });*/
} );
/*
data.name
name: 'Pizzeria',
    address: {
    street: 'Św. Marcin 1',
        city: 'Poznań'
},
phone: '123-456-789',
    hours: '12:00 - 22:00'*/

/*
angular.module('pizzeria').controller('ContactController', ['$http', function($scope, $state, $stateParams, $http){
    $scope.cos = 'wysiwetla';
    $http.get('/contact').success(function(data){
        $scope.jsonContact = data;

    });
} ]);*/
