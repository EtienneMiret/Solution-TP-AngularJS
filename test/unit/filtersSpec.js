'use strict';

describe('The filter ', function() {

    beforeEach(module('filters'));

    describe('telUri', function() {
        var filter;

        beforeEach(inject(function(telUriFilter) {
            filter = telUriFilter;
        }));

        it('should not fail with no input', function() {
            expect(filter()).toBe('');
        });

        it('should convert tel numbers', function() {
            expect(filter('01 23 45 67 89')).toBe('tel:+33-123456789');
            expect(filter('3117')).toBe('tel:3117');
            expect(filter('0032123456')).toBe('tel:+32123456');
        });

    });

    describe('relativeTime', function() {
        var filter, now;
        var before = function(seconds) {
            return (new Date(now.getTime() - seconds * 1000)).toJSON();
        };
        var todayAt = function(hours, minutes) {
            return (new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes)).toJSON();
        }

        beforeEach(inject(function(relativeTimeFilter) {
            filter = relativeTimeFilter;
            now = new Date(2015, 6, 28, 16, 31);
        }));

        it('should not fail with no input', function() {
            expect(filter()).toBe('');
        });

        it('should display relative time for recent instants', function() {
            expect(filter(before(0), now)).toBe('À l’instant.');
            expect(filter(before(4), now)).toBe('Il y a 4 secondes.');
            expect(filter(before(60), now)).toBe('Il y a une minute.');
            expect(filter(before(5 * 60), now)).toBe('Il y a 5 minutes.');
        });

        it('should display only time for today', function() {
            expect(filter(todayAt(0, 12), now)).toBe('Aujourd’hui à 00h12.');
            expect(filter(todayAt(0, 36), now)).toBe('Aujourd’hui à 00h36.');
        });

        it ('should display absolute time for old instants', function() {
            expect(filter((new Date(2005, 11, 25, 14, 32)).toJSON(), now)).toBe('Le 25/12/2005 à 14h32.');
            expect(filter((new Date(1935, 1, 5, 8, 26)).toJSON(), now)).toBe('Le 05/02/1935 à 08h26.');
        });

    });

});
