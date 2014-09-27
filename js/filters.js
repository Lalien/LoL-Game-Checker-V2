'use strict';

/* Filters */
var lolFilters = angular.module('lolFilters', []);

lolFilters.filter('championName', function() {
	return function(id) {
		var out = "";
		out = fetchChampion(id);
		return out;
	}
});

lolFilters.filter('gameType', function() {
	return function(game) {
		var input = game || '';
		var out = '';
		if (input == "ARAM_UNRANKED_5x5") {
			out = "ARAM";
		} else {
			return input;
		}
		return out;
	}
});

lolFilters.filter('championTeam', function() {
	return function(id) {
		var input = id || '';
		var out = '';
		if (input == 100) {
			out = 'bg-info';
		} else {
			out = 'bg-danger'
		}
		return out;
	}
})