(function() {
    'use strict';
    angular
        .module('app.notes')
        .service('NotesService', NotesService);

    NotesService.$inject = ['$http', 'logger'];
    /* @ngInject */
    function NotesService($http, logger) {
        var service = {};

        service.getNotes = getNotes;
        service.getNote = getNote;
        service.getNotesBySubject = getNotesBySubject;
        service.getSubjects = getSubjects;

        return service;

        function getNotes() {
            return $http.get('api/notes')
                .then(function(response) {
                    return response.data;
                })
                .catch(function(error) {
                    logger.error('XHR Failed for getNotes: ' + error.data);
                });
        }

        function getNote(id) {
            return $http.get('api/note/' + id)
                .then(function(response) {
                    return response.data;
                })
                .catch(function(error) {
                    logger.error('XHR Failed for getNote: ' + error.data);
                });
        }

        function getNotesBySubject(subject) {
            return $http.get('api/notes/' + subject)
                .then(function(response) {
                    return response.data;
                })
                .catch(function(error) {
                    logger.error('XHR Failed for getNotesBySubject: ' + error.data);
                });
        }

        function getSubjects() {
            return $http.get('api/subjects')
                .then(function(response) {
                    return response.data;
                })
                .catch(function(error) {
                    logger.error('XHR Failed for getSubjects: ' + error.data);
                });
        }
    }
})();
