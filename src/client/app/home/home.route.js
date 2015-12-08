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
                    views: {
                        'main@': {
                            templateUrl: 'app/home/home.html',
                            controller: 'HomeController',
                            controllerAs: 'vm',
                        }
                    },
                    authenticate: true,
                    resolve: {
                        $courses: ['$currentUser', function($currentUser) {
                            return $currentUser.$courses().$loaded();
                        }]
                    }
                }
            }
        ];
    }
})();
