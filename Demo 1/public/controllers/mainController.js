(function() {
    angular
        .module('MyApp')
        .controller('MainController', MainController);

    function MainController($http, $scope) {
        $http.get('/')
            .then(function() {
                $scope.myName = "Aadesh";
            });
    }
})();