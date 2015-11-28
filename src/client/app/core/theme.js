(function() {
    'use strict';

    angular
        .module('app.core')
        .config(themeConfig);

    themeConfig.$inject = ['$mdThemingProvider'];
    /* @ngInject */
    function themeConfig($mdThemingProvider) {
        $mdThemingProvider
            .theme('default')
            .primaryPalette('brown')
            .warnPalette('orange')
            .accentPalette('deep-purple');
    }
})();
