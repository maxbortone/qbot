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
        service.getNotesByCourse = getNotesByCourse;
        service.getCourses = getCourses;
        service.getCourse = getCourse;

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

        function getNotesByCourse(course) {
            return $http.get('api/notes/' + course)
                .then(function(response) {
                    return response.data;
                })
                .catch(function(error) {
                    logger.error('XHR Failed for getNotesByCourse: ' + error.data);
                });
        }

        function getCourses() {
            return $http.get('api/courses')
                .then(function(response) {
                    return response.data;
                })
                .catch(function(error) {
                    logger.error('XHR Failed for getCourses: ' + error.data);
                });
        }

        function getCourse(id) {
            return $http.get('api/course/' + id)
                .then(function(response) {
                    return response.data;
                })
                .catch(function(error) {
                    logger.error('XHR Failed for getCourse: ' + error.data);
                });
        }
    }
})();
