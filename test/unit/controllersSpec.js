'use strict';

describe('The controller', function() {
    var scope, createController, httpBackend;
    var webserviceUrl = 'http://vip46.groupehn.com:20003/angularjs/tpangularjs.php';

    beforeEach(function() {
        jasmine.addMatchers({
            toEqualData: function() {
                return {
                    compare: function(actual, expected) {
                        return {
                            pass: angular.equals(expected, actual)
                        };
                    }
                };
            },
            toEqualNow: function() {
                return {
                    compare: function(actual) {
                        return {
                            pass: actual instanceof Date && Math.abs((new Date()).getTime() - actual.getTime()) < 100
                        }
                    }
                }
            }
        });
    });

    beforeEach(module('contacts'));

    beforeEach(inject(function($httpBackend, $rootScope, $controller) {
        httpBackend = $httpBackend;
        scope = $rootScope.$new();
        createController = function(ctrlName) {
            return $controller(ctrlName, {$scope: scope});
        };
    }));

    describe('ContactsListCtrl', function() {
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

        it('should initialy be loading', function() {
            httpBackend.expectGET(webserviceUrl).respond(data);
            createController('ContactsListCtrl');
            expect(scope.listIsLoading).toBe(true);
            expect(scope.contacts).toEqualData([]);
            expect(scope.msg).toBe(undefined);
            httpBackend.flush();
        });

        it('should properly load contacts', function() {
            httpBackend.expectGET(webserviceUrl).respond(data);
            createController('ContactsListCtrl');
            httpBackend.flush();
            expect(scope.listIsLoading).toBe(false);
            expect(scope.contacts).toEqualData(data);
            expect(scope.msg).toBe(undefined);
        });

        it('should gracefully handle failures', function() {
            httpBackend.expectGET(webserviceUrl).respond(500, 'Server is down');
            createController('ContactsListCtrl');
            httpBackend.flush();
            expect(scope.listIsLoading).toBe(false);
            expect(scope.contacts).toEqualData([]);
            expect(scope.msg).toBe('Server is down');
        });

    });

    describe('ContactsDetailCtrl', function() {
        var url = webserviceUrl + '/1';
        var haddock = {
            id: 1,
            firstName: 'Archibald',
            lastName: 'Haddock',
            email: 'capitaine.haddock@herge',
            tel: '00 32 2 36 42 12',
            creation: '2015-05-27T10:20:16+02:00',
            modification: '2015-05-27T10:20:16+02:00',
            fields: []
        };

        beforeEach(inject(function($routeParams) {
            $routeParams.id = '1';
        }));

        it('should initialy be loading', function() {
            httpBackend.expectGET(url).respond(haddock);
            createController('ContactsDetailCtrl');
            expect(scope.contactIsLoading).toBe(true);
            expect(scope.deleting).toBe(false);
            expect(scope.contact).toEqualData({});
            expect(scope.msg).toBe(undefined);
            expect(scope.now).toEqualNow();
            expect(scope.delete).toEqual(jasmine.any(Function));
            httpBackend.flush();
        });

        it('should properly load one contact', function() {
            httpBackend.expectGET(url).respond(haddock);
            createController('ContactsDetailCtrl');
            httpBackend.flush();
            expect(scope.contactIsLoading).toBe(false);
            expect(scope.deleting).toBe(false);
            expect(scope.contact).toEqualData(haddock);
            expect(scope.msg).toBe(undefined);
            expect(scope.now).toEqualNow();
            expect(scope.delete).toEqual(jasmine.any(Function));
        });

        it('should gracefully handle failures', function() {
            httpBackend.expectGET(url).respond(404, 'Not found.');
            createController('ContactsDetailCtrl');
            httpBackend.flush();
            expect(scope.contactIsLoading).toBe(false);
            expect(scope.deleting).toBe(false);
            expect(scope.contact).toEqualData({});
            expect(scope.msg).toBe('Not found.');
            expect(scope.now).toEqualNow();
            expect(scope.delete).toEqual(jasmine.any(Function));
        });

        it('should be able to delete a contact', function() {
            httpBackend.expectGET(url).respond(haddock);
            createController('ContactsDetailCtrl');
            httpBackend.flush();
            httpBackend.expectDELETE(url).respond('Contact deleted.');
            scope.delete();
            expect(scope.contactIsLoading).toBe(false);
            expect(scope.deleting).toBe(true);
            expect(scope.contact).toEqualData(haddock);
            expect(scope.msg).toBe(undefined);
            expect(scope.now).toEqualNow();
            expect(scope.delete).toEqual(jasmine.any(Function));
            httpBackend.flush();
        });

        it('should gracefully handle deletion failures', function() {
            httpBackend.expectGET(url).respond(haddock);
            createController('ContactsDetailCtrl');
            httpBackend.flush();
            httpBackend.expectDELETE(url).respond(403, 'Deletion not allowed.')
            scope.delete();
            httpBackend.flush();
            expect(scope.contactIsLoading).toBe(false);
            expect(scope.deleting).toBe(false);
            expect(scope.contact).toEqualData(haddock);
            expect(scope.msg).toBe('Deletion not allowed.');
            expect(scope.now).toEqualNow();
            expect(scope.delete).toEqual(jasmine.any(Function));
        });

    });

    afterEach(function() {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

});
