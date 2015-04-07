/**
* Authentication 
* @namespace thinkster.authentication.services
**/
(function () {
    'use strict';

   

    angular
        .module('thinkster.authentication.services', ['ngCookies'])
        // .factory('Authentication', Authentication);
        .factory('Authentication', [ '$cookies', '$http', function Authentication($cookies, $http) {

                var Authentication = {
                    getAuthenticatedAccount: getAuthenticatedAccount,
                    isAuthenticated: isAuthenticated,
                    login: login,
                    register: register,
                    setAuthenticatedAccount: setAuthenticatedAccount,
                    unauthenticate: unauthenticate
                };
               

                /**
                * @name register
                * @desc Try to register a new user
                * @param {string} username The username entered by the user
                * @param {string} password The password entered by the user
                * @param {string} email The email entered by the user
                * @returns {Promise}
                * @memberOf thinkster.authentication.services.Authentication
                */
                function register(email, password, username){
                    return $http.post('/api/v1/accounts/', {
                        username: username, 
                        password: password, 
                        email: email
                    });
                }

                 /**
                @name login
                @desc Authenticate user =D
                @memberOf thinkster.authentication.services.Authentication
                **/
                function login(email, password){
                    return $http.post('/api/v1/auth/login/', {
                        email: email,
                        password: password
                    }).then(loginSuccessFn, loginErrorFn);
                }

                return Authentication; 
            }
             Authentication.$inject = ['$cookies', '$http'];
        ]);

    

    /**
        returns {Factory}
    **/
    // function Authentication($cookies, $http) {
    //     var Authentication = {
    //         getAuthenticatedAccount: getAuthenticatedAccount,
    //         isAuthenticated: isAuthenticated,
    //         login: login,
    //         register: register,
    //         setAuthenticatedAccount: setAuthenticatedAccount,
    //         unauthenticate: unauthenticate
    //     };
    //     return Authentication; 

        /**
        * @name register
        * @desc Try to register a new user
        * @param {string} username The username entered by the user
        * @param {string} password The password entered by the user
        * @param {string} email The email entered by the user
        * @returns {Promise}
        * @memberOf thinkster.authentication.services.Authentication
        */
    //     function register(email, password, username){
    //         return $http.post('/api/v1/accounts/', {
    //             username: username, 
    //             password: password, 
    //             email: email
    //         });
    //     }
    // }

    // /**
    //     @name login
    //     @desc Authenticate user =D
    //     @memberOf thinkster.authentication.services.Authentication
    // **/
    // function login(email, password){
    //     return $http.post('/api/v1/auth/login/', {
    //         email: email,
    //         password: password
    //     }).then(loginSuccessFn, loginErrorFn);
    // }

    /** 
        @name loginSuccessFn
        @desc Set the authenticated user and redirect to index
    **/
    function loginSucessFn(data, status, headers, config){
        Authentication.setAuthenticatedAccount(data.data);  
        window.location = '/';
    }

    /** 
        @name loginErrorFn
        @desc Log "Epic failure to console :\ "
    **/
    function loginErrorFn(data, status, headers, config){
        console.log('Epic failure! O_O');
    }

     /**
     * @name getAuthenticatedAccount
     * @desc Return the currently authenticated account
     * @returns {object|undefined} Account if authenticated, else `undefined`
     * @memberOf thinkster.authentication.services.Authentication
     */
    function getAuthenticatedAccount() {
      if (!$cookies.authenticatedAccount) {
        return;
      }

      return JSON.parse($cookies.authenticatedAccount);
    }

    /**
    * @name isAuthenticated
    * @desc Check if the current user is authenticated
    * @returns {boolean} True is user is authenticated, else false.
    * @memberOf thinkster.authentication.services.Authentication
    */
    function isAuthenticated() {
        return !!$cookies.authenticatedAccount;
    }

    /**
    * @name setAuthenticatedAccount
    * @desc Stringify the account object and store it in a cookie
    * @param {Object} user The account object to be stored
    * @returns {undefined}
    * @memberOf thinkster.authentication.services.Authentication
    */
    function setAuthenticatedAccount(account) {
        $cookies.authenticatedAccount = JSON.stringify(account);
    }

    /** 
        @name unauthenticate
        @desc Remove all account information from cookie
        @return {undefined}
        @memberOf thinkster.authentication.services.Authentication
    **/
    function unauthenticate(){
        delete $cookie.authenticatedAccount; 
    }


})();