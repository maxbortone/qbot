(function() {
  'use strict';
  angular.module('blocks.directives', ['firebase.auth'])
    /**
     * @ngdoc function
     * @name blocks.directive:ngShowAuth
     * @description
     * # ngShowAuthDirective
     * A directive that shows elements only when user is logged in. It also waits for Auth
     * to be initialized so there is no initial flashing of incorrect state.
     */
    .directive('ngShowAuth', ['Auth', '$timeout', function (Auth, $timeout) {
      return {
        restrict: 'A',
        link: function(scope, el) {
          el.addClass('ng-cloak'); // hide until we process it

          function update() {
            // sometimes if ngCloak exists on same element, they argue, so make sure that
            // this one always runs last for reliability
            $timeout(function () {
              el.toggleClass('ng-cloak', !Auth.$getAuth());
            }, 0);
          }

          Auth.$onAuth(update);
          update();
        }
      };
    }])

    /**
     * @ngdoc function
     * @name blocks.directive:ngHideAuth
     * @description
     * # ngHideAuthDirective
     * A directive that shows elements only when user is logged out. It also waits for Auth
     * to be initialized so there is no initial flashing of incorrect state.
     */
    .directive('ngHideAuth', ['Auth', '$timeout', function (Auth, $timeout) {
      return {
        restrict: 'A',
        link: function(scope, el) {
          el.addClass('ng-cloak'); // hide until we process it
          function update() {
            // sometimes if ngCloak exists on same element, they argue, so make sure that
            // this one always runs last for reliability
            $timeout(function () {
              el.toggleClass('ng-cloak', !!Auth.$getAuth());
            }, 0);
          }

          Auth.$onAuth(update);
          update();
        }
      };
    }])

    .directive('qbKeyNav', ['$document', '$rootScope', function($document, $rootScope) {
        return {
            restrict: 'A',
            link: function(scope, el, attrs) {
                el.bind('keydown', function(e) {
                    $rootScope.$broadcast('keydown', e);
                    $rootScope.$broadcast('keydown:' + e.which, e);
                });
            }
        };
    }]);
})();
