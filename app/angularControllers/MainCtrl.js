angular.module('pizzeria').controller('MainController', function($scope, $state, $stateParams, $http, basket, ModalService) {
    $scope.basketServer = basket.listServer;
    $scope.basketView = basket.listView;
    $scope.basketIngredients = basket.ingredients;
    $scope.total = basket.total;
    $scope.menu = [];
    var ingredients = [];

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

    $scope.open = function(item) {
        ModalService.showModal({
            templateUrl: "custom.html",
            controller: "CustomController",
            inputs: {
                pizza: {
                    id: item.id,
                    name: item.name,
                    ingredients: $scope.menu[item.id+1].ingredients,
                    price: item.price
                },
                showIngredients: $scope.showIngredients,
                ingredients: ingredients
            }
        }).then(function(modal) {
            modal.close.then(function(result) {
                console.log(result);
            });
      });
    };
    
    
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
    
});


angular.module('pizzeria').controller('CustomController', function($scope, $http, close, pizza, showIngredients, ingredients) {
// when you need to close the modal, call close
    $scope.close = function(result) {
        close(result);
    }

    $scope.pizza = pizza;
    $scope.showIngredients = showIngredients;
    $scope.ingredients = ingredients;

    $scope.toRemove = [];   // list of basic ingredients to be removed
    $scope.toAdd = [];      // list of extra ingredients to be added

    $scope.total = pizza.price;

    $scope.id = "name";
    $scope.clicked = false;

    $scope.update = function() {
        $scope.total = $scope.pizza.price;

        $scope.toAdd.forEach(function(item){
            $scope.total += item.price;
        });
        
        $scope.total = Math.round($scope.total * 100) / 100;
        return $scope.total;
    }

    $scope.toggleExtra = function(ingredient) {
        var index = $scope.toAdd.indexOf(ingredient);
        if (index > -1) {
            $scope.toAdd.splice(index, 1);
        }
        else {
            $scope.toAdd.push(ingredient);
        }
        console.log("toAdd: " + $scope.toAdd);
        $scope.update();
    }

    $scope.toggleBasic = function(ingredientId) {
        var index = $scope.toRemove.indexOf(ingredientId);
        if (index > -1) {
            $scope.toRemove.splice(index, 1);
        }
        else {
            $scope.toRemove.push(ingredientId);
        }
        console.log("toRemove: " + $scope.toRemove)
    }
});