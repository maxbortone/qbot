(function() {
    'use strict';
    angular
        .module('app.resources')
        .controller('NoteCreateController', NoteCreateController)
        .controller('CardCreateController', CardCreateController)
        .controller('DefinitionCreateController', DefinitionCreateController)
        .controller('NoteViewController', NoteViewController)
        .controller('CardViewController', CardViewController)
        .controller('DefinitionViewController', DefinitionViewController)
        .controller('NotesListController', NotesListController)
        .controller('CardsListController', CardsListController)
        .controller('DefinitionsListController', DefinitionsListController);


    NoteCreateController.$inject = ['$scope', '$location', '$previousState', 'logger', '$currentUser', 'Resource'];
    /* @ngInject */
    function NoteCreateController($scope, $location, $previousState, logger, $currentUser, Resource) {
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

    CardCreateController.$inject = ['$scope', '$mdDialog', 'Resource'];
    /* @ngInject */
    function CardCreateController($scope, $mdDialog, Resource) {
        var vm = this;

        vm.resource = null;
        vm.add = add;
        vm.cancel = cancel;

        activate();

        function activate() {
            vm.resource = Resource.$new();
            vm.resource.front = '';
            vm.resource.back = '';
        }

        function add() {
            $mdDialog.hide(vm.resource);
        }

        function cancel() {
            $mdDialog.cancel();
        }
    }

    DefinitionCreateController.$inject = ['$scope', '$location', '$previousState', 'logger', '$currentUser', 'Resource'];
    /* @ngInject */
    function DefinitionCreateController($scope, $location, $previousState, logger, $currentUser, Resource) {
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
        vm.activeContent = null;
        vm.toggle = true;
        vm.flip = flip;

        activate();

        function activate() {
            vm.resource = $resourceElement;
            vm.activeContent = vm.resource.front;
        }

        function flip() {
            if (vm.toggle) {
                vm.toggle = false;
                vm.activeContent = vm.resource.back;
            } else {
                vm.toggle = true;
                vm.activeContent = vm.resource.front;
            }
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

    CardsListController.$inject = ['$resourceElements', '$mdDialog', '$currentUser', 'logger'];
    /* @ngInject */
    function CardsListController($resourceElements, $mdDialog, $currentUser, logger) {
        var vm = this;

        vm.elements = [];
        vm.addCard = addCard;

        activate();

        function activate() {
            vm.elements = $resourceElements;
        }

        function addCard (ev) {
            $mdDialog.show({
                controller: CardCreateController,
                controllerAs: 'vm',
                templateUrl: 'app/resources/card.create.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: false
            }).then(function(res) {
                var course = $currentUser.$displayedCourse();
                res.type = 'card';
                course['$cards']().$add(res)
                    .then(function() {
                        logger.success('New card was created');
                    }, function(reason) {
                        logger.error(reason);
                    });
            }, function() {
                logger.warning('Action was canceled');
            })
        };
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
