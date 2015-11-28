(function() {
    'use strict';
    angular
        .module('app.toolbar', ['firebase.auth', 'app.user'])
        .controller('Toolbar', Toolbar);

    Toolbar.$inject = ['$scope', '$state', 'Auth', 'UserService'];
    /* @ngInject */
    function Toolbar($scope, $state, Auth, UserService) {
        var vm = this;

        vm.firstName = '';
        vm.logout = logout;

        activate();

        function activate() {
            Auth.$onAuth(function(authData) {
                if (authData) {
                    vm.firstName = UserService.getFirstName(authData.uid);
                } else {
                    vm.firstName = '';
                    $state.go('login');
                }
            });
        }

        function logout() {
            vm.userName = '';
            Auth.$unauth();
        }
    }
})();
