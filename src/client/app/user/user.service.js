(function() {
    'use strict';
    angular
        .module('app.user')
        .factory('User', User);

    User.$inject = ['$q', '$firebaseObject', '$firebaseArray', 'Ref', 'FireResource'];
    /* @ngInject */
    function User($q, $firebaseObject, $firebaseArray, Ref, FireResource) {
        return FireResource(Ref.child('users'), function() {
            this.hasMany('courses');
            this.hasMany('contacts', {className: 'User'});
            this.hasOne('displayedCourse', {className: 'Course', inverseOf: false, foreignKey: 'displayedCourseId'});
            this.afterSave(function(user) {
                user.$$conf.ref.setPriority(user.email, function() {
                    console.log('Priority ' + user.email + ' set');
                });
            });
            this.prototype.addContact = function(email) {
                var user = this;
                var def = $q.defer();
                var usersRef = Ref.child('users');
                usersRef.equalTo(email).limitToFirst(1).once('value', function(snapshot) {
                    if (snapshot.exists()) {
                        var alreadyExists = false;
                        var data = snapshot.val();
                        var cid = Object.keys(data)[0];
                        var contactsRef = Ref.child('users/' + user.$id + '/contacts');
                        contactsRef.once('value', function(contacts) {
                            contacts.forEach(function(contact) {
                                if (contact.key() === cid) {
                                    alreadyExists = true;
                                }
                            });
                            if (alreadyExists) {
                                def.reject('Contact already exists');
                            } else {
                                contactsRef.child(cid).set(true, function(error) {
                                    if (error) {
                                        def.reject(error);
                                    } else {
                                        def.resolve();
                                    }
                                });
                            }
                        });
                    } else {
                        def.reject('Email not found');
                    }
                });
                return def.promise;
            };
        });
    }
})();
