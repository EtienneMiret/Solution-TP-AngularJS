'use strict';

var services = angular.module('services', []);

services.factory('uriGenerator', [function() {
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

services.factory('Contact', ['uriGenerator', function(uriGenerator) {
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
            firstName:'Archibald',
            lastName: 'Haddock',
            email: 'capitaine.haddock@herge.be',
            tel: '0 899 708 708'
        },
        {
            id: 2,
            firstName: 'Achile',
            lastName: 'Talon',
            email: 'achiletalon@polite.be',
            tel: '09 87 65 43 21'
        }
    ];

    var lastId = 2;

    for (var i = 0; i < database.length; i++) {
        database[i].telUri = uriGenerator.tel(database[i].tel);
    }

    var Contact = function(c, full) {
        var new_;

        if (c) {
            this.id = c.id;
            this.firstName = c.firstName;
            this.lastName = c.lastName;
            if (full) {
                this.email = c.email;
                this.tel = c.tel;
            }
            new_ = false;
        } else {
            c = {};
            new_ = true;
        }

        this.$save = function() {
            c.firstName = this.firstName;
            c.lastName = this.lastName;
            if (this.email) {
                c.email = this.email;
            }
            if (this.tel) {
                c.tel = this.tel;
                c.telUri = uriGenerator.tel(c.tel);
            }

            if (new_) {
                c.id = ++lastId;
                database.push(c);
                this.id = c.id;
                new_ = false;
            }
        };

        this.$delete = function() {
            if (new_) {
                throw 'Object not persisted';
            } else {
                database.splice(database.indexOf(c), 1);
            }
        };
    };

    Contact.query = function() {
        var result = [];
        for (var i = 0; i < database.length; i++) {
            result.push(new Contact(database[i], false));
        }
        return result;
    };

    Contact.get = function(param) {
        var i, c;
        for (i = 0; i < database.length; i++) {
            c = database[i];
            if (c.id == param.id) {
                break;
            }
        }
        if (i == database.length) {
            throw 'Not found';
        }
        return new Contact(c, true);
    }

    return Contact;
}]);
