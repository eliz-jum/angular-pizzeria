angular.module('pizzeria').factory('basket',function($cookies){

    var basketCookieKey = "basketCookie";
    function getBasketFromCookie(key) {
        if (angular.isUndefined($cookies.getObject(key))) {
            basket = {};
            basket.listView = [];//{pizza{id, extraingredients}, name, price, quantity}
            basket.listServer = [];
            basket.extras= [];
            basket.total = 0;
            return basket;
        } else {
            return $cookies.getObject(key);
        }
    }

    var basket = getBasketFromCookie(basketCookieKey);
    var ind;
    basket.add = function(pizza){
        var isInListView=false;
        if (this.listView.length > 0){
            this.listView.forEach(function(item, index){
                if (item.pizza.id == pizza.pizza.id &&
            item.pizza.extraIngredients == pizza.pizza.extraIngredients){
                    isInListView=true;
                    ind = index;   
                }
            });
            if (isInListView) {
                console.log("foreach");
                console.log(ind);
                console.log("Ta pizza juz byla");
                basket.listView[ind].quantity+=1;
            }
            else {
                console.log("Tej pizzy nie bylo! "+pizza.name);
                basket.listView.push(pizza);
            }    
        }
        else {
            console.log("Pusta tablica!");
            basket.listView.push(pizza);
        }
        $cookies.putObject(basketCookieKey, basket);
        console.log("add cookie: "+$cookies.getObject(basketCookieKey, basket));
        console.log("view");
        console.log(basket.listView);
        
    };
    
    basket.fillListServer = function(){
        basket.listView.forEach(function(item){
            var ei = [];
            item.pizza.extraIngredients.forEach(function(i) {
                ei.push(i.id);
            })
            basket.listServer.push({id: item.pizza.id, extraIngredients: item.pizza.extraIngredients, quantity: item.quantity});
        });
        return this.listServer;
    };
    
    basket.clearBasket = function(){
        basket.listView=[];
        basket.listServer=[];
        basket.extras=[];
        basket.total = 0;
        $cookies.remove(basketCookieKey);
        console.log("remove cookie: "+$cookies.getObject(basketCookieKey, basket));
    };
    
    basket.sumPrices = function(){
        console.log("sumprices");
        basket.total=0;
        basket.listView.forEach(function(item){
            basket.total+=item.price*item.quantity;
        });
        basket.extras.forEach(function(item){
            basket.total+=item.price;
        })
        basket.total = Math.round(basket.total * 100) / 100;
        $cookies.putObject(basketCookieKey, basket);
        console.log("add cookie: "+$cookies.getObject(basketCookieKey, basket));
        return basket.total;
    };
    $cookies.putObject(basketCookieKey, basket);
    console.log("add cookie: "+$cookies.getObject(basketCookieKey, basket));
    return basket;
});