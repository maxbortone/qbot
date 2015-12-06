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
                state: 'note',
                config: {
                    url: '/note',
                    authenticate: true
                }
            },
            {
                state: 'note.create',
                config: {
                    url: '/create',
                    views: {
                        'main@': {
                            templateUrl: 'app/resources/note.create.html',
                            controller: 'ResourceCreateController',
                            controllerAs: 'vm'
                        }
                    },
                    authenticate: true,
                    previousState: true
                }
            },
            {
                state: 'definition',
                config: {
                    url: '/definition',
                    authenticate: true
                }
            },
            {
                state: 'definition.create',
                config: {
                    url: '/create',
                    views: {
                        'main@': {
                            templateUrl: 'app/resources/definition.create.html',
                            controller: 'ResourceCreateController',
                            controllerAs: 'vm'
                        }
                    },
                    authenticate: true,
                    previousState: true
                }
            },
            {
                state: 'card',
                config: {
                    url: '/card',
                    authenticate: true
                }
            },
            {
                state: 'card.create',
                config: {
                    url: '/create',
                    views: {
                        'main@': {
                            templateUrl: 'app/resources/card.create.html',
                            controller: 'ResourceCreateController',
                            controllerAs: 'vm'
                        }
                    },
                    authenticate: true,
                    previousState: true
                }
            }
        ];
    }
})();
