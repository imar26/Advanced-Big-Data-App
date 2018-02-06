(function() {
    angular
        .module('MyApp')
        .service('MainService', MainService);

    function MainService($http) {
        var api = {
            'getCall': getCall
        };
        return api;

        function getCall() {
            return $http.get('/');
        }
    }
})();