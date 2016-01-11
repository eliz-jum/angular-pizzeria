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

angular.module('pizzeria').factory('pizzas',function(){
    var pizzas = {};
    pizzas.list = [];
    
    return pizzas;
});