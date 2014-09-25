'use strict';

/* Controllers */
function firstMember (obj) {
  for(var i in obj) 
      if (obj.hasOwnProperty(i)){ // exclude properties from the prototype
          return obj[i];
      }
}
var summoner_id;
var lolControllers = angular.module('lolCtrls', []);

lolControllers.controller('GameHome', ['$scope', '$http', function($scope, $http) {
  $scope.findSummoner = function(name) {
    var query = name.name;
    $http.get('https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/' + name.name + '?api_key=7ea34bd9-1733-4cb5-91dc-fdaddd734139').success(function(data) {
      summoner_id = firstMember(data).id;
      console.log(summoner_id);
      $http.get('https://na.api.pvp.net/api/lol/na/v1.3/game/by-summoner/'+ summoner_id +'/recent?api_key=7ea34bd9-1733-4cb5-91dc-fdaddd734139').success(function(data) {
        $('#summoner-games').show();
        console.log(data);
        var champion_names = [];
        for (var i = 0; i < 10; i++) {
          champion_names[i] = fetchChampion(data.games[i].championId);
          console.log(champion_names[i]);
        }
        $scope.summoner_id = summoner_id;
        $scope.champion = champion_names;
        $scope.games = data.games;
        $scope.imageBase = 'img/champions/';
        $scope.imageType = '.png';        
      });
    });
  }

  $scope.gatherInformation = function() {
    console.log("Hey?")
    e.preventDefault();
    var query = id;
    $('#game-details').show();
    $http.get('https://na.api.pvp.net/api/lol/na/v2.2/match/'+ query +'?api_key=7ea34bd9-1733-4cb5-91dc-fdaddd734139').success(function(data) {
      var champion_names = [];
      var champion_teams = [];

      for (var i = 0; i < 10; i++) {
        champion_names[i] = fetchChampion(data.games[i].championId);
        console.log(champion_names[i]);
      }

      for (var i = 0; i < 10; i++) {
        if (data.participants[i].teamId == 100) {
          champion_teams[i] = "bg-info";
        } else {
          champion_teams[i] = "bg-danger";
        }
      }
      $scope.team = champion_teams;
      $scope.champion_details = champion_names;
      $scope.games_details = data.games;
      $scope.imageBase_details = 'img/champions/';
      $scope.imageType_details = '.png';
    });
  };
}]);

lolControllers.controller('GameCollector', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {
	$http.get('https://na.api.pvp.net/api/lol/na/v1.3/game/by-summoner/'+ $routeParams.summonerId +'/recent?api_key=7ea34bd9-1733-4cb5-91dc-fdaddd734139').success(function(data) {
    console.log($routeParams.summonerName);
    var champion_names = [];
    for (var i = 0; i < 10; i++) {
      champion_names[i] = fetchChampion(data.games[i].championId);
      console.log(champion_names[i]);
    }
    $scope.summoner_id = $routeParams.summonerId;
		$scope.champion = champion_names;
    $scope.games = data.games;
    $scope.imageBase = 'img/champions/';
    $scope.imageType = '.png';
	});
}]);

lolControllers.controller('GameDetailCtrl', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {
  $http.get('https://na.api.pvp.net/api/lol/na/v2.2/match/'+ $routeParams.gameId +'?includeTimeline=false&api_key=7ea34bd9-1733-4cb5-91dc-fdaddd734139'). success(function(data) {
    var champion_names = [];
    var champion_teams = [];
    console.log($routeParams.summonerId);

    for (var i = 0; i < 10; i++) {
      champion_names[i] = fetchChampion(data.participants[i].championId);
      console.log(champion_names[i]);
    }

    for (var i = 0; i < 10; i++) {
      if (data.participants[i].teamId == 100) {
        champion_teams[i] = "bg-info";
      } else {
        champion_teams[i] = "bg-danger";
      }
    }
    $scope.summoner_id = $routeParams.summonerId;
    $scope.champion = champion_names;
    $scope.team = champion_teams;
    $scope.players = data.participants;
    $scope.imageBase = 'img/champions/';
    $scope.imageType = '.png';
  });
}]);

