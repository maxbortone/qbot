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
                state: 'course.notes',
                config: {
                    url: '/notes',
                    views: {
                        'content@course': {
                            templateUrl: 'app/resources/notes.list.html',
                            controller: 'NotesListController',
                            controllerAs: 'vm',
                            resolve: {
                                $resourceElements: ['$q', '$currentUser', '$displayedCourse',
                                    function($q, $currentUser, $displayedCourse) {
                                        var def = $q.defer();
                                        $displayedCourse['$notes']()
                                            .$loaded(function(result) {
                                                def.resolve(result);
                                            }, function(error) {
                                                def.reject(error);
                                            });
                                        return def.promise;
                                }]
                            }
                        }
                    },
                    authenticate: true
                }
            },
            {
                state: 'course.cards',
                config: {
                    url: '/cards',
                    views: {
                        'content@course': {
                            templateUrl: 'app/resources/cards.list.html',
                            controller: 'CardsListController',
                            controllerAs: 'vm',
                            resolve: {
                                $resourceElements: ['$q', '$currentUser', '$displayedCourse',
                                    function($q, $currentUser, $displayedCourse) {
                                        var def = $q.defer();
                                        $displayedCourse['$cards']()
                                            .$loaded(function(result) {
                                                def.resolve(result);
                                            }, function(error) {
                                                def.reject(error);
                                            });
                                        return def.promise;
                                }]
                            }
                        }
                    },
                    authenticate: true
                }
            },
            {
                state: 'course.definitions',
                config: {
                    url: '/definitions',
                    views: {
                        'content@course': {
                            templateUrl: 'app/resources/definitions.list.html',
                            controller: 'DefinitionsListController',
                            controllerAs: 'vm',
                            resolve: {
                                $resourceElements: ['$q', '$currentUser', '$displayedCourse',
                                    function($q, $currentUser, $displayedCourse) {
                                        var def = $q.defer();
                                        $displayedCourse['$definitions']()
                                            .$loaded(function(result) {
                                                def.resolve(result);
                                            }, function(error) {
                                                def.reject(error);
                                            });
                                        return def.promise;
                                }]
                            }
                        }
                    },
                    authenticate: true
                }
            }
        ];
    }
})();
