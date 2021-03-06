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
        .controller('DefinitionViewController', DefinitionViewController)
        .controller('QuestionsListController', QuestionsListController)
        .controller('QuestionCreateController', QuestionCreateController)
        .controller('QuestionEditController', QuestionEditController);

    QuestionsListController.$inject = ['$scope', '$resourceElements', '$mdDialog', '$currentUser', 'Ref', 'logger', '$filter'];
    /* @ngInject */
    function QuestionsListController($scope, $resourceElements, $mdDialog, $currentUser, Ref, logger, $filter) {
        var vm = this;

        vm.elements = [];
        vm.search = '';
        vm.addQuestion = addQuestion;
        vm.answerQuestion = answerQuestion;
        vm.editQuestion = editQuestion;
        vm.deleteQuestion = deleteQuestion;
        vm.hideAnswer = hideAnswer;

        activate();

        function activate() {
            vm.elements = $resourceElements;
            $scope.$on('keydown:13', function($event, ev) {
                $scope.$apply(function () {
                    ev.target.blur();
                    searchQuestions(vm.search);
                });
            });
            $scope.$watch('vm.search', function(newValue, oldValue) {
                if (newValue === '' && oldValue.length > 0) {
                    vm.elements = $resourceElements;
                }
            });
        }

        function addQuestion () {
            $mdDialog.show({
                controller: QuestionCreateController,
                controllerAs: 'vm',
                templateUrl: 'app/resources/question.create.html',
                parent: angular.element(document.body),
                clickOutsideToClose: false
            }).then(function(el) {
                el.toggle = false;
                vm.elements.$add(el)
                    .then(function(res) {
                        logger.success('New question was created');
                    }, function(reason) {
                        logger.error(reason);
                    });
            }, function() {
                logger.warning('Action was canceled');
            });
        }

        function editQuestion (el) {
            $mdDialog.show({
                locals: {$resourceElement: {question: el.question}},
                controller: QuestionEditController,
                controllerAs: 'vm',
                templateUrl: 'app/resources/question.edit.html',
                parent: angular.element(document.body),
                clickOutsideToClose: false
            }).then(function(ob) {
                el.question = ob.question;
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

        function deleteQuestion(el) {
            // TODO: quite the hack, need a solution without angularfire-resource
            vm.elements.$remove(el);
            var elRef = Ref.child('resources').child(el.$id);
            elRef.remove();
        }

        function answerQuestion(el) {
            if (!el.answer || el.toggle) {
                // element has no answer or it answer is being displayed
                $mdDialog.show({
                    locals: {$resourceElement: {answer: el.answer}},
                    controller: QuestionEditController,
                    controllerAs: 'vm',
                    templateUrl: 'app/resources/question.answer.html',
                    parent: angular.element(document.body),
                    clickOutsideToClose: false
                }).then(function(ob) {
                    el.answer = ob.answer;
                    el.toggle = true;
                    el.$save()
                        .then(function(res) {
                            logger.success('Changes have been saved');
                        }, function(reason) {
                            logger.error(reason);
                        });
                }, function() {
                    logger.warning('Action was canceled');
                });
            } else if (!el.toggle) {
                el.toggle = true;
                el.$save();
            }
        }

        function hideAnswer(el) {
            el.toggle = false;
            el.$save();
        }

        function searchQuestions(search) {
            vm.elements = $filter('filter')($resourceElements, search);
        }
    }

    QuestionCreateController.$inject = ['$scope', '$mdDialog', 'Resource'];
    /* @ngInject */
    function QuestionCreateController($scope, $mdDialog, Resource) {
        var vm = this;

        vm.resource = null;
        vm.add = add;
        vm.cancel = cancel;
        vm.editorLoad = editorLoad;

        activate();

        function activate() {
            vm.resource = Resource.$new();
            vm.resource.front = '';
            vm.resource.back = '';
        }

        function editorLoad(_editor) {
            _editor.focus();
        }

        function add() {
            $mdDialog.hide(vm.resource);
        }

        function cancel() {
            $mdDialog.cancel();
        }
    }

    QuestionEditController.$inject = ['$scope', '$mdDialog', '$resourceElement'];
    /* @ngInject */
    function QuestionEditController($scope, $mdDialog, $resourceElement) {
        var vm = this;

        vm.resource = null;
        vm.save = save;
        vm.cancel = cancel;
        vm.editorLoad = editorLoad;

        activate();

        function activate() {
            vm.resource = $resourceElement;
        }

        function editorLoad(_editor) {
            _editor.$blockScrolling = Infinity;
            _editor.focus();
        }

        function save() {
            $mdDialog.hide(vm.resource);
        }

        function cancel() {
            $mdDialog.cancel();
        }
    }

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
        vm.editorLoad = editorLoad;

        activate();

        function activate() {
            vm.resource = Resource.$new();
            vm.resource.front = '';
            vm.resource.back = '';
        }

        function editorLoad(_editor) {
            _editor.focus();
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
        vm.editorLoad = editorLoad;

        activate();

        function activate() {
            vm.resource = $resourceElement;
        }

        function editorLoad(_editor) {
            _editor.$blockScrolling = Infinity;
            _editor.focus();
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

    CardViewController.$inject = ['$scope', '$elements', '$current'];
    /* @ngInject */
    function CardViewController($scope, $elements, $current) {
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
            vm.total = $elements.length-1;
            resource = $elements[vm.current];
            vm.activeContent = resource.front;
            $scope.$on('keydown:37', function($event) {
                $scope.$apply(function () {
                    if (vm.current > 0) {
                        prev($event);
                    }
                });
            });
            $scope.$on('keydown:38', function($event) {
                $scope.$apply(function () {
                    flip($event);
                });
            });
            $scope.$on('keydown:39', function($event) {
                $scope.$apply(function () {
                    if (vm.current < vm.total) {
                        next($event);
                    }
                });
            });
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

        function prev($event) {
            vm.current--;
            vm.toggle = true;
            resource = $elements[vm.current];
            vm.activeContent = resource.front;
        }

        function next($event) {
            vm.current++;
            vm.toggle = true;
            resource = $elements[vm.current];
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

    CardsListController.$inject = ['$scope', '$resourceElements', '$mdDialog', '$currentUser', 'Ref', 'logger', '$filter'];
    /* @ngInject */
    function CardsListController($scope, $resourceElements, $mdDialog, $currentUser, Ref, logger, $filter) {
        var vm = this;

        vm.elements = [];
        vm.search = '';
        vm.addCard = addCard;
        vm.viewCard = viewCard;
        vm.editCard = editCard;
        vm.deleteCard = deleteCard;

        activate();

        function activate() {
            vm.elements = $resourceElements;
            $scope.$on('keydown:13', function($event, ev) {
                $scope.$apply(function () {
                    ev.target.blur();
                    searchCards(vm.search);
                });
            });
            $scope.$watch('vm.search', function(newValue, oldValue) {
                if (newValue === '' && oldValue.length > 0) {
                    vm.elements = $resourceElements;
                }
            });
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
                locals: {$elements: vm.elements, $current: $index},
                controller: CardViewController,
                controllerAs: 'vm',
                templateUrl: 'app/resources/card.view.html',
                parent: angular.element(document.body),
                clickOutsideToClose: true
            });
        }

        function editCard (el) {
            $mdDialog.show({
                locals: {$resourceElement: {front: el.front, back: el.back}},
                controller: CardEditController,
                controllerAs: 'vm',
                templateUrl: 'app/resources/card.edit.html',
                parent: angular.element(document.body),
                clickOutsideToClose: false
            }).then(function(ob) {
                el.front = ob.front;
                el.back = ob.back;
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

        function searchCards(search) {
            vm.elements = $filter('filter')($resourceElements, search);
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
