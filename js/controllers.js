'use strict';

var controllers = angular.module('controllers', ['services']);

controllers.controller('ContactsListCtrl', ['$scope', 'Contact', function($scope, Contact) {

    $scope.contacts = Contact.query();

    $scope.remove = function(contact) {
        contact.$delete({}, function() {
            $scope.contacts = Contact.query();
        });
    };

    $scope.newContact = new Contact();

    $scope.add = function() {
        if ($scope.newContact.firstName
                && $scope.newContact.lastName
                && $scope.newContact.email
                && $scope.newContact.tel) {
            $scope.newContact.$save({}, function() {
                $scope.newContact = new Contact();
                $scope.contacts = Contact.query();
            });
        }
    };
}]);
