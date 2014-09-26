'use strict';

function firstMember (obj) {
  for(var i in obj) 
      if (obj.hasOwnProperty(i)){ // exclude properties from the prototype
          return obj[i];
      }
}

var lolControllers = angular.module('lolCtrls', []);

lolControllers.controller('GameHome', ['$scope', '$http', 'Summoner', 'Game', function($scope, $http, Summoner, Game) {
  $scope.findSummoner = function(name) {
    var query = name.name;
    Summoner.query({summonerName: query}, function(summoner) {
      Game.query({summonerId: firstMember(summoner).id}, function(games) {
        var champion_names = [];
        $('#summoner-games').show().fadeIn();
        for (var i = 0; i < 10; i++) {
          champion_names[i] = fetchChampion(games.games[i].championId);
        }
        $scope.summoner_id = games.summonerId;
        $scope.champion = champion_names;
        $scope.games = games.games;
        $scope.imageBase = 'img/champions/';
        $scope.imageType = '.png';
      });
    });
  };
}]);

lolControllers.controller('GameDetailCtrl', ['$scope', '$http', '$routeParams', 'Details', function($scope, $http, $routeParams, Details) {
  Details.query({matchId: $routeParams.gameId}, function(game) {
    var champion_names = [];
    var champion_teams = [];
    
    for (var i = 0; i < 10; i++) {
      champion_names[i] = fetchChampion(game.participants[i].championId);
    }

    for (var i = 0; i < 10; i++) {
      if (game.participants[i].teamId == 100) {
        champion_teams[i] = "bg-info";
      } else {
        champion_teams[i] = "bg-danger";
      }
    }
    $scope.summoner_id = $routeParams.summonerId;
    $scope.champion = champion_names;
    $scope.team = champion_teams;
    $scope.players = game.participants;
    $scope.imageBase = 'img/champions/';
    $scope.imageType = '.png';
  });
}]);

lolControllers.controller('GameCollector', ['$scope', '$http', '$routeParams', 'Game',  function($scope, $http, $routeParams, Game) {
  Game.query({summonerId: $routeParams.summonerId}, function(games) {
    var champion_names = [];
    for (var i = 0; i < 10; i++) {
      champion_names[i] = fetchChampion(games.games[i].championId);
    }
    $scope.summoner_id = $routeParams.summonerId;
		$scope.champion = champion_names;
    $scope.games = games.games;
    $scope.imageBase = 'img/champions/';
    $scope.imageType = '.png';
	});
}]);