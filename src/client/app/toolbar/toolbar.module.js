(function() {
    'use strict';
    angular
        .module('app.toolbar', ['firebase.auth', 'blocks.filters', 'app.user'])
        .controller('ToolbarController', ToolbarController);

    ToolbarController.$inject = ['$rootScope', '$scope', '$state', 'Auth', 'User'];
    /* @ngInject */
    function ToolbarController($rootScope, $scope, $state, Auth, User) {
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
            $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
                if (toState.name != 'course' ) {
                    $rootScope.displayedCourse = null;
                }
            })
        }

        function logout() {
            vm.userName = '';
            Auth.$unauth();
            $state.go('login');
        }
    }
})();
