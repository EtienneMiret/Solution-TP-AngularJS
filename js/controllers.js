'use strict';

var controllers = angular.module('controllers', ['services']);

controllers.controller('ContactsListCtrl', ['$scope', 'uriGenerator', function($scope, uriGenerator) {

    $scope.contacts = [
        {
            firstName: 'Olivier',
            lastName: 'Dupont',
            email: 'olivier.dupont@groupehn.com',
            tel: '01 23 45 67 89'
        },
        {
            firstName:'Archibald',
            lastName: 'Haddock',
            email: 'capitaine.haddock@herge.be',
            tel: '0 899 708 708'
        },
        {
            firstName: 'Achile',
            lastName: 'Talon',
            email: 'achiletalon@polite.be',
            tel: '09 87 65 43 21'
        }
    ];

    for (var i = 0; i < $scope.contacts.length; i++) {
        $scope.contacts[i].telUri = uriGenerator.tel($scope.contacts[i].tel);
    }

    $scope.remove = function(contact) {
        $scope.contacts.splice($scope.contacts.indexOf(contact), 1);
    };

    $scope.newContact = {};

    $scope.add = function() {
        if ($scope.newContact.firstName
                && $scope.newContact.lastName
                && $scope.newContact.email
                && $scope.newContact.tel) {
            $scope.newContact.telUri = uriGenerator.tel($scope.newContact.tel);
            $scope.contacts.push($scope.newContact);
            $scope.newContact = {};
        }
    };
}]);
