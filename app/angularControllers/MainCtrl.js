angular.module('pizzeria').controller('MainController', function($scope, $state, $stateParams, $http, basket){
    $scope.basketServer = basket.listServer;
    $scope.basketView = basket.listView;
    $scope.basketIngredients = basket.ingredients;
    $scope.total = basket.total;
    $scope.menu = [];
    
    var ingredients = [];
    var extraIngredients = [];
    
    $scope.addPizza = function(pizza){
        basket.add(pizza);
        $scope.total = basket.sumPrices();
    };
    
    $scope.orderPizza = function(array, pizza) {
        basket.clearBasket();
        $scope.addPizza(pizza);

        $state.go('order');
    };

    $scope.removePizza = function(array, index){
        array.splice(index, 1);
        $scope.total = basket.sumPrices();
    };
    
    $scope.updateTotal = function(){//co z ta funkcja??????
        console.log("update total");
        $scope.total = basket.sumPrices();
    };
    
    $scope.customisePizza = function(array, index){
        //array to tablica skladnikoww
        $scope.total = basket.sumPrices();//trzeba bedzie zmienic sumPrices zeby dodawalo ceny za dodatkowe skladniki
    };
    $scope.showIngredients = function(ingredientsNumbers){
        var result = [];
        ingredientsNumbers.forEach(function(item) {
            ingredients.forEach(function(item2) {
                if (item == item2.id)
                    result.push(item2.label);
            });
        });
        return result;
        
    }
    
    
    $http.get('/menu').success(function(data){
        $scope.menu = data;
        //console.log(data);
    }).error(function(data, status) {
        console.error('http.get error in MainCtrl.js', status, data);        
    });
    
    $http.get('/ingredients').success(function(data){
        ingredients = data;
        //console.log(data);
    }).error(function(data, status) {
        console.error('http.get error in MainCtrl.js', status, data);        
    });
    
    $http.get('/extras').success(function(data){
        extraIngredients = data;
        //console.log(data);
    }).error(function(data, status) {
        console.error('http.get error in MainCtrl.js', status, data);        
    });
    
});