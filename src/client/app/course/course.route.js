(function() {
    'use strict';

    angular
        .module('app.course')
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
                    abstract: 'true',
                    url: '/course/:id',
                    views: {
                        'main@': {
                            templateUrl: 'app/course/course.html',
                            controller: 'CourseController',
                            controllerAs: 'vm'
                        }
                    },
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
                        }]
                    },
                    authenticate: true
                }
            },
            {
                state: 'course.overview',
                config: {
                    url: '/overview',
                    views: {
                        'content@course': {
                            templateUrl: 'app/course/course.overview.html',
                        }
                    },
                    authenticate: true
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
