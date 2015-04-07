(function (){ 
    'use strict'; 

    angular
        .module('thinkster.authentication.controllers')
        .controller('RegisterController', RegisterController);

    RegisterController.$inject = ['$location', '$scope', 'Authentication'];

    /**
        @namespace RegisterController
    **/

    function RegisterController($location, $scope, Authentication){ 
        var vm = this; 
        vm.register = register; 

        activate();

        /** 
            @name register
            @desc Register a new user
            @memberOf thinkster.authentication.controllers.RegisterController
        **/
        function register(email, password, username){
            // Authentication.register(vm.email, vm.password, vm.username);
            return $http.post('/api/v1/accounts/', {
                username: username,
                password: password, 
                email:email
            }).then(registerSuccessFn, registerErrorFn);
        }

        function registerSuccessFn(data, status, headers, config){
            Authentication.login(email, password);
        }

        function registerErrorFn(data, status, headers, config){
            console.log('Epic fail. O_O');
        }

        function activate(){
            if (Authentication.isAuthenticated()) {
                $location.url('/');
            }
        }
    }
})();