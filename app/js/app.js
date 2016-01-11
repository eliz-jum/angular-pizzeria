angular.module('pizzeria', ['ui.router']).config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('main', {
            url: '/main',
            templateUrl: '../htmlTemplates/main.html',
            controller: 'MainController'
        })
        .state('order', {
            url: '/order',
            templateUrl: '../htmlTemplates/order.html',
            controller: 'OrderController'
        })
        .state('status', {
            url: '/status/:orderId',
            templateUrl: '../htmlTemplates/status.html',
            controller: 'StatusController'
        })
        .state('contact', {
            url: '/contact',
            templateUrl: '../htmlTemplates/contact.html',
            controller: 'ContactController'
        });
    $urlRouterProvider.otherwise('/main');
});

angular.module('pizzeria').factory('basket',function(){
    var basket = {};
    basket.listView = [];//{id, name, price quantity}
    basket.listServer =[];
    
    var ind;
    basket.add = function(pizza){
        var isInListView=false;
        if (this.listView.length > 0){
            this.listView.forEach(function(item, index){
                if (item.id===pizza.id){
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
                console.log("Tej pizzy nie bylo!");
                basket.listView.push(pizza);
            }    
        }
        else {
            console.log("Pusta tablica!");
            basket.listView.push(pizza);
        }
        console.log("view");
        console.log(basket.listView);
        
    };
    
    basket.fillListServer = function(){
        console.log("basket.listView");
        console.log(basket.listView);
        basket.listView.forEach(function(item){
            basket.listServer.push({id: item.id, quantity: item.quantity});
        });
        return this.listServer;
    };
    basket.clearBasket = function(){
        basket.listView=[];
        basket.listServer=[];
    };
    return basket;
    
});