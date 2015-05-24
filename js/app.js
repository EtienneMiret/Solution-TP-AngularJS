'use strict';

var app = angular.module('contacts', []);

app.factory('uriGenerator', [function() {
    return {
        tel: function(number) {
            number = number.replace(/[\s\-._]/g, '');
            if (number.length > 2 && number[0] == '0' && number[1] == '0') {
                /* Numéro international. */
                return 'tel:+' + number.substring(2);
            } else if (number.length == 10 && number[0] == '0') {
                /* Numéro français */
                return 'tel:+33-' + number.substring(1);
            } else {
                /* Format non reconnu, on laisse le numéro tel quel. */
                return 'tel:' + number;
            }
        }
    }
}]);

app.controller('ContactsListCtrl', ['$scope', 'uriGenerator', function($scope, uriGenerator) {

    $scope.contacts = [
        {
            name: 'Olivier Dupont',
            email: 'olivier.dupont@groupehn.com',
            tel: '01 23 45 67 89'
        },
        {
            name: 'Capitaine Haddock',
            email: 'archibald.haddock@herge.be',
            tel: '0 899 708 708'
        },
        {
            name: 'Achile Talon',
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
        if ($scope.newContact.name
                && $scope.newContact.email
                && $scope.newContact.tel) {
            $scope.newContact.telUri = uriGenerator.tel($scope.newContact.tel);
            $scope.contacts.push($scope.newContact);
            $scope.newContact = {};
        }
    };
}]);
