'use strict';

var controllers = angular.module('controllers', ['services']);

controllers.controller('ContactsListCtrl', ['$scope', 'Contact', function($scope, Contact) {
    $scope.listIsLoading = true;
    $scope.contacts = Contact.query({}, function() {
        $scope.listIsLoading = false;
    });
}]);

controllers.controller('ContactsDetailCtrl', ['$scope', '$location', '$routeParams', '$interval', 'Contact', 'uriGenerator', function ($scope, $location, $routeParams, $interval, Contact, uriGenerator) {
    $scope.contactIsLoading = true;
    $scope.contact = Contact.get($routeParams, function() {
        $scope.contactIsLoading = false;
        $scope.contact.telUri = uriGenerator.tel($scope.contact.tel);
    });
    $scope.deleting = false;
    $scope.delete = function() {
        $scope.deleting = true;
        $scope.contact.$delete({}, function() {
            $location.path('/');
        });
    };
    $scope.now = new Date();
    var timer = $interval(function() {
        $scope.now = new Date();
    }, 1000);
    $scope.$on('$destroy', function() {
        $interval.cancel(timer);
    })
}]);

controllers.controller('ContactsEditCtrl', ['$scope', '$location', '$routeParams', 'Contact', function($scope, $location, $routeParams, Contact) {
    $scope.contact = Contact.get($routeParams, function() {
        $scope.loading = false;
    });
    $scope.loading = true;
    $scope.saving = false;
    $scope.save = function() {
        $scope.saving = true;
        $scope.contact.$save({}, function() {
            $location.path('/' + $scope.contact.id);
        });
    };
}]);

controllers.controller('ContactsNewCtrl', ['$scope', '$location', 'Contact', function($scope, $location, Contact) {
    $scope.contact = new Contact();
    $scope.loading = false;
    $scope.saving = false;
    $scope.save = function() {
        $scope.saving = true;
        $scope.contact.$save({}, function() {
            $location.path('/' + $scope.contact.id);
        });
    };
}]);
