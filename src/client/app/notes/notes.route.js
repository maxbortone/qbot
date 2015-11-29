(function() {
    'use strict';

    angular
        .module('app.notes')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'notes',
                config: {
                    url: '/notes',
                    title: 'Notes',
                    templateUrl: 'app/notes/notes.html',
                    controller: 'Notes',
                    controllerAs: 'vm',
                    authenticate: true,
                    resolve: {
                        user: ['Auth', function(Auth) {
                            return Auth.$requireAuth();
                        }]
                    }
                }
            },
            {
                state: 'notes.create',
                config: {
                    url: '/create',
                    title: 'Create a new note',
                    templateUrl: 'app/notes/notes.create.html',
                    controller: 'NotesCreate',
                    controllerAs: 'vm',
                    authenticate: true,
                    resolve: {
                        user: ['Auth', function(Auth) {
                            return Auth.$requireAuth();
                        }]
                    }
                }
            },
            {
                state: 'notes.detail',
                config: {
                    url: '/:noteCourse/:noteId',
                    templateUrl: 'app/notes/notes.detail.html',
                    controller: 'NotesDetail',
                    controllerAs: 'vm',
                    authenticate: true,
                    resolve: {
                        user: ['Auth', function(Auth) {
                            return Auth.$requireAuth();
                        }]
                    }
                }
            }
        ];
    }
})();
