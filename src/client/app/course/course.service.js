(function() {
    'use strict';
    angular
        .module('app.course')
        .factory('Course', Course);

    Course.$inject = ['$q', '$firebaseObject', '$firebaseArray', 'Ref', 'FireResource'];
    /* @ngInject */
    function Course($q, $firebaseObject, $firebaseArray, Ref, FireResource) {
        return FireResource(Ref.child('courses'), function() {
            this.hasMany('notes', {className: 'Resource'});
            this.hasMany('definitions', {className: 'Resource'});
            this.hasMany('cards', {className: 'Resource'});
            this.hasOne('user', {inverseOf: false});
            this.prototype.incrementResourceCount = function(type) {
                var cid = this.$id;
                var countRef = Ref.child('courses/' + cid + '/' + type + 's/count');
                countRef.transaction(function(count) {
                    return count+1;
                });
            };
        });
    }
})();
