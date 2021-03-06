(function () {
    'use strict';

    var config = {
        appErrorPrefix: '[qbot Error] ',
        appTitle: 'qbot'
    };

    angular
        .module('app.core')
        .config(toastrConfig)
        .config(configure)
        .run(katexOptions)
        .value('config', config);

    toastrConfig.$inject = ['toastr'];
    /* @ngInject */
    function toastrConfig(toastr) {
        toastr.options.timeOut = 4000;
        toastr.options.positionClass = 'toast-bottom-right';
    }

    configure.$inject = ['$logProvider', 'routerHelperProvider', 'exceptionHandlerProvider', '$qProvider'];
    /* @ngInject */
    function configure($logProvider, routerHelperProvider, exceptionHandlerProvider, $qProvider) {
        if ($logProvider.debugEnabled) {
            $logProvider.debugEnabled(true);
        }
        exceptionHandlerProvider.configure(config.appErrorPrefix);
        routerHelperProvider.configure({docTitle: config.appTitle + ': '});
        // TODO: handle promise rejections properly
        // see: https://github.com/angular-ui/ui-router/issues/2889
        $qProvider.errorOnUnhandledRejections(false);
    }

    katexOptions.$inject = ['katexConfig'];
    /* @ngInject */
    function katexOptions(katexConfig) {
        katexConfig.defaultOptions.delimiters =
        [
            {left: '$$', right: '$$', display: true},
            {left: '\\[', right: '\\]', display: true},
            {left: '\\(', right: '\\)', display: false},
            {left: '$', right: '$', display: false}
        ];
        katexConfig.defaultOptions.throwOnError = false;
        katexConfig.defaultOptions.errorColor = '#d85';
    }

})();
