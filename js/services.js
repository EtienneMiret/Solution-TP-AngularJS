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

services.factory('Contact', ['$interval', function($interval) {
    var delay = 100; // En milisecondes.

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

    Contact.prototype.$delete = function(params, success, error) {
        var self = this;
        $interval(function() {
            if (self.$new) {
                error && error();
            } else {
                database.splice(database.indexOf(self.$c), 1);
                success && success();
            }
        }, delay, 1);
    };

    Contact.prototype.$save = function(params, success, error) {
        var self = this;
        $interval(function() {
            if (self.$new) {
                self.id = ++lastId;
                database.push(self.$c);
                self.$new = false;
            }
            copyFields(self, self.$c);
            success && success();
        }, delay, 1);
    };

    Contact.query = function(params, success, error) {
        var result = [];
        $interval(function() {
            for (var i = 0; i < database.length; i++) {
                result.push(new Contact(database[i]));
            }
            success && success();
        }, delay, 1);
        return result;
    };

    Contact.get = function(params, success, error) {
        var result = new Contact();
        $interval(function() {
            var c;
            for (var i = 0; i < database.length; i++) {
                if (database[i].id == params.id) {
                    c = database[i];
                    break;
                }
            }
            if (c) {
                result.$c = c;
                result.$new = false;
                copyFields(c, result);
                success && success();
            } else {
                error && error();
            }
        }, delay, 1);
        return result;
    };

    return Contact;
}]);
