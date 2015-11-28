(function() {
  'use strict';
  angular.module('blocks.filters', [])
    .filter('reverse', function() {
      return function(items) {
        return angular.isArray(items) ? items.slice().reverse() : [];
      };
  });
})();
