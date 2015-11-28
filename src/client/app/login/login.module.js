(function() {
    'use strict';
    angular
        .module('app.login', ['firebase', 'firebase.auth', 'app.auth', 'blocks.logger'])
        .controller('Login', Login);

    Login.$inject = ['$location', '$firebaseObject', 'Auth', 'AuthenticationService', 'logger', 'homeRedirectPath'];
    /* @ngInject */
    function Login($location, $firebaseObject, Auth, AuthenticationService, logger, homeRedirectPath) {
        var vm = this;

        vm.createMode = false;
        vm.passwordLogin = passwordLogin;
        vm.registerAccount = registerAccount;

        activate();

        function activate() {
            if (Auth.$getAuth()) {
                $location.path(homeRedirectPath);
            }
        }

        function passwordLogin(email, pass) {
            AuthenticationService.Login(email, pass, redirect, showError);
        }

        function registerAccount(newUser) {
            if( !newUser.password ) {
                logger.error('Please enter a password');
            }
            else if( newUser.password !== newUser.confirm ) {
                logger.error('Passwords do not match');
            }
            else {
                AuthenticationService.Register(newUser, redirect, showError);
            }
        }

        function redirect(response) {
            logger.success('You successfully logged in!');
            $location.path(homeRedirectPath);
        }

        function showError(error) {
            console.log(error);
            logger.error(error);
        }
    }
})();
