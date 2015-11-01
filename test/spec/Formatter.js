//TBI properties formatLocale, formatName
//TBI constructor has to take a culture (protected property)
//TBI inheritor static members... current (loads the current culture formatter... not statically but through culture) inherited static? fromLocale?
//TBI cache formatters
//TBI cache cultures

import Formatter from 'src/Formatter';

describe('Formatter', () => {
    const formatter = new Formatter();

    describe('zeroPad()', () => {
        it('returns a string prefixed with "0" characters and of minLength length', () => {
            expect(Formatter.zeroPad(12345, 10)).toBe('0000012345');
        });

        it('returns an unprefixed string if ref length is equal to minLength', () => {
            expect(Formatter.zeroPad(12345, 5)).toBe('12345');
        });

        it('returns an unprefixed, untruncated string if ref length is greater than minLength', () => {
            expect(Formatter.zeroPad(12345, 3)).toBe('12345');
        });

        it('treats a null ref as a zero-length string', () => {
            expect(Formatter.zeroPad(null, 4)).toBe('0000');
        });

        it('treats a missing ref as a zero-length string', () => {
            expect(Formatter.zeroPad(undefined, 4)).toBe('0000');
        });

        it('treats minLength as 0 if the provided value is negative', () => {
            expect(Formatter.zeroPad(12345, -10)).toBe('12345');
        });
    });

    describe('priorityTypes', () => {
        it('returns an empty Array', () => {
            expect(formatter.priorityTypes).toEqual([]);
        });
    });

    describe('format', () => {
        it('returns null', () => {
            expect(formatter.format()).toBeNull();
        });
    });

});
