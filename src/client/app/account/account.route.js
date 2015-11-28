(function() {
    'use strict';

    angular
        .module('app.account')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'account',
                config: {
                    url: '/account',
                    templateUrl: 'app/account/account.html',
                    controller: 'Account',
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
