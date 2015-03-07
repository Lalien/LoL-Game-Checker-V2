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
		} else if (input == 'RANKED_SOLO_5x5') {
			out = 'Ranked Solo';
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
});

lolFilters.filter('winFilter', function() {
	return function(value) {
		var input = value || '';
		var out = '';
		if (input == true) {
			out = 'win';
		} else {
			out = 'loss';
		}
		return out;
	}
});