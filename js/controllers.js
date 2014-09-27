var lolControllers = angular.module('lolCtrls', []);

lolControllers.controller('GameHome', ['$scope', '$http', 'Summoner', 'Game', function($scope, $http, Summoner, Game) {
  $scope.findSummoner = function(name) {
    var query = name.name;
    Summoner.query({summonerName: query}, function(summoner) {
      Game.query({summonerId: firstMember(summoner).id}, function(games) {
        var champion_names = [];
        $('#summoner-games').show().fadeIn();
        $scope.champion = games.games.slice(0,10);
        $scope.summoner_id = games.summonerId;
        $scope.games = games.games;
      });
    });
  };
}]);

lolControllers.controller('GameDetailCtrl', ['$scope', '$http', '$routeParams', 'Details', function($scope, $http, $routeParams, Details) {
  Details.query({matchId: $routeParams.gameId}, function(game) {
    $scope.summoner_id = $routeParams.summonerId;
    $scope.champion = game.participants.slice(0,10);
    $scope.players = game.participants;
  });

  $scope.comparePlayers = function(player1, player2) {
    $scope.player1 = player1;
  }
}]);

lolControllers.controller('GameCollector', ['$scope', '$http', '$routeParams', 'Game',  function($scope, $http, $routeParams, Game) {
  Game.query({summonerId: $routeParams.summonerId}, function(games) {
    $scope.summoner_id = $routeParams.summonerId;
		$scope.champion = games.games.slice(0,10);
    $scope.games = games.games;
	});
}]);