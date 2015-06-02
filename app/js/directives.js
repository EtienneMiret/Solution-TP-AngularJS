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

directives.directive('hnLinkField', ['$document', 'uriGenerator', function($document, uriGenerator) {
    var preLink = function(scope, element, attrs) {
        // Ne fait rien.
    };
    var postLink = function(scope, element, attrs) {
        var url;
        switch(scope.field.type) {
        case 'TEL':
            url = uriGenerator.tel(scope.field.value);
            break;
        case 'URL':
            url = scope.field.value;
            break;
        case 'EMAIL':
            url = 'mailto:' + scope.field.value;
            break;
        default:
            break;
        }
        if (url) {
            var link = angular.element($document[0].createElement('a'));
            link.attr('href', url);
            link.text(scope.field.value);
            element.append(link);
        } else {
            element.text(scope.field.value);
        }
    };
    return {
        restrict: 'A',
        scope: {field: '=hnLinkField'},
        compile: function() {
            return {pre: preLink, post: postLink};
        }
    };
}]);
