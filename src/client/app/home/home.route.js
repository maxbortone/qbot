(function() {
    'use strict';

    angular
        .module('app.home')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'home',
                config: {
                    url: '/',
                    templateUrl: 'app/home/home.html',
                    controller: 'Home',
                    controllerAs: 'vm',
                    authenticate: true,
                    resolve: {
                        user: ['Auth', function(Auth) {
                            return Auth.$requireAuth();
                        }]
                    }
                }
            }
        ];
    }
})();
