(function() {
    'use strict';
    angular
        .module('app.toolbar', ['firebase.auth', 'blocks.filters', 'app.user'])
        .controller('Toolbar', Toolbar);

    Toolbar.$inject = ['$scope', '$state', 'Auth', 'User'];
    /* @ngInject */
    function Toolbar($scope, $state, Auth, User) {
        var vm = this;

        vm.user = null;
        vm.logout = logout;

        activate();

        function activate() {
            Auth.$onAuth(function(authData) {
                if (authData) {
                    User.$find(authData.uid)
                    .$loaded(function(user) {
                        vm.user = user;
                    });
                } else {
                    vm.user = null;
                }
            });
        }

        function logout() {
            vm.userName = '';
            Auth.$unauth();
            $state.go('login');
        }
    }
})();
