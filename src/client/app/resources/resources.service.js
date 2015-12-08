(function() {
    'use strict';
    angular
        .module('app.resources')
        .factory('Resource', Resource);

    Resource.$inject = ['$q', '$firebaseObject', '$firebaseArray', 'Ref', 'FireResource'];
    /* @ngInject */
    function Resource($q, $firebaseObject, $firebaseArray, Ref, FireResource) {
        return FireResource(Ref.child('resources'), function() {
            this.hasOne('course', {inverseOf: false});
            this.hasOne('user', {inverseOf: false});
        });
    }
})();
