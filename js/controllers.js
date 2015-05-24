'use strict';

var controllers = angular.module('controllers', ['services']);

controllers.controller('ContactsListCtrl', ['$scope', 'Contact', function($scope, Contact) {

    $scope.contacts = Contact.query();

    $scope.remove = function(contact) {
        contact.$delete();
        $scope.contacts = Contact.query();
    };

    $scope.newContact = new Contact();

    $scope.add = function() {
        if ($scope.newContact.firstName
                && $scope.newContact.lastName
                && $scope.newContact.email
                && $scope.newContact.tel) {
            $scope.newContact.$save();
            $scope.newContact = new Contact();
            $scope.contacts = Contact.query();
        }
    };
}]);

controllers.controller('ContactsDetailCtrl', ['$scope', '$location', '$routeParams', 'Contact', 'uriGenerator', function ($scope, $location, $routeParams, Contact, uriGenerator) {
    $scope.contact = Contact.get($routeParams);
    $scope.contact.telUri = uriGenerator.tel($scope.contact.tel);
    $scope.delete = function() {
        $scope.contact.$delete();
        $location.path('/');
    };
}]);

controllers.controller('ContactsEditCtrl', ['$scope', '$location', '$routeParams', 'Contact', function($scope, $location, $routeParams, Contact) {
    $scope.contact = Contact.get($routeParams);
    $scope.save = function() {
        $scope.contact.$save();
        $location.path('/' + $scope.contact.id);
    };
}]);

controllers.controller('ContactsNewCtrl', ['$scope', '$location', 'Contact', function($scope, $location, Contact) {
    $scope.contact = new Contact();
    $scope.save = function() {
        $scope.contact.$save();
        $location.path('/' + $scope.contact.id);
    };
}]);
