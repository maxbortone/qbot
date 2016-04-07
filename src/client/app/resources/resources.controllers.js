(function() {
    'use strict';
    angular
        .module('app.resources')
        .controller('ResourceCreateController', ResourceCreateController)
        .controller('NoteViewController', NoteViewController)
        .controller('CardViewController', CardViewController)
        .controller('DefinitionViewController', DefinitionViewController)
        .controller('NotesListController', NotesListController)
        .controller('CardsListController', CardsListController)
        .controller('DefinitionsListController', DefinitionsListController);

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
                    course.incrementResourceCount(type);
                    vm.resource = null;
                    $location.path($previousState.URL);
                }, function(reason) {
                    logger.error(reason);
                });
        }

        function cancel() {
            vm.resource = null;
            $location.path($previousState.URL);
        }
    }

    NoteViewController.$inject = ['$resourceElement'];
    /* @ngInject */
    function NoteViewController($resourceElement) {
        var vm = this;

        vm.resource = null;

        activate();

        function activate() {
            vm.resource = $resourceElement;
        }
    }

    CardViewController.$inject = ['$resourceElement'];
    /* @ngInject */
    function CardViewController($resourceElement) {
        var vm = this;

        vm.resource = null;
        vm.toggle = true;
        vm.flip = flip;

        activate();

        function activate() {
            vm.resource = $resourceElement;
        }

        function flip() {
            vm.toggle = vm.toggle ? false : true;
        }
    }

    DefinitionViewController.$inject = ['$resourceElement'];
    /* @ngInject */
    function DefinitionViewController($resourceElement) {
        var vm = this;

        vm.resource = null;
        vm.toggle = true;
        vm.flip = flip;

        activate();

        function activate() {
            vm.resource = $resourceElement;
        }

        function flip() {
            vm.toggle = vm.toggle ? false : true;
        }
    }

    NotesListController.$inject = ['$resourceElements'];
    /* @ngInject */
    function NotesListController($resourceElements) {
        var vm = this;

        vm.elements = [];

        activate();

        function activate() {
            vm.elements = $resourceElements;
        }
    }

    CardsListController.$inject = ['$resourceElements'];
    /* @ngInject */
    function CardsListController($resourceElements) {
        var vm = this;

        vm.elements = [];

        activate();

        function activate() {
            vm.elements = $resourceElements;
        }
    }

    DefinitionsListController.$inject = ['$resourceElements'];
    /* @ngInject */
    function DefinitionsListController($resourceElements) {
        var vm = this;

        vm.elements = [];

        activate();

        function activate() {
            vm.elements = $resourceElements;
        }
    }
})();
