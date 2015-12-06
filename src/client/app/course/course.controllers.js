(function() {
    'use strict';
    angular
        .module('app.course')
        .controller('CourseController', CourseController)
        .controller('CourseCreateController', CourseCreateController)

    CourseController.$inject = ['$scope', 'logger', '$currentUser', '$courseResources', 'Course'];
    /* @ngInject */
    function CourseController($scope, logger, $currentUser, $courseResources, Course) {
        var vm = this;

        vm.course = null;
        vm.resources = null;

        activate();

        function activate() {
            vm.course = $currentUser.$displayedCourse();
            vm.resources = $courseResources;
            if (!vm.resources) {
                logger.warning('No resources available!');
            }
        }
    }

    CourseCreateController.$inject = ['$scope', '$state', 'logger', '$currentUser', 'Course'];
    /* @ngInject */
    function CourseCreateController($scope, $state, logger, $currentUser, Course) {
        var vm = this;

        vm.user = null;
        vm.newCourse = null;
        vm.createCourse = createCourse;

        activate();

        function activate() {
            vm.user = $currentUser;
        }

        function createCourse(obj) {
            console.log(obj);
            var course = Course.$new(obj);
            course.$save()
                .then(function() {
                    $currentUser.$courses().$add(course);
                    $currentUser.$setDisplayedCourse(course);
                })
                .then(function() {
                    $state.go('home');
                });
        }
    }
})();
