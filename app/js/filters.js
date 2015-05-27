'use strict';

var filters = angular.module('filters', ['services']);

filters.filter('relativeTime', ['dateFilter', function(dateFilter) {
    return function(input, now) {
        var result;
        if (input) {
            var date = new Date(input);
            var difference = now.getTime() - date.getTime(); // Écart en millisecondes.
            if (difference < 2000) { // Moins de 2 secondes.
                result = '\u00c0 l\u2019instant.';
            } else if (difference < 60 * 1000) { // Moins d’une minute.
                result = 'Il y a ' + Math.floor(difference / 1000) + ' secondes.';
            } else if (difference < 120 * 1000) { // Moins de deux minutes.
                result = 'Il y a une minute.';
            } else if (difference < 3600 * 1000) { // Moins d’une heure.
                result = 'Il y a ' + Math.floor(difference / 60000) + ' minutes.';
            } else if (now.getFullYear() == date.getFullYear() && now.getMonth() == date.getMonth() && now.getDate() == date.getDate()) { // Aujourd’hui.
                result = 'Aujourd\u2019hui \u00e0 ' + dateFilter(date, "HH'h'mm'.'");
            } else {
                result = dateFilter(date, "'Le 'dd'/'MM'/'yyyy' \u00e0 'HH'h'mm'.'");
            }
        } else {
            result = '';
        }
        return result;
    }
}]);

filters.filter('telUri', ['uriGenerator', function(uriGenerator) {
    return function(input) {
        if (input) {
            return uriGenerator.tel(input);
        } else {
            return '';
        }
    };
}]);
