import IntlDateFormatter from 'src/Globalization/IntlDateFormatter';

describe('Globalization.IntlDateFormatter', () => {
    const formatter = new IntlDateFormatter();
    const date = new Date(Date.parse('June 1, 1977 9:34 PM'));

    describe('_standardFormatNames', () => {
        it('maps the "d" format specifier to "shortDatePattern"', () => {
            expect(IntlDateFormatter._standardFormatNames.get('d')).toEqual(['shortDatePattern']);
        });

        it('maps the "D" format specifier to "longDatePattern"', () => {
            expect(IntlDateFormatter._standardFormatNames.get('D')).toEqual(['longDatePattern']);
        });

        it('maps the "f" format specifier to "longDatePattern shortTimePattern"', () => {
            expect(IntlDateFormatter._standardFormatNames.get('f')).toEqual(['longDatePattern', 'shortTimePattern']);
        });

        it('maps the "F" format specifier to "dateTimePattern"', () => {
            expect(IntlDateFormatter._standardFormatNames.get('F')).toEqual(['dateTimePattern']);
        });

        it('maps the "g" format specifier to "shortDatePattern shortTimePattern"', () => {
            expect(IntlDateFormatter._standardFormatNames.get('g')).toEqual(['shortDatePattern', 'shortTimePattern']);
        });

        it('maps the "G" format specifier to "shortDatePattern longTimePattern"', () => {
            expect(IntlDateFormatter._standardFormatNames.get('G')).toEqual(['shortDatePattern', 'longTimePattern']);
        });

        it('maps the "r" format specifier to "gmtDateTimePattern"', () => {
            expect(IntlDateFormatter._standardFormatNames.get('r')).toEqual(['gmtDateTimePattern']);
        });

        it('maps the "R" format specifier to "gmtDateTimePattern"', () => {
            expect(IntlDateFormatter._standardFormatNames.get('R')).toEqual(['gmtDateTimePattern']);
        });

        it('maps the "s" format specifier to "sortableDateTimePattern"', () => {
            expect(IntlDateFormatter._standardFormatNames.get('s')).toEqual(['sortableDateTimePattern']);
        });

        it('maps the "t" format specifier to "shortTimePattern"', () => {
            expect(IntlDateFormatter._standardFormatNames.get('t')).toEqual(['shortTimePattern']);
        });

        it('maps the "T" format specifier to "longTimePattern"', () => {
            expect(IntlDateFormatter._standardFormatNames.get('T')).toEqual(['longTimePattern']);
        });

        it('maps the "u" format specifier to "universalDateTimePattern"', () => {
            expect(IntlDateFormatter._standardFormatNames.get('u')).toEqual(['universalDateTimePattern']);
        });

        it('maps the "U" format specifier to "dateTimePattern"', () => {
            expect(IntlDateFormatter._standardFormatNames.get('U')).toEqual(['dateTimePattern']);
        });
    });

    describe('priorityTypes', () => {
        it('returns an Array of expected types', () => {
            expect(formatter.priorityTypes).toEqual([Date]);
        });
    });

    describe('format()', () => {
        describe('with the neutral ("en-US") culture', () => {
            xit('correctly formats a date with the "d" format specifier', () => {
                expect(formatter.format(date, 'd')).toBe('6/1/1977');
            });

            xit('correctly formats a date with the "D" format specifier', () => {
                expect(formatter.format(date, 'D')).toBe('');
            });

            xit('correctly formats a date with the "f" format specifier', () => {
                expect(formatter.format(date, 'f')).toBe('');
            });

            xit('correctly formats a date with the "F" format specifier', () => {
                expect(formatter.format(date, 'F')).toBe('');
            });

            xit('correctly formats a date with the "g" format specifier', () => {
                expect(formatter.format(date, 'g')).toBe('');
            });

            xit('correctly formats a date with the "G" format specifier', () => {
                expect(formatter.format(date, 'G')).toBe('');
            });

            xit('correctly formats a date with the "r" format specifier', () => {
                expect(formatter.format(date, 'r')).toBe('');
            });

            xit('correctly formats a date with the "R" format specifier', () => {
                expect(formatter.format(date, 'R')).toBe('');
            });

            xit('correctly formats a date with the "s" format specifier', () => {
                expect(formatter.format(date, 's')).toBe('');
            });

            xit('correctly formats a date with the "t" format specifier', () => {
                expect(formatter.format(date, 't')).toBe('');
            });

            xit('correctly formats a date with the "T" format specifier', () => {
                expect(formatter.format(date, 'T')).toBe('');
            });

            xit('correctly formats a date with the "u" format specifier', () => {
                expect(formatter.format(date, 'u')).toBe('');
            });

            xit('correctly formats a date with the "U" format specifier', () => {
                expect(formatter.format(date, 'U')).toBe('');
            });
        });
    });

});