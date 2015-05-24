'use strict';

var app = angular.module('contacts', []);

app.controller('ContactsListCtrl', ['$scope', function($scope) {

    var addTelUri = function(contact) {
        var tel = contact.tel.replace(/[\s\-._]/g, '');
        if (tel.length > 2 && tel[0] == '0' && tel[1] == '0') {
            /* Numéro international. */
            contact.telUri = 'tel:+' + tel.substring(2);
        } else if (tel.length == 10 && tel[0] == '0') {
            /* Numéro français. */
            contact.telUri = 'tel:+33-' + tel.substring(1);
        } else {
            /* Format non reconnu, on laisse le numéro tel quel. */
            contact.telUri = 'tel:' + tel;
        }
    }

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
        addTelUri($scope.contacts[i]);
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
            addTelUri($scope.newContact);
            $scope.contacts.push($scope.newContact);
            $scope.newContact = {};
        }
    };
}]);
