(function() {
    'use strict';
    angular
        .module('app.home', ['blocks.filters', 'blocks.logger', 'app.user'])
        .controller('Home', Home);

    Home.$inject = ['$scope', 'user', 'logger', 'UserService'];
    /* @ngInject */
    function Home($scope, user, logger, UserService) {
        var vm = this;

        vm.user = null;

        activate();

        function activate() {
            vm.user = user;
            vm.user.name = UserService.getFirstName(user.uid);
            logger.success('Home view activated');
        }
    }
})();
