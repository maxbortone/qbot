(function() {
    'use strict';
    angular
        .module('app.course')
        .factory('Course', Course);

    Course.$inject = ['$q', '$firebaseObject', '$firebaseArray', 'Ref', 'FireResource'];
    /* @ngInject */
    function Course($q, $firebaseObject, $firebaseArray, Ref, FireResource) {
        return FireResource(Ref.child('courses'))
            .hasOne('user', {inverseOf: false});
    }
})();
