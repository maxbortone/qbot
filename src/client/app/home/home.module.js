(function() {
    'use strict';
    angular
        .module('app.home', ['blocks.filters', 'blocks.logger'])
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$scope', '$currentUser', '$courses', 'logger'];
    /* @ngInject */
    function HomeController($scope, $currentUser, $courses, logger) {
        var vm = this;

        vm.user = null;
        vm.courses = null;
        vm.getLength = getLength;

        activate();

        function activate() {
            vm.user = $currentUser;
            vm.courses = $courses;
            logger.success('Home view activated');
        }

        function getLength(obj) {
            return Object.keys(obj).length;
        }
    }
})();
