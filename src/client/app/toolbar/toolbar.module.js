(function() {
    'use strict';
    angular
        .module('app.toolbar', ['firebase.auth', 'blocks.filters', 'app.user'])
        .controller('Toolbar', Toolbar);

    Toolbar.$inject = ['$scope', '$state', 'Auth', 'User'];
    /* @ngInject */
    function Toolbar($scope, $state, Auth, User) {
        var vm = this;

        vm.user = null;
        vm.courses = [];
        vm.course = '';
        vm.loadCourse = loadCourse;
        vm.logout = logout;

        activate();

        function activate() {
            Auth.$onAuth(function(authData) {
                if (authData) {
                    vm.user = User.$find(authData.uid);
                    //getCourses();
                } else {
                    vm.user = null;
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
            $state.go('login');
        }
    }
})();
