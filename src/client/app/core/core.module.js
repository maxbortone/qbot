(function () {
    'use strict';

    angular
        .module('app.core', [
            'ngAnimate', 'ngSanitize', 'ngMaterial',
            'firebase', 'firebase.ref', 'firebase.auth',
            'blocks.directives', 'blocks.filters', 'blocks.exception', 'blocks.logger', 'blocks.router',
            'ui.router', 'ngplus',
            'ui.ace', 'katex'
        ]);
})();
