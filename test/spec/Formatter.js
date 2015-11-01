import Formatter from 'src/Formatter';

describe('Formatter:', () => {
    const formatter = new Formatter();

    describe('The zeroPad static method', () => {
        it('returns a string prefixed with the correct number of "0" characters according to minLength.', () => {
            expect(Formatter.zeroPad(12345, 10)).toBe('0000012345');
        });

        it('returns an unprefixed string if ref length is equal to the minLength.', () => {
            expect(Formatter.zeroPad(12345, 5)).toBe('12345');
        });

        it('returns an unprefixed string but is not truncated if the ref length is greater that minLength.', () => {
            expect(Formatter.zeroPad(12345, 3)).toBe('12345');
        });

        it('treats a null ref as a zero-length string.', () => {
            expect(Formatter.zeroPad(null, 4)).toBe('0000');
        });

        it('treats a missing ref as a zero-length string.', () => {
            expect(Formatter.zeroPad(undefined, 4)).toBe('0000');
        });

        it('treats minLength as 0 if the provided value is negative.', () => {
            expect(Formatter.zeroPad(12345, -10)).toBe('12345');
        });
    });

    describe('the priorityTypes property', () => {
        it('returns an empty Array.', () => {
            expect(formatter.priorityTypes).toEqual([]);
        });
    });

    describe('the format method', () => {
        it('returns null.', () => {
            expect(formatter.format()).toBeNull();
        });
    });

});
