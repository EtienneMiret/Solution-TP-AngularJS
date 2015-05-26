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
	var delay = 100; // En milliseconde.

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

    /* Copie les champs de « from » vers « to » sauf
     * ceux dont le nom commence par un ‘$’. */
    var copyFields = function(from, to) {
    	for (var prop in from) {
    		if (prop[0] != '$') {
    			to[prop] = from[prop];
    		}
    	}
    }

    var Contact = function() {
        var new_ = true;
        var c = {};
        var self = this;

        this.$setData = function(data, full) {
        	c = data;
            if (full) {
            	copyFields(c, this);
            } else {
                this.id = c.id;
                this.firstName = c.firstName;
                this.lastName = c.lastName;
            }
            new_ = false;
        };

        this.$save = function(params, success, error) {
        	$interval(function() {
        		copyFields(self, c);
                if (new_) {
                    c.id = ++lastId;
                    database.push(c);
                    self.id = c.id;
                    new_ = false;
                }
                success && success();
        	}, delay, 1);
        };

        this.$delete = function(params, success, error) {
        	$interval(function() {
        		if (new_) {
        			error && error();
        		} else {
        			database.splice(database.indexOf(c), 1);
        			success && success();
        		}
        	}, delay, 1);
        };
    };

    Contact.query = function(params, success, error) {
        var result = [];
        $interval(function() {
            for (var i = 0; i < database.length; i++) {
            	var c = new Contact();
            	c.$setData(database[i], false);
                result.push(c);
            }
        }, delay, 1);
        return result;
    };

    Contact.get = function(params, success, error) {
    	var result = new Contact();
    	$interval(function() {
            var i, c;
            for (i = 0; i < database.length; i++) {
                c = database[i];
                if (c.id == params.id) {
                    break;
                }
            }
            if (i == database.length) {
                error && error();
            } else {
            	result.$setData(c, true);
            }
    	}, delay, 1);
        return result;
    }

    return Contact;
}]);
