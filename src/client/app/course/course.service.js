(function() {
    'use strict';
    angular
        .module('app.course')
        .factory('Course', Course);

    Course.$inject = ['$q', '$firebaseObject', '$firebaseArray', 'Ref', 'FireResource'];
    /* @ngInject */
    function Course($q, $firebaseObject, $firebaseArray, Ref, FireResource) {
        return new FireResource(Ref.child('courses'), function() {
            this.hasMany('notes', {className: 'Resource'});
            this.hasMany('definitions', {className: 'Resource'});
            this.hasMany('cards', {className: 'Resource'});
            this.hasOne('user', {inverseOf: false});
        });
    }
})();
