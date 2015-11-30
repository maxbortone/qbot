(function() {
    'use strict';
    angular
        .module('app.course')
        .controller('CourseController', CourseController)

    CourseController.$inject = ['$scope', 'logger', '$currentUser', 'Course'];
    /* @ngInject */
    function CourseController($scope, logger, $currentUser, Course) {
        var vm = this;
        //var uid = $currentUser.$id;

        activate();

        function activate() {
            console.log($currentUser);
        }
    }
})();
