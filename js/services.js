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

services.factory('Contact', ['$http', function($http) {
	var baseUrl = 'http://vip46.groupehn.com:20003/angularjs/tpangularjs.php/';

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
    	var self = this;

        this.$save = function(params, success, error) {
        	$http.post(baseUrl + (self.id ? self.id : ''), self)
        		.success(function(data) {
        			copyFields(data, self);
        			success && success();
        		})
        		.error(function(data) {
        			console.log('Error while saving.', self, data);
        			error && error();
        		});
        };

        this.$delete = function(params, success, error) {
        	$http.delete(baseUrl + (self.id ? self.id : ''))
        		.success(function() {
        			success && success();
        		})
        		.error(function(data) {
        			console.log('Error while deleting.', self, data);
        			error && error();
        		});
        };
    };

    Contact.query = function(params, success, error) {
        var result = [];
        $http.get(baseUrl)
        	.success(function(data) {
        		for (var i = 0; i < data.length; i++) {
        			var c = new Contact();
        			copyFields(data[i], c);
        			result.push(c);
        		}
        		success && success();
        	})
        	.error(function(data) {
        		console.log('Error while querying all.', data);
        		error && error();
        	});
        return result;
    };

    Contact.get = function(params, success, error) {
    	var result = new Contact();
    	$http.get(baseUrl + params.id)
    		.success(function(data) {
    			copyFields(data, result);
    			success && success();
    		})
    		.error(function(data) {
    			console.log('Error while fetching ' + params.id, data);
    			error && error();
    		});
        return result;
    }

    return Contact;
}]);
