(function() {
    'use strict';

    angular
        .module('app.login')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'course',
                config: {
                    url: '/',
                    templateUrl: 'app/course/course.html',
                    controller: 'CourseController',
                    controllerAs: 'vm',
                    authenticate: true
                }
            }
        ];
    }
})();
