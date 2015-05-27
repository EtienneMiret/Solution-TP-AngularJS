'use strict';

var services = angular.module('services', ['ngResource']);

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

services.factory('Contact', ['$resource', function($resource) {
    return $resource('http://vip46.groupehn.com:20003/angularjs/tpangularjs.php/:id', {id:'@id', delay:'3'});
}]);
