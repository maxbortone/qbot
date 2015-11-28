(function() {
    'use strict';
    angular
        .module('app.notes')
        .controller('Notes', Notes)
        .controller('NotesCreate', NotesCreate)
        .controller('NotesDetail', NotesDetail);

    Notes.$inject = ['$scope', '$location', '$http', 'user', 'logger', 'UserService', 'NotesService'];
    /* @ngInject */
    function Notes($scope, $location, $http, user, logger, UserService, NotesService) {
        var vm = this;

        vm.user = null;
        vm.subjects = [];
        vm.notes = [];
        vm.loadTab = loadTab;

        activate();

        function activate() {
            vm.user = user;
            return getSubjects().then(function() {
                logger.success('Notes view activated');
            });
        }

        function getSubjects() {
            return NotesService.getSubjects()
                .then(function(data) {
                    vm.subjects = data;
                    return vm.subjects;
                });
        }

        function loadTab(subject) {
            getNotesBySubject(subject);
        }

        function getNotesBySubject(subject) {
            return NotesService.getNotesBySubject(subject)
                .then(function(data) {
                    vm.notes = data;
                    return vm.notes;
                });
        }
    }

    NotesCreate.$inject = ['$scope', '$http', 'user', 'logger', 'UserService', 'NotesService'];
    /* @ngInject */
    function NotesCreate($scope, $http, user, logger, UserService, NotesService) {
        var vm = this;

        vm.user = null;
        vm.newNote = [];

        activate();

        function activate() {
        }
    }

    NotesDetail.$inject = ['$scope', '$http', '$stateParams', 'user', 'logger', 'UserService', 'NotesService'];
    /* @ngInject */
    function NotesDetail($scope, $http, $stateParams, user, logger, UserService, NotesService) {
        var vm = this;

        vm.user = null;
        vm.subject = '';
        vm.note = [];

        activate();

        function activate() {
            vm.user = user;
            vm.subject = $stateParams.noteSubject;
            return getNote($stateParams.noteId).then(function() {
                logger.success('Note detail view activated');
            });
        }

        function getNote(id) {
            return NotesService.getNote(id)
                .then(function(data) {
                    vm.note = data;
                    return vm.note;
                });
        }
    }
})();
