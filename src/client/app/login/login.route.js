(function() {
    'use strict';

    angular
        .module('app.login')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'login',
                config: {
                    url: '/login',
                    views: {
                        'main@': {
                            templateUrl: 'app/login/login.html',
                            controller: 'Login',
                            controllerAs: 'vm'
                        }
                    }
                }
            }
        ];
    }
})();
