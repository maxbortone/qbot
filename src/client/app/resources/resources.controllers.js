(function() {
    'use strict';
    angular
        .module('app.resources')
        .controller('CardsListController', CardsListController)
        .controller('CardCreateController', CardCreateController)
        .controller('CardEditController', CardEditController)
        .controller('CardViewController', CardViewController)
        .controller('NotesListController', NotesListController)
        .controller('NoteCreateController', NoteCreateController)
        .controller('NoteViewController', NoteViewController)
        .controller('DefinitionsListController', DefinitionsListController)
        .controller('DefinitionCreateController', DefinitionCreateController)
        .controller('DefinitionViewController', DefinitionViewController);


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

    CardEditController.$inject = ['$scope', '$mdDialog', '$resourceElement'];
    /* @ngInject */
    function CardEditController($scope, $mdDialog, $resourceElement) {
        var vm = this;

        vm.resource = null;
        vm.save = save;
        vm.cancel = cancel;

        activate();

        function activate() {
            vm.resource = $resourceElement;
        }

        function save() {
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

    CardViewController.$inject = ['$resourceElements', '$current'];
    /* @ngInject */
    function CardViewController($resourceElements, $current) {
        var vm = this;
        var resource = null;

        vm.current = null;
        vm.total = null;
        vm.activeContent = null;
        vm.toggle = true;
        vm.flip = flip;
        vm.prev = prev;
        vm.next = next;

        activate();

        function activate() {
            vm.current = $current;
            vm.total = $resourceElements.length-1;
            resource = $resourceElements[vm.current];
            vm.activeContent = resource.front;
        }

        function flip() {
            if (vm.toggle) {
                vm.toggle = false;
                vm.activeContent = resource.back;
            } else {
                vm.toggle = true;
                vm.activeContent = resource.front;
            }
        }

        function prev() {
            vm.current--;
            resource = $resourceElements[vm.current];
            vm.activeContent = resource.front;
        }

        function next() {
            vm.current++;
            resource = $resourceElements[vm.current];
            vm.activeContent = resource.front;
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

    CardsListController.$inject = ['$resourceElements', '$mdDialog', '$currentUser', 'Ref', 'logger'];
    /* @ngInject */
    function CardsListController($resourceElements, $mdDialog, $currentUser, Ref, logger) {
        var vm = this;

        vm.elements = [];
        vm.addCard = addCard;
        vm.viewCard = viewCard;
        vm.editCard = editCard;
        vm.deleteCard = deleteCard;

        activate();

        function activate() {
            vm.elements = $resourceElements;
        }

        function addCard () {
            $mdDialog.show({
                controller: CardCreateController,
                controllerAs: 'vm',
                templateUrl: 'app/resources/card.create.html',
                parent: angular.element(document.body),
                clickOutsideToClose: false
            }).then(function(el) {
                vm.elements.$add(el)
                    .then(function(res) {
                        logger.success('New card was created');
                    }, function(reason) {
                        logger.error(reason);
                    });
            }, function() {
                logger.warning('Action was canceled');
            });
        }

        function viewCard ($index) {
            $mdDialog.show({
                locals: {$resourceElements: vm.elements, $current: $index},
                controller: CardViewController,
                controllerAs: 'vm',
                templateUrl: 'app/resources/card.view.html',
                parent: angular.element(document.body),
                clickOutsideToClose: true
            });
        }

        function editCard (el) {
            $mdDialog.show({
                locals: {$resourceElement: el},
                controller: CardEditController,
                controllerAs: 'vm',
                templateUrl: 'app/resources/card.edit.html',
                parent: angular.element(document.body),
                clickOutsideToClose: false
            }).then(function(el) {
                el.$save()
                    .then(function(res) {
                        logger.success('Changes have been saved');
                    }, function(reason) {
                        logger.error(reason);
                    });
            }, function() {
                logger.warning('Action was canceled');
            });
        }
        
        function deleteCard(el) {
            // TODO: quite the hack, need a solution without angularfire-resource
            vm.elements.$remove(el);
            var elRef = Ref.child('resources').child(el.$id);
            elRef.remove();
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
