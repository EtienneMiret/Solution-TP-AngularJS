'use strict';

describe('Les contrôleurs de contacts', function() {
    var webserviceUrl = 'http://vip46.groupehn.com:20003/angularjs/tpangularjs.php';

    beforeEach(function() {
        jasmine.addMatchers({
            toEqualData: function() {
                return {
                    compare: function(expected, actual) {
                        return {
                            pass: angular.equals(expected, actual)
                        };
                    }
                };
            }
        });
    });

    beforeEach(module('contacts'));

    describe('ContactsListCtrl', function() {
        var scope, createController, httpBackend;
        var data = [
            {
                id: 1,
                firstName: 'Archibald',
                lastName: 'Haddock'
            },
            {
                id: 2,
                firstName: 'Achile',
                lastName: 'Talon'
            },
            {
                id: 3,
                firstName: 'Francis',
                lastName: 'Blake'
            }
        ];

        beforeEach(inject(function($httpBackend, $rootScope, $controller) {
            httpBackend = $httpBackend;
            scope = $rootScope.$new();
            createController = function() {
                return $controller('ContactsListCtrl', {$scope: scope});
            };
        }));

        it('should initialy be loading', function() {
            httpBackend.expectGET(webserviceUrl).respond(data);
            createController();
            expect(scope.listIsLoading).toBe(true);
            expect(scope.contacts).toEqualData([]);
            expect(scope.msg).toBe(undefined);
            httpBackend.flush();
        });

        it('should properly load contacts', function() {
            httpBackend.expectGET(webserviceUrl).respond(data);
            createController();
            httpBackend.flush();
            expect(scope.listIsLoading).toBe(false);
            expect(scope.contacts).toEqualData(data);
            expect(scope.msg).toBe(undefined);
        });

        it('should gracefully handle failures', function() {
            httpBackend.expectGET(webserviceUrl).respond(500, 'Server is down');
            createController();
            httpBackend.flush();
            expect(scope.listIsLoading).toBe(false);
            expect(scope.contacts).toEqualData([]);
            expect(scope.msg).toBe('Server is down');
        });

        afterEach(function() {
            httpBackend.verifyNoOutstandingExpectation();
            httpBackend.verifyNoOutstandingRequest();
        });

    });

});
