(function() {
    'use strict';
    angular
        .module('app.auth', ['firebase', 'firebase.ref', 'firebase.auth', 'app.user'])
        .factory('AuthenticationService', AuthenticationService);

    AuthenticationService.$inject = ['$location', '$rootScope', '$q', '$firebaseObject', 'Auth', 'Ref', 'User'];
    /* @ngInject */
    function AuthenticationService($location, $rootScope, $q, $firebaseObject, Auth, Ref, User) {
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
                var user = User.$new({
                    name: newUser.firstName + ' ' + newUser.lastName,
                    email: newUser.email,
                    profileImageURL: authData.password.profileImageURL,
                    id: authData.uid
                });
                return user.$save();
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
