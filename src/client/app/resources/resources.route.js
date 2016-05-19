(function() {
    'use strict';

    angular
        .module('app.resources')
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
                            controller: 'NoteCreateController',
                            controllerAs: 'vm'
                        }
                    },
                    authenticate: true,
                    previousState: true
                }
            },
            {
                state: 'note.view',
                config: {
                    url: '/:resourceId',
                    views: {
                        'main@': {
                            templateUrl: 'app/resources/note.view.html',
                            controller: 'NoteViewController',
                            controllerAs: 'vm',
                            resolve: {
                                $resourceElement: ['$q', '$stateParams', 'Resource',
                                    function($q, $stateParams, Resource) {
                                        var def = $q.defer();
                                        Resource.$find($stateParams.resourceId)
                                            .$loaded(function(resource) {
                                                def.resolve(resource);
                                            }, function(error) {
                                                def.reject(error);
                                            });
                                        return def.promise;
                                }]
                            }
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
                            controller: 'DefinitionCreateController',
                            controllerAs: 'vm'
                        }
                    },
                    authenticate: true,
                    previousState: true
                }
            },
            {
                state: 'definition.view',
                config: {
                    url: '/:resourceId',
                    views: {
                        'main@': {
                            templateUrl: 'app/resources/definition.view.html',
                            controller: 'DefinitionViewController',
                            controllerAs: 'vm',
                            resolve: {
                                $resourceElement: ['$q', '$stateParams', 'Resource',
                                    function($q, $stateParams, Resource) {
                                        var def = $q.defer();
                                        Resource.$find($stateParams.resourceId)
                                            .$loaded(function(resource) {
                                                def.resolve(resource);
                                            }, function(error) {
                                                def.reject(error);
                                            });
                                        return def.promise;
                                }]
                            }
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
                            controller: 'CardCreateController',
                            controllerAs: 'vm'
                        }
                    },
                    authenticate: true,
                    previousState: true
                }
            },
            {
                state: 'card.view',
                config: {
                    url: '/:resourceId',
                    views: {
                        'main@': {
                            templateUrl: 'app/resources/card.view.html',
                            controller: 'CardViewController',
                            controllerAs: 'vm',
                            resolve: {
                                $resourceElement: ['$q', '$stateParams', 'Resource',
                                    function($q, $stateParams, Resource) {
                                        var def = $q.defer();
                                        Resource.$find($stateParams.resourceId)
                                            .$loaded(function(resource) {
                                                def.resolve(resource);
                                            }, function(error) {
                                                def.reject(error);
                                            });
                                        return def.promise;
                                }]
                            }
                        }
                    },
                    authenticate: true,
                    previousState: true
                }
            }
        ];
    }
})();
