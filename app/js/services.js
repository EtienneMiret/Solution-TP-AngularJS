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
    return $resource('http://vip46.groupehn.com:20003/angularjs/tpangularjs.php/:id', {id:'@id'});
}]);

services.factory('contactEditor', ['$location', function($location) {
    return {
        addBehavior: function($scope) {
            $scope.save = function() {
                $scope.saving = true;
                $scope.contact.$save({}, function() {
                    $location.path('/' + $scope.contact.id);
                }, function(response) {
                    $scope.saving = false;
                    $scope.msg = response.data;
                    console.warn(response);
                });
            };
            $scope.remove = function(field) {
                var fields = $scope.contact.fields;
                fields.splice(fields.indexOf(field), 1);
                for (var i = 0; i < fields.length; i++) {
                    if (fields[i].order > field.order) {
                        fields[i].order--;
                    }
                }
            };
            $scope.addField = function(type) {
                var fields = $scope.contact.fields;
                fields.push({name:'', value:'', order:fields.length, type:type});
            };
            var move = function(field, delta) {
                var fields = $scope.contact.fields;
                for (var i = 0; i < fields.length; i++) {
                    if (fields[i].order == field.order + delta) {
                        fields[i].order -= delta;
                        break;
                    }
                }
                field.order += delta;
            };
            $scope.moveUp = function(field) {
                move(field, -1);
            };
            $scope.moveDown = function(field) {
                move(field, 1);
            }
        }
    };
}]);
