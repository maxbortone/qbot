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
                state: 'course',
                config: {
                    url: '/course/:id/:resource',
                    views: {
                        'main@': {
                            templateUrl: 'app/course/course.html',
                            controller: 'CourseController',
                            controllerAs: 'vm'
                        },
                        'list@course': {
                            templateUrl: function($stateParams) {
                                return 'src/client/app/resources/' + $stateParams.resource + '.list.html';
                            },
                            controllerProvider: function($stateParams) {
                                var res = $stateParams.resource;
                                return res.charAt(0).toUpperCase() + res.slice(1) + 'ListController';
                            },
                            controllerAs: 'vm',
                            resolve: {
                                $resourceElements: ['$q', '$activeResource', '$currentUser', '$displayedCourse',
                                    function($q, $activeResource, $currentUser, $displayedCourse) {
                                        var def = $q.defer();
                                        $displayedCourse['$' + $activeResource]()
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
                    authenticate: true,
                    resolve: {
                        $displayedCourse: ['$q', '$stateParams', '$rootScope', 'Course', '$currentUser',
                            function($q, $stateParams, $rootScope, Course, $currentUser) {
                                var def = $q.defer();
                                Course.$find($stateParams.id)
                                    .$loaded(function(course) {
                                        $rootScope.displayedCourse = course;
                                        $currentUser.$setDisplayedCourse(course);
                                        def.resolve(course);
                                    }, function(error) {
                                        def.reject(error);
                                    });
                                return def.promise;
                        }],
                        $activeResource: ['$stateParams', function($stateParams) {
                            return $stateParams.resource;
                        }]
                    }
                }
            },
            {
                state: 'create',
                config: {
                    url: '/create',
                    views: {
                        'main@': {
                            templateUrl: 'app/course/course.create.html',
                            controller: 'CourseCreateController',
                            controllerAs: 'vm'
                        }
                    },
                    authenticate: true
                }
            }
        ];
    }
})();
