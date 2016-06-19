(function() {
    'use strict';
    angular
        .module('app.course')
        .controller('CourseController', CourseController)
        .controller('CourseCreateController', CourseCreateController)

    CourseController.$inject = ['$scope', 'logger', '$displayedCourse', '$state'];
    /* @ngInject */
    function CourseController($scope, logger, $displayedCourse, $state) {
        var vm = this;
        var resources = ['notes', 'definitions', 'cards'];
        var tools = ['memorize'];
        var tests = ['T/F', 'quiz'];

        vm.course = null;
        vm.resources = [];
        vm.tools = [];
        vm.tests = [];
        vm.navigateTo = navigateTo;

        activate();

        function activate() {
            vm.course = $displayedCourse;
            angular.forEach(resources, function(resource, key) {
                if (vm.course[resource]) {
                    vm.resources.push(resource);
                }
            });
            if (!vm.resources) {
                logger.warning('No resources available!');
            }
            vm.tools = tools;
            vm.tests = tests;
        }

        function navigateTo(target) {
            $state.go('course.'+target, {'id': vm.course.$id});
        }
    }

    CourseCreateController.$inject = ['$scope', '$state', 'logger', '$currentUser', 'Course'];
    /* @ngInject */
    function CourseCreateController($scope, $state, logger, $currentUser, Course) {
        var vm = this;

        vm.user = null;
        vm.newCourse = null;
        vm.createCourse = createCourse;
        vm.cancel = cancel;

        activate();

        function activate() {
            vm.user = $currentUser;
        }

        function createCourse(obj) {
            var course = Course.$new(obj);
            course.$save()
                .then(function() {
                    $currentUser.$courses().$add(course);
                    $currentUser.$setDisplayedCourse(course);
                })
                .then(function() {
                    $state.go('course', {'id': course.$id, 'resource': 'notes'});
                });
        }

        function cancel() {
            vm.newCourse = null;
            $state.go('home');
        }
    }
})();
