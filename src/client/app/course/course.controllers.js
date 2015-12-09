(function() {
    'use strict';
    angular
        .module('app.course')
        .controller('CourseController', CourseController)
        .controller('CourseCreateController', CourseCreateController)

    CourseController.$inject = ['$rootScope','$scope', 'logger', '$currentUser', '$displayedCourse', '$activeResource', '$resourceElements', 'Course'];
    /* @ngInject */
    function CourseController($rootScope, $scope, logger, $currentUser, $displayedCourse, $activeResource, $resourceElements, Course) {
        var vm = this;
        var resources = ['notes', 'definitions', 'cards'];

        vm.course = null;
        vm.resources = [];
        vm.activeresource = '';

        activate();

        function activate() {
            vm.activeResource = $activeResource;
            vm.course = $displayedCourse;
            angular.forEach(resources, function(resource, key) {
                if (vm.course[resource]) {
                    vm.resources.push(resource);
                }
            });
            vm.elements = $resourceElements;
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
