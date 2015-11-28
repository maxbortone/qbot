/* global toastr:false, moment:false */
(function() {
    'use strict';

    angular
        .module('app.core')
        .constant('toastr', toastr)
        .constant('moment', moment)
        .constant('SECURED_ROUTES', {})
        .constant('loginRedirectPath', '/login')
        .constant('homeRedirectPath', '/');
})();
