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
        $scope.open(pizza);
    };
    
    $scope.orderPizza = function(array, pizza) {
        basket.clearBasket();
        basket.add(pizza);
        $scope.total = basket.sumPrices();
        $state.go('order');
    };

    $scope.removePizza = function(array, index){
        array.splice(index, 1);
        $scope.total = basket.sumPrices();
    };
    
    $scope.updateTotal = function(){
        console.log("update total");
        $scope.total = basket.sumPrices();
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
                    pizza: {
                        id: item.pizza.id,
                        extraIngredients: item.pizza.extraIngredients
                    },
                    name: item.name,
                    ingredients: $scope.menu[item.pizza.id-1].ingredients,
                    price: item.price
                },
                showIngredients: $scope.showIngredients,
                updateTotal: $scope.updateTotal,
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
    }).error(function(data, status) {
        console.error('http.get error in MainCtrl.js', status, data);        
    });
    
    $http.get('/ingredients').success(function(data){
        ingredients = data;
    }).error(function(data, status) {
        console.error('http.get error in MainCtrl.js', status, data);        
    });
    
});


angular.module('pizzeria').controller('CustomController', function($scope, $http, close, basket, pizza, showIngredients, updateTotal, ingredients) {
// when you need to close the modal, call close
    $scope.close = function(result) {
        if (result == 'OK'){
            $scope.confirm();
        }
        close(result);
    }

    $scope.basket = basket;
    $scope.pizza = pizza;
    $scope.showIngredients = showIngredients;

    $scope.extraIngredients = pizza.pizza.extraIngredients;      
    $scope.total = pizza.price;

    $scope.ingredients = ingredients; //list of all available ingredients
    $scope.toRemove = [];   // temp list of basic ingredients to be removed
    $scope.toAdd = pizza.pizza.extraIngredients.slice();  // temp list of extra ingredients to be added

    $scope.id = "name";
    $scope.clicked = false;

    $scope.update = function() {
        $scope.total = $scope.pizza.price;

        $scope.toAdd.forEach(function(item){
            $scope.total += item.price;
        });
        
        $scope.total = Math.round($scope.total * 100) / 100;
        return $scope.total;
    };

    $scope.toggleExtra = function(ingredient) {
        var index = $scope.toAdd.indexOf(ingredient);
        if (index > -1) {
            $scope.toAdd.splice(index, 1);
        }
        else {
            $scope.toAdd.push(ingredient);
        }
        console.log("toAdd:");
        $scope.toAdd.forEach(function(item) {
            console.log(item);
        })
        $scope.update();
    };

    $scope.toggleBasic = function(ingredientId) {
        var index = $scope.toRemove.indexOf(ingredientId);
        if (index > -1) {
            $scope.toRemove.splice(index, 1);
        }
        else {
            $scope.toRemove.push(ingredientId);
        }
        console.log("toRemove: " + $scope.toRemove)
    };

    $scope.confirm = function() {
        var i = basket.listView.indexOf($scope.pizza);

        basket.listView.forEach(function(item, index){
            if (item.pizza.id == $scope.pizza.pizza.id &&
            item.pizza.extraIngredients == $scope.pizza.pizza.extraIngredients){
                i = index;
            }
        });

        basket.listView[i].pizza.extraIngredients = $scope.toAdd;
        basket.listView[i].price = $scope.total;
        updateTotal();
        console.log(basket.listView[i]);
    };

});