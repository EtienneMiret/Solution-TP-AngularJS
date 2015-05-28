'use strict';

var controllers = angular.module('controllers', ['ngRoute', 'services']);

controllers.controller('ContactsListCtrl', ['$scope', 'Contact', function($scope, Contact) {
    $scope.contacts = Contact.query();
}]);

controllers.controller('ContactsDetailCtrl', ['$scope', '$location', '$routeParams', 'Contact', 'uriGenerator', function ($scope, $location, $routeParams, Contact, uriGenerator) {
    $scope.contact = Contact.get($routeParams, function() {
        $scope.contact.telUri = uriGenerator.tel($scope.contact.tel);
    });
    $scope.delete = function() {
        $scope.contact.$delete({}, function() {
            $location.path('/');
        });
    };
}]);

controllers.controller('ContactsEditCtrl', ['$scope', '$location', '$routeParams', 'Contact', function($scope, $location, $routeParams, Contact) {
    $scope.contact = Contact.get($routeParams);
    $scope.save = function() {
        $scope.contact.$save({}, function() {
            $location.path('/' + $scope.contact.id);
        });
    };
}]);

controllers.controller('ContactsNewCtrl', ['$scope', '$location', 'Contact', function($scope, $location, Contact) {
    $scope.contact = new Contact();
    $scope.save = function() {
        $scope.contact.$save({}, function() {
            $location.path('/' + $scope.contact.id);
        });
    };
}]);
