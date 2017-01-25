(function() {
    'use strict';
    angular
        .module('app.course')
        .controller('CourseController', CourseController)
        .controller('CourseCreateController', CourseCreateController)
        .controller('CourseSettingsController', CourseSettingsController);

    CourseController.$inject = ['$rootScope', 'logger', '$displayedCourse', '$state', '$mdSidenav'];
    /* @ngInject */
    function CourseController($rootScope, logger, $displayedCourse, $state, $mdSidenav) {
        var vm = this;
        var resources = ['cards', 'questions'];
        var tools = ['memorize'];
        var tests = ['T/F', 'quiz'];

        vm.course = null;
        vm.resources = [];
        vm.tools = [];
        vm.tests = [];
        vm.navigateTo = navigateTo;

        activate();

        function activate() {
            $rootScope.sidenavIsVisible = true;
            vm.course = $displayedCourse;
            vm.resources = resources;
            // angular.forEach(resources, function(resource, key) {
            //     if (vm.course[resource]) {
            //         vm.resources.push(resource);
            //     }
            // });
            // angular.forEach(tools, function(tool, key) {
            //     if (vm.course[tool]) {
            //         vm.tools.push(tool);
            //     }
            // });
            // angular.forEach(tests, function(test, key) {
            //     if (vm.course[test]) {
            //         vm.resources.push(test);
            //     }
            // });
            // if (!vm.resources && !vm.tools && !vm.tests) {
            //     logger.warning('No resources available!');
            // }
        }

        function navigateTo(target) {
            if ($rootScope.screenIsSmall) {
                $mdSidenav('sidenav').toggle();
            }
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

    CourseSettingsController.$inject = ['$scope', '$state', 'logger', '$currentUser', '$displayedCourse', '$mdColorPalette'];
    /* @ngInject */
    function CourseSettingsController($scope, $state, logger, $currentUser, $displayedCourse, $mdColorPalette) {
        var vm = this;

        vm.user = null;
        vm.course = null;
        vm.colors = Object.keys($mdColorPalette);
        vm.selectedColor = null;
        vm.save = save;
        vm.cancel = cancel;
        vm.setColor = setColor;

        activate();

        function activate() {
            vm.user = $currentUser;
            vm.course = {
                color: $displayedCourse.color,
                name: $displayedCourse.name,
                university: $displayedCourse.university,
                description: $displayedCourse.description,
                public: $displayedCourse.public,
            };
            // $scope.$watch('vm.selectedColor', function(newValue, oldValue) {
            //     if (newValue != oldValue) {
            //         vm.course.color = newValue;
            //     }
            // });
            vm.selectedColor = vm.course.color;
        }

        function save() {
            if (vm.course.color) {
                $displayedCourse.color = vm.course.color;
            }
            if (vm.course.name) {
                $displayedCourse.name = vm.course.name;
            }
            if (vm.course.university) {
                $displayedCourse.university = vm.course.university;
            }
            if (vm.course.description) {
                $displayedCourse.description = vm.course.description;
            }
            if (vm.course.public) {
                $displayedCourse.public = vm.course.public;
            }
            $displayedCourse.$save()
                .then(function() {
                    $state.go('course.overview', {'id': $displayedCourse.$id});
                });
        }

        function cancel() {
            vm.course = null;
            $state.go('course.overview', {'id': $displayedCourse.$id});
        }

        function setColor(color) {
            vm.course.color = color;
            vm.selectedColor = color;
        }
    }
})();
