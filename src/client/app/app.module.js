(function() {
    'use strict';
    angular.module('app', [
        'app.core',

        // app specific
        'app.auth',
        'app.user',
        'app.login',
        'app.account',
        'app.toolbar',
        'app.home',
        'app.course',
        'app.resources'
    ]);
})();
