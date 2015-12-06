(function() {
    'use strict';
    angular
        .module('app.resources')
        .controller('ResourceCreateController', ResourceCreateController);

    ResourceCreateController.$inject = ['$scope', '$location', '$previousState', 'logger', '$currentUser', 'Resource'];
    /* @ngInject */
    function ResourceCreateController($scope, $location, $previousState, logger, $currentUser, Resource) {
        var vm = this;
        var fromId = null;

        vm.resource = null;
        vm.notes = null;
        vm.createResource = createResource;
        vm.cancel = cancel;

        activate();

        function activate() {
            vm.resource = Resource.$new();
        }

        function createResource(resource, type) {
            var course = $currentUser.$displayedCourse();
            resource.type = type;
            course['$' + type + 's']().$add(resource)
                .then(function() {
                    vm.resource = Resource.$new();
                    $location.path($previousState.URL);
                });
        }

        function cancel() {

        }
    }
})();
