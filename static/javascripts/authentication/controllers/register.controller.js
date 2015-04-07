(function (){ 
    'use strict'; 

    angular
        .module('thinkster.authentication.controllers')
        .controller('RegisterController', ['$location', '$scope', '$http', 'Authentication', RegisterController]);

    /**
        @namespace RegisterController
    **/

    function RegisterController($location, $scope, $http, Authentication) {
        var vm = this; 
        vm.register = register; 

        activate();

        /** 
            @name register
            @desc Register a new user
            @memberOf thinkster.authentication.controllers.RegisterController
        **/
        function register(){
            console.log(vm);
            Authentication.register(vm.email, vm.password, vm.username);
        }

        function activate(){
            if (Authentication.isAuthenticated()) {
                $location.url('/');
            }
        }
    }
})();