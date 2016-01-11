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
    basket.listView = [];//{name, price quantity}
    basket.listServer =[];
    
    basket.add = function(pizza){
        console.log("view");
        console.log(basket.listView);
        console.log("server");
        console.log(basket.listServer);
        if (basket.listServer.length > 0 || basket.listServer.length >0){
            this.listServer.forEach(function(item){
                if (item.id===pizza.id){
                    //juz dodal te pizze!
                }
                else {
                    console.log("else!");
                    basket.listView.push(pizza);
                    basket.listServer.push({id: pizza.id, quantity: pizza.quantity});
                }

            });
        }
        else {
            console.log("else2!");
            basket.listView.push(pizza);
            basket.listServer.push({id: pizza.id, quantity: pizza.quantity});
                
        }

    };
    
    
    return basket;
});