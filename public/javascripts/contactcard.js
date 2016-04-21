var app = angular.module('Contactcard', ['ngResource', 'ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'partials/home.html',
      controller: 'homeCtrl'
    })
    .when('/new-card', {
      templateUrl: 'partials/new-card.html',
      controller: 'newCardCtrl'
    })
    .when('/cards/:id', {
      templateUrl: 'partials/card-view.html',
      controller: 'cardCtrl'
    });
}]);

app.directive('card', function() {
  return {
    templateUrl: 'partials/card.html'
  };
});

app.controller('homeCtrl', ['$scope', '$resource',
  function($scope, $resource, $location) {
    var Cards = $resource('api/cards');
    Cards.query(function(cards) {
      $scope.cards = cards;
    });
  }]);

app.controller('newCardCtrl', ['$scope', '$resource', '$location',
  function($scope, $resource, $location) {
    $scope.save = function () {
      var Cards = $resource('/api/cards');
      Cards.save($scope.card, function() {
        $scope.success = true;
      });
    };
  }]);

app.controller('cardCtrl', ['$scope', '$resource', '$location', '$routeParams',
  function($scope, $resource, $location, $routeParams) {
    var Cards = $resource('api/cards/:id');

    Cards.get({ id: $routeParams.id }, function(card) {
      $scope.card = card;
    });

    $scope.delete = function() {
      Cards.delete({ id: $scope.card._id }, function(card){
        $location.path('/');
      });
    };
  }]);
