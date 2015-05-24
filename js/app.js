'use strict';

var app = angular.module('contacts', ['ngRoute', 'controllers']);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'views/list.html',
            controller: 'ContactsListCtrl'
        })
        .when('/:id', {
            templateUrl: 'views/detail.html',
            controller: 'ContactsDetailCtrl'
        })
        .when('/:id/edit', {
            templateUrl: 'views/edit.html',
            controller: 'ContactsEditCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
}]);
