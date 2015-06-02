'use strict';

describe('The service', function() {

    beforeEach(module('services'));

    describe('uriGenerator', function() {
        var uriGenerator;

        beforeEach(inject(function(_uriGenerator_) {
            uriGenerator = _uriGenerator_;
        }));

        it('should convert French tel numbers to URIs', function() {
            expect(uriGenerator.tel('01 23 45 67 89')).toBe('tel:+33-123456789');
            expect(uriGenerator.tel('01.23.45.67.89')).toBe('tel:+33-123456789');
            expect(uriGenerator.tel('01-23-45-67-89')).toBe('tel:+33-123456789');
            expect(uriGenerator.tel('0123456789')).toBe('tel:+33-123456789');
        });

        it('should convert international tel numbers to URIs', function() {
            expect(uriGenerator.tel('00 1 123 456')).toBe('tel:+1123456');
            expect(uriGenerator.tel('00 42 AZERTY')).toBe('tel:+42AZERTY');
            expect(uriGenerator.tel('0032123456')).toBe('tel:+32123456');
        });

        it('should left unparsable tel numbers as is', function() {
            expect(uriGenerator.tel('18')).toBe('tel:18');
            expect(uriGenerator.tel('3615')).toBe('tel:3615');
        });

    });

    describe('contactEditor', function() {
        var contactEditor;

        beforeEach(inject(function(_contactEditor_) {
            contactEditor = _contactEditor_;
        }));

        it('should add behavior to $scope objects', function() {
            var scope = {};
            contactEditor.addBehavior(scope);
            expect(scope.save).toEqual(jasmine.any(Function));
        });

    });

});
