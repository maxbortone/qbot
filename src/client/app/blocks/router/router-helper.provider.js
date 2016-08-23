/* Help configure the state-base ui.router */
(function() {
    'use strict';

    angular
    .module('blocks.router')
    .provider('routerHelper', routerHelperProvider);

    routerHelperProvider.$inject = ['$locationProvider', '$stateProvider', '$urlRouterProvider'];
    /* @ngInject */
    function routerHelperProvider($locationProvider, $stateProvider, $urlRouterProvider) {
        /* jshint validthis:true */
        var config = {
            docTitle: undefined,
            resolveCurrentUser: {
                $currentUser: ['$q', 'Auth', 'User', function($q, Auth, User) {
                    var def = $q.defer();
                    Auth.$requireAuth()
                        .then(function(authData) {
                            if (authData) {
                                User.$find(authData.uid).$loaded().then(function(user) {
                                    def.resolve(user);
                                });
                            }
                        })
                        .catch(function(error) {
                            def.reject(error);
                        });
                    return def.promise;
                }]
            },
            resolvePreviousState: {
                $previousState: ['$state', function($state) {
                    var currentStateData = {
                        name: $state.current.name,
                        params: $state.params,
                        URL: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        };

        $locationProvider.html5Mode(true);

        this.configure = function(cfg) {
            angular.extend(config, cfg);
        };

        this.$get = RouterHelper;
        RouterHelper.$inject = ['$location', '$rootScope', '$state', 'logger', 'Auth'];
        /* @ngInject */
        function RouterHelper($location, $rootScope, $state, logger, Auth) {
            var handlingStateChangeError = false;
            var hasOtherwise = false;
            var stateCounts = {
                errors: 0,
                changes: 0
            };

            var service = {
                configureStates: configureStates,
                getStates: getStates,
                stateCounts: stateCounts
            };

            init();

            return service;

            ///////////////

            function configureStates(states, otherwisePath) {
                states.forEach(function(state) {
                    if (state.config.authenticate) {
                        state.config.resolve = angular.extend(state.config.resolve || {}, config.resolveCurrentUser);
                    }
                    if (state.config.previousState) {
                        state.config.resolve = angular.extend(state.config.resolve || {}, config.resolvePreviousState);
                    }
                    $stateProvider.state(state.state, state.config);
                });
                if (otherwisePath && !hasOtherwise) {
                    hasOtherwise = true;
                    $urlRouterProvider.otherwise(otherwisePath);
                }
            }

            function handleRoutingErrors() {
                // Route cancellation:
                // On routing error, go to the dashboard.
                // Provide an exit clause if it tries to do it twice.
                $rootScope.$on('$stateChangeError',
                function(event, toState, toParams, fromState, fromParams, error) {
                        if (handlingStateChangeError) {
                            return;
                        } else if (error === 'AUTH_REQUIRED') {
                            logger.warning('Access denied, user is not logged in', [toState]);
                            $state.go('login');
                            return;
                        }
                        stateCounts.errors++;
                        handlingStateChangeError = true;
                        var destination = (toState &&
                            (toState.title || toState.name || toState.loadedTemplateUrl)) ||
                            'unknown target';
                        var msg = 'Error routing to ' + destination + '. ' +
                            (error.data || '') + '. <br/>' + (error.statusText || '') +
                            ': ' + (error.status || '');
                        logger.warning(msg, [toState]);
                        $location.path('/');
                    }
                );
            }

            function init() {
                handleRoutingErrors();
                updateDocTitle();
            }

            function getStates() { return $state.get(); }

            function updateDocTitle() {
                $rootScope.$on('$stateChangeSuccess',
                    function(event, toState, toParams, fromState, fromParams) {
                        stateCounts.changes++;
                        handlingStateChangeError = false;
                        var title = config.docTitle + ' ' + (toState.title || '');
                        $rootScope.title = title; // data bind to <title>
                    }
                );
            }
    }
}
})();
