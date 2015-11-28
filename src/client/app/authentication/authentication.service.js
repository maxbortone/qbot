(function() {
    'use strict';
    angular
        .module('app.auth', ['firebase', 'firebase.ref', 'firebase.auth', 'app.user'])
        .factory('AuthenticationService', AuthenticationService);

    AuthenticationService.$inject = ['$location', '$rootScope', '$q', '$firebaseObject', 'Auth', 'Ref', 'UserService'];
    /* @ngInject */
    function AuthenticationService($location, $rootScope, $q, $firebaseObject, Auth, Ref, UserService) {
        var service = {};

        service.Login = Login;
        service.Register = Register;

        return service;

        function Login(email, password, success, failed) {
            Auth.$authWithPassword({
                email: email,
                password: password
            }, {rememberMe: true})
            .then(function(response) {
                success(response);
            })
            .catch(function(error) {
                failed(error);
            });
        }

        function Register(newUser, success, failed) {
            Auth.$createUser({email: newUser.email, password: newUser.password})
            .then(function(userData) {
                return Auth.$authWithPassword({email: newUser.email, password: newUser.password}, {rememberMe: true});
            })
            .then(function(authData) {
                return UserService.setProfile(newUser, authData);
            })
            .then(function(response) {
                success(response);
            })
            .catch(function(error) {
                failed(error);
            });
        }
    }

})();
