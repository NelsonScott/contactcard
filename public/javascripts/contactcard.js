var app = angular.module('Contactcard', ['ngResource', 'ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'partials/home.html'
    })
    .when('/new-card', {
      templateUrl: 'partials/new-card.html',
      controller: 'newCardCtrl'
    });
}]);

app.controller('newCardCtrl', ['$scope', '$resource', '$location',
  function($scope, $resource, $location) {
    $scope.save = function () {
      var Cards = $resource('/api/cards');
      Cards.save($scope.card, function() {
        console.log('Successful save.');
      });
    };
  }]);
