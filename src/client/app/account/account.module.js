(function() {
    'use strict';
    angular
    .module('app.account', ['ngMaterial', 'firebase', 'firebase.auth', 'app.user', 'blocks.logger'])
    .controller('Account', Account);

    Account.$inject = ['$scope', 'user', 'Auth', '$firebaseObject', '$mdDialog', 'UserService', 'logger'];
    /* @ngInject */
    function Account($scope, user, Auth, $firebaseObject, $mdDialog, UserService, logger) {
        var vm = this;

        vm.user = {};
        vm.contacts = [];
        vm.profile = {};
        vm.modifyEmail = false;
        vm.modifyPassword = false;
        vm.changePassword = changePassword;
        vm.changeEmail = changeEmail;
        vm.addContactDialog = addContactDialog;

        activate();

        function activate() {
            vm.user = user;
            var profile = UserService.getProfile(user.uid);
            profile.$bindTo($scope, 'vm.profile');
            vm.contacts = UserService.getContacts(user.uid);
        }

        function changePassword(oldPass, newPass, confirm) {
            vm.err = null;
            if( !oldPass || !newPass ) {
                logger.error('Please enter all fields');
            }
            else if( newPass !== confirm ) {
                logger.error('Passwords do not match');
            }
            else {
                Auth.$changePassword({email: vm.profile.email, oldPassword: oldPass, newPassword: newPass})
                .then(function() {
                    vm.modifyPassword = false;
                    vm.newPass = null;
                    vm.oldPass = null;
                    vm.confirm = null;
                    logger.success('Password changed');
                }, function(reason) {
                    logger.error(reason);
                });
            }
        }

        function changeEmail(pass, newEmail) {
            console.log('changing email: ' + pass + ', ' + newEmail + ', ' + vm.profile.email);
            vm.err = null;
            Auth.$changeEmail({password: pass, newEmail: newEmail, oldEmail: vm.profile.email})
            .then(function() {
                vm.profile.email = newEmail;
                vm.profile.$save();
                vm.modifyEmail = false;
                vm.pass = null;
                vm.newEmail = null;
                logger.success('Email changed');
            }, function(reason) {
                logger.error(reason);
            });
        }

        function addContactDialog($event) {
            var parentEl = angular.element(document.body);
            $mdDialog.show({
                parent: parentEl,
                targetEvent: $event,
                template: '<md-dialog aria-label="Add contact dialog">' +
                ' <md-dialog-content>' +
                '   <md-input-container md-no-float >' +
                '     <md-icon>email</md-icon>' +
                '     <input ng-model="dl.email" type="email" placeholder="Email">' +
                '   </md-input-container>' +
                '   <p ng-if="dl.message">{{dl.message}}</p>' +
                '  </md-dialog-content>' +
                ' <div class="md-actions">' +
                '   <md-button ng-click="dl.addContact(dl.email)" class="md-primary">' +
                '     Add' +
                '   </md-button>' +
                '   <md-button ng-click="dl.closeDialog()" class="md-warn">' +
                '     Cancel' +
                '   </md-button>' +
                ' </div>' +
                '</md-dialog>',
                controller: Dialog,
                controllerAs: 'dl'
            });

            function Dialog($mdDialog) {
                var dl = this;
                dl.addContact = addContact;
                dl.closeDialog = closeDialog;
                dl.email = '';
                dl.message = '';

                function addContact(email) {
                    UserService.addContact(user.uid, email)
                    .then(function(data) {
                        closeDialog();
                        logger.success('Contact added!');
                    }, function(reason) {
                        dl.message = reason;
                    });
                }

                function closeDialog() {
                    $mdDialog.hide();
                }
            }
        }
    }
})();
