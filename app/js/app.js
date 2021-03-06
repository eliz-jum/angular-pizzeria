angular
    .module('pizzeria', ['ui.router','ngCookies','angularModalService'])
    .config(function ($stateProvider, $urlRouterProvider) {
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
                controller: 'ContactController',
                controllerAs: 'contact'
            });
        $urlRouterProvider.otherwise('/main');
});