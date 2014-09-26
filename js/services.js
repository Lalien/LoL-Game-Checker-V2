'use strict';

/* Services */

var lolServices = angular.module('lolServices', ['ngResource']);

lolServices.factory('Summoner', ['$resource', function($resource) {
	return $resource('https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/:summonerName?api_key=7ea34bd9-1733-4cb5-91dc-fdaddd734139', {}, {
		query: {method: 'GET', params:{summonerName: 'summonerId'}, isArray: false}
	});
}]);

lolServices.factory('Game', ['$resource', function($resource) {
	return $resource('https://na.api.pvp.net/api/lol/na/v1.3/game/by-summoner/:summonerId/recent?api_key=7ea34bd9-1733-4cb5-91dc-fdaddd734139', {}, {
		query: {method: 'GET', params:{summonerId: 'summonerId'}, isArray: false}
	});
}]);

lolServices.factory('Details', ['$resource', function($resource) {
	return $resource('https://na.api.pvp.net/api/lol/na/v2.2/match/:matchId?api_key=7ea34bd9-1733-4cb5-91dc-fdaddd734139', {}, {
		query: {method: 'GET', params:{matchId: 'matchId'}, isArray: false}
	});
}]);