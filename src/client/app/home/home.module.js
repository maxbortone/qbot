(function() {
    'use strict';
    angular
        .module('app.home', ['blocks.filters', 'blocks.logger'])
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$scope', '$currentUser', 'logger'];
    /* @ngInject */
    function HomeController($scope, $currentUser, logger) {
        var vm = this;

        vm.user = null;
        vm.courses = null;

        activate();

        function activate() {
            vm.user = $currentUser;
            vm.courses = $currentUser.$courses();
            logger.success('Home view activated');
        }
    }
})();
