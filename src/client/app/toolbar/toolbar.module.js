(function() {
    'use strict';
    angular
        .module('app.toolbar', ['firebase.auth', 'app.user', 'app.notes'])
        .controller('Toolbar', Toolbar);

    Toolbar.$inject = ['$scope', '$state', 'Auth', 'UserService', 'NotesService'];
    /* @ngInject */
    function Toolbar($scope, $state, Auth, UserService, NotesService) {
        var vm = this;

        vm.firstName = '';
        vm.courses = [];
        vm.course = '';
        vm.loadCourse = loadCourse;
        vm.logout = logout;

        activate();

        function activate() {
            Auth.$onAuth(function(authData) {
                if (authData) {
                    vm.firstName = UserService.getFirstName(authData.uid);
                    getCourses();
                } else {
                    vm.firstName = '';
                    $state.go('login');
                }
            });
        }

        function getCourses() {
            return NotesService.getCourses()
                .then(function(data) {
                    vm.courses = data;
                    vm.course = data[0];
                    return vm.courses;
                });
        }

        function loadCourse(id) {
            return NotesService.getCourse(id)
                .then(function(data) {
                    vm.course = data;
                    return vm.course;
                });
        }

        function logout() {
            vm.userName = '';
            Auth.$unauth();
        }
    }
})();
