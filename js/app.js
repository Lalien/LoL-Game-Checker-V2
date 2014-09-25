'use strict';

/* App Module */

var phonecatApp = angular.module('phonecatApp', [
  'ngRoute',
  'lolCtrls'
]);

phonecatApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/lol-home.html',
        controller: 'GameHome',
      }).
      when('/summoner/:summonerId', {
        templateUrl: 'partials/lol-games.html',
        controller: 'GameCollector'
      }).
      when('/:gameId/:summonerId', {
        templateUrl: 'partials/game-details.html',
        controller: 'GameDetailCtrl'
      }).
      otherwise({
        redirectTo: '/'
      });

  }]);
