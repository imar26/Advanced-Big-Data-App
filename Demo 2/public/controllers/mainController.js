(function() {
    angular
        .module('MyApp')
        .controller('MainController', MainController);

    function MainController($http, $scope, MainService) {
        MainService
            .getCall()
            .then(function(response) {
                console.log(response);
            }, function(error) {
                console.log(error);
            });
    }
})();