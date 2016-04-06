/**
 * Created by siulkilulki on 08.01.16.
 */
(function () {
    angular
        .module( 'pizzeria' )
        .controller( 'ContactController', ContactController );


    ContactController.$inject = [ '$http' ];

    function ContactController( $http ) {
        var vm = this;
        vm.name = '';
        vm.street = '';
        vm.city = '';
        vm.phone = '';
        vm.hours = '';

        $http
            .get( '/contact' )
            .success( function ( data ) {
                vm.name = data.name;
                vm.street = data.address.street;
                vm.city = data.address.city;
                vm.phone = data.phone;
                vm.hours = data.hours;
            } )
            .error( function ( data, status ) {
                console.error( 'http.get error in ContactCtrl.js', status, data );
            } );
    }
})();


