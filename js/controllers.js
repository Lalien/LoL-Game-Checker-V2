var lolControllers = angular.module('lolCtrls', []);

lolControllers.controller('GameHome', ['$scope', '$http', 'Summoner', 'Game', function($scope, $http, Summoner, Game) {
  $scope.findSummoner = function(name) {
    var query = name.name;
    Summoner.query({summonerName: query}, function(summoner) {
      Game.query({summonerId: firstMember(summoner).id}, function(games) {
        $('#summoner-games').show().fadeIn();
        $scope.champion = games.games.slice(0,10);
        $scope.summoner_id = games.summonerId;
        $scope.games = games.games;
      });
    },
    function err(error) {
      if (error.status == 0) {
        $scope.summoner_id = $routeParams.summonerId;
        $scope.error =  "The League of Legends API is currently down. Please try again later.";
      } else if (firstMember(error).status_code == 503) {
        $scope.summoner_id = $routeParams.summonerId;
        $scope.error = "An error occured!";
      } 
    });
  };
}]);

lolControllers.controller('GameDetailCtrl', ['$scope', '$http', '$routeParams', 'Details', function($scope, $http, $routeParams, Details) {
  Details.query({matchId: $routeParams.gameId}, function success(game) {
    $scope.summoner_id = $routeParams.summonerId;
    $scope.champion = game.participants.slice(0,10);
    $scope.players = game.participants;
  },
  function err(error) {
    console.log(error);
    if (error.status == 0) {
      $scope.summoner_id = $routeParams.summonerId;
      $scope.error =  "The League of Legends API is currently down. Please try again later.";
    } else if (firstMember(error).status_code == 503) {
      $scope.summoner_id = $routeParams.summonerId;
      $scope.error = "An error occured!";
    }
  });
}]);

lolControllers.controller('GameCollector', ['$scope', '$http', '$routeParams', 'Game',  function($scope, $http, $routeParams, Game) {
  Game.query({summonerId: $routeParams.summonerId}, function(games) {
    $scope.summoner_id = $routeParams.summonerId;
		$scope.champion = games.games.slice(0,10);
    $scope.games = games.games;
	});
}]);
