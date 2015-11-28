(function() {
    'use strict';
    angular
        .module('app.user', ['firebase', 'firebase.ref', 'firebase.auth'])
        .factory('UserService', UserService);

    UserService.$inject = ['$q', '$firebaseObject', '$firebaseArray', 'Ref', 'Auth'];
    /* @ngInject */
    function UserService($q, $firebaseObject, $firebaseArray, Ref, Auth) {
        var service = {};

        service.getProfile = getProfile;
        service.setProfile = setProfile;
        service.getFirstName = getFirstName;
        service.getEmail = getEmail;
        service.getContacts = getContacts;
        service.addContact = addContact;

        return service;

        function getProfile(uid) {
            var profileRef = Ref.child('users/' + uid);
            return $firebaseObject(profileRef);
        }

        function setProfile(user, authData) {
            var def = $q.defer();
            var profileRef = Ref.child('users/' + authData.uid);
            var profile = {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                profileImageURL: authData.password.profileImageURL
            };

            profileRef.setWithPriority(profile, user.email, function(error) {
                if (error) {
                    def.reject(error);
                } else {
                    def.resolve(authData);
                }
            });

            return def.promise;
        }

        function getContacts(uid) {
            var contactsRef = Ref.child('users/' + uid + '/contacts');
            return $firebaseArray(contactsRef);
        }

        function getFirstName(uid) {
            var userNameRef = Ref.child('users/' + uid + '/firstName');
            return $firebaseObject(userNameRef);
        }

        function getEmail(uid) {
            var userEmailRef = Ref.child('users/' + uid + '/email');
            return $firebaseObject(userEmailRef);
        }

        function addContact(uid, email) {
            var def = $q.defer();
            var usersRef = Ref.child('users');
            usersRef.equalTo(email).limitToFirst(1).once('value', function(snapshot) {
                if (snapshot.exists()) {
                    var alreadyExists = false;
                    var data = snapshot.val();
                    var id = Object.keys(data)[0];
                    var contactsRef = Ref.child('users/' + uid + '/contacts');
                    contactsRef.once('value', function(contacts) {
                        contacts.forEach(function(contact) {
                            if (contact.key() === id) {
                                alreadyExists = true;
                            }
                        });
                        if (alreadyExists) {
                            def.reject('Contact already exists');
                        } else {
                            var contact = data[id];
                            contact.name = contact.firstName + ' ' + contact.lastName;
                            contact.status = 'created';
                            delete contact.firstName;
                            delete contact.lastName;
                            contact.uid = id;
                            contactsRef.child(id).set(contact, function(error) {
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
        }
    }
})();
