'use strict';

var directives = angular.module('directives', []);

directives.directive('hnLoading', [function() {
    var preLink = function(scope, element, attrs) {
        // Ne fait rien.
    }
    var postLink = function(scope, element, attrs) {
        var spinner = new Spinner();

        /* « element » est un objet jQuery ou jQlite. Il faut utiliser
         * « element[O] » pour avoir accès à l’élément du DOM sous-jacent. */
        var e = element[0];

        scope.$watch('loading', function() {
            if (scope.loading) {
                spinner.spin(e);
            } else {
                spinner.stop();
            }
        });

        scope.$on('$destroy', function() {
            spinner.stop();
        });
    };
    return {
        restrict: 'A',
        scope: {loading: '=hnLoading'},
        compile: function() {
            return {pre: preLink, post: postLink};
        }
    };
}]);
