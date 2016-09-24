(function() {
    'use strict';
    angular
        .module('app.toolbar', ['firebase.auth', 'blocks.filters', 'app.user'])
        .controller('ToolbarController', ToolbarController);

    ToolbarController.$inject = ['$rootScope', '$scope', '$state', 'Auth', 'User', '$mdMedia', '$mdSidenav'];
    /* @ngInject */
    function ToolbarController($rootScope, $scope, $state, Auth, User, $mdMedia, $mdSidenav) {
        var vm = this;

        vm.user = null;
        vm.logout = logout;
        vm.openSidenav = openSidenav;

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
                if (toState.name === 'account' || toState.name === 'home' ) {
                    $rootScope.displayedCourse = null;
                }
            });
            $rootScope.$watch(function() { return $mdMedia('(max-width: 1279px)'); }, function(small) {
                $rootScope.screenIsSmall = small;
            });
        }

        function logout() {
            vm.user = null;
            Auth.$unauth();
            $state.go('login');
        }

        function openSidenav(id) {
            $mdSidenav(id).toggle();
        }
    }
})();
