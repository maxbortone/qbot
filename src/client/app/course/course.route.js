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
                    url: '/course/:id',
                    views: {
                        'main@': {
                            templateUrl: 'app/course/course.html',
                            controller: 'CourseController',
                            controllerAs: 'vm'
                        }
                    },
                    authenticate: true,
                    resolve: {
                        $displayedCourse: ['$q', '$stateParams', '$rootScope', 'Course', '$currentUser',
                            function($q, $stateParams, $rootScope, Course, $currentUser) {
                            return Course.$find($stateParams.id).$loaded()
                                    .then(function(course) {
                                        $rootScope.displayedCourse = course;
                                        return $currentUser.$setDisplayedCourse(course);
                                    });
                        }],
                        $courseResources: ['$q', '$currentUser', '$displayedCourse', function($q, $currentUser, $displayedCourse) {
                            var def = $q.defer()
                            var resources = ['notes', 'definitions', 'cards'];
                            var promises = resources.map(function(resource) {
                                return $displayedCourse['$' + resource]().$loaded();
                            });

                            $q.all(promises).then(function(values) {
                                var result = [];
                                angular.forEach(values, function(value, key) {
                                    if (value.length != 0) {
                                        var resource = {
                                            elements: value,
                                            type: resources[key]
                                        }
                                        result.push(resource);
                                    }
                                });
                                def.resolve(result);
                            }, function(error) {
                                def.reject(error);
                            });

                            return def.promise;
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
