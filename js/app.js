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

app.factory('Contact', [function() {
    var database = [
        {
            id: 0,
            firstName: 'Olivier',
            lastName: 'Dupont',
            email: 'olivier.dupont@groupehn.com',
            tel: '01 23 45 67 89'
        },
        {
            id: 1,
            firstName : 'Archibald',
            lastName : 'Haddock',
            email : 'capitaine.haddock@herge.be',
            tel : '0 899 708 708'
        },
        {
            id: 2,
            firstName : 'Achile',
            lastName : 'Talon',
            email : 'achiletalon@polite.be',
            tel : '09 87 65 43 21'
        }
    ];
    var lastId = 2;

    var copyFields = function(source, dest) {
        for (var field in source) {
            if (field[0] != '$') {
                dest[field] = source[field];
            }
        }
    }

    var Contact = function(data) {
        this.$c = data || {};
        this.$new = data === undefined;
        copyFields(this.$c, this);
    };

    Contact.prototype.$delete = function() {
        if (!this.$new) {
            database.splice(database.indexOf(this.$c), 1);
        }
    };

    Contact.prototype.$save = function() {
        if (this.$new) {
            this.id = ++lastId;
            database.push(this.$c);
            this.$new = false;
        }
        copyFields(this, this.$c);
    };

    Contact.query = function() {
        var result = [];
        for (var i = 0; i < database.length; i++) {
            result.push(new Contact(database[i]));
        }
        return result;
    };

    Contact.get = function(params) {
        for (var i = 0; i < database.length; i++) {
            if (database[i].id == params.id) {
                return new Contact(database[i]);
            }
        }
    }

    return Contact;
}]);

app.controller('ContactsListCtrl', ['$scope', 'uriGenerator', 'Contact', function($scope, uriGenerator, Contact) {

    var addAllTelUris = function() {
        for (var i = 0; i < $scope.contacts.length; i++) {
            $scope.contacts[i].telUri = uriGenerator.tel($scope.contacts[i].tel);
        }
    }

    $scope.contacts = Contact.query();
    addAllTelUris();

    $scope.remove = function(contact) {
        contact.$delete();
        $scope.contacts = Contact.query();
        addAllTelUris();
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
            addAllTelUris();
        }
    };
}]);
