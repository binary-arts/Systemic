//TBI fix tests that are time-zone dependant (usine Jasmine date mocking)

import Culture from 'src/Globalization/Culture';
import IntlDateFormatter from 'src/Globalization/IntlDateFormatter';

describe('Globalization.IntlDateFormatter', () => {
    const formatter = new IntlDateFormatter();
    const date = new Date(Date.parse('June 1, 1977 9:04:02 PM'));

    describe('_standardFormatSpecs', () => {
        it('maps the "d" spec to the "shortDatePattern" format', () => {
            expect(IntlDateFormatter._standardFormatSpecs.get('d')).toEqual(['shortDatePattern']);
        });

        it('maps the "D" spec to the "longDatePattern" format', () => {
            expect(IntlDateFormatter._standardFormatSpecs.get('D')).toEqual(['longDatePattern']);
        });

        it('maps the "f" spec to the "longDatePattern shortTimePattern" format', () => {
            expect(IntlDateFormatter._standardFormatSpecs.get('f')).toEqual(['longDatePattern', 'shortTimePattern']);
        });

        it('maps the "F" spec to the "dateTimePattern" format', () => {
            expect(IntlDateFormatter._standardFormatSpecs.get('F')).toEqual(['dateTimePattern']);
        });

        it('maps the "g" spec to the "shortDatePattern shortTimePattern" format', () => {
            expect(IntlDateFormatter._standardFormatSpecs.get('g')).toEqual(['shortDatePattern', 'shortTimePattern']);
        });

        it('maps the "G" spec to the "shortDatePattern longTimePattern" format', () => {
            expect(IntlDateFormatter._standardFormatSpecs.get('G')).toEqual(['shortDatePattern', 'longTimePattern']);
        });

        it('maps the "r" spec to the "gmtDateTimePattern" format', () => {
            expect(IntlDateFormatter._standardFormatSpecs.get('r')).toEqual(['gmtDateTimePattern']);
        });

        it('maps the "R" spec to the "gmtDateTimePattern" format', () => {
            expect(IntlDateFormatter._standardFormatSpecs.get('R')).toEqual(['gmtDateTimePattern']);
        });

        it('maps the "s" spec to the "sortableDateTimePattern" format', () => {
            expect(IntlDateFormatter._standardFormatSpecs.get('s')).toEqual(['sortableDateTimePattern']);
        });

        it('maps the "t" spec to the "shortTimePattern" format', () => {
            expect(IntlDateFormatter._standardFormatSpecs.get('t')).toEqual(['shortTimePattern']);
        });

        it('maps the "T" spec to the "longTimePattern" format', () => {
            expect(IntlDateFormatter._standardFormatSpecs.get('T')).toEqual(['longTimePattern']);
        });

        it('maps the "u" spec to the "universalDateTimePattern" format', () => {
            expect(IntlDateFormatter._standardFormatSpecs.get('u')).toEqual(['universalDateTimePattern']);
        });

        it('maps the "U" spec to the "dateTimePattern" format', () => {
            expect(IntlDateFormatter._standardFormatSpecs.get('U')).toEqual(['dateTimePattern']);
        });
    });

    describe('priorityTypes', () => {
        it('returns an Array of expected types', () => {
            expect(formatter.priorityTypes).toEqual([Date]);
        });
    });

    describe('format()', () => {
        it('returns null when ref is missing, null, or cannot be coerced to a date', () => {
            expect(formatter.format(undefined, 'g')).toBeNull();
            expect(formatter.format(null, 'g')).toBeNull();
            expect(formatter.format(true, 'g')).toBeNull();
            expect(formatter.format(0, 'g')).toBeNull();
            expect(formatter.format('', 'g')).toBeNull();
            expect(formatter.format([], 'g')).toBeNull();
            expect(formatter.format({}, 'g')).toBeNull();
        });

        it('returns null if spec is an empty string', () => {
            expect(formatter.format(date, '')).toBeNull();
        });

        it('returns spec if spec does not contain any formatting parts and is not a standard format spec.', () => {
            expect(formatter.format(date, 'YO bla')).toBe('YO bla');
        });

        describe('with the neutral ("en-US") culture', () => {
            it('correctly formats a Date using the format part "GMT"', () => {
                expect(formatter.format(date, 'GMT')).toBe('GMT');
            });

            it('correctly formats a Date using the format part "UTC"', () => {
                expect(formatter.format(date, 'UTC')).toBe('UTC');
            });

            it('correctly formats a Date using the format part "dddd"', () => {
                expect(formatter.format(date, 'dddd')).toBe('Wednesday');
            });

            it('correctly formats a Date using the format part "ddd"', () => {
                expect(formatter.format(date, 'ddd')).toBe('Wed');
            });

            it('correctly formats a Date using the format part "dd"', () => {
                expect(formatter.format(date, 'dd')).toBe('01');
            });

            it('correctly formats a Date using the format part "%d"', () => {
                expect(formatter.format(date, '%d')).toBe('1');
            });

            it('correctly formats a Date using the format part "MMMM"', () => {
                expect(formatter.format(date, 'MMMM')).toBe('June');
            });

            it('correctly formats a Date using the format part "MMM"', () => {
                expect(formatter.format(date, 'MMM')).toBe('Jun');
            });

            it('correctly formats a Date using the format part "MM"', () => {
                expect(formatter.format(date, 'MM')).toBe('06');
            });

            it('correctly formats a Date using the format part "M"', () => {
                expect(formatter.format(date, 'M')).toBe('6');
            });

            it('correctly formats a Date using the format part "yyyy"', () => {
                expect(formatter.format(date, 'yyyy')).toBe('1977');
            });

            it('correctly formats a Date using the format part "yy"', () => {
                expect(formatter.format(date, 'yy')).toBe('77');
            });

            it('correctly formats a Date using the format part "y"', () => {
                expect(formatter.format(date, 'y')).toBe('77');
            });

            it('correctly formats a Date using the format part "hh"', () => {
                expect(formatter.format(date, 'hh')).toBe('09');
            });

            it('correctly formats a Date using the format part "h"', () => {
                expect(formatter.format(date, 'h')).toBe('9');
            });

            it('correctly formats a Date using the format part "HH"', () => {
                expect(formatter.format(date, 'HH')).toBe('21');
            });

            it('correctly formats a Date using the format part "H"', () => {
                expect(formatter.format(date, 'H')).toBe('21');
            });

            it('correctly formats a Date using the format part "mm"', () => {
                expect(formatter.format(date, 'mm')).toBe('04');
            });

            it('correctly formats a Date using the format part "m"', () => {
                expect(formatter.format(date, 'm')).toBe('4');
            });

            it('correctly formats a Date using the format part "ss"', () => {
                expect(formatter.format(date, 'ss')).toBe('02');
            });

            it('correctly formats a Date using the format part "%s"', () => {
                expect(formatter.format(date, '%s')).toBe('2');
            });

            it('correctly formats a Date using the format part "tt"', () => {
                expect(formatter.format(date, 'tt')).toBe('PM');
            });

            it('correctly formats a Date using the format part "%t"', () => {
                expect(formatter.format(date, '%t')).toBe('P');
            });

            it('correctly formats a Date using the format part "fff"', () => {
                expect(formatter.format(date, 'fff')).toBe('000');
            });

            it('correctly formats a Date using the format part "ff"', () => {
                expect(formatter.format(date, 'ff')).toBe('00');
            });

            it('correctly formats a Date using the format part "%f"', () => {
                expect(formatter.format(date, '%f')).toBe('0');
            });

            it('correctly formats a Date using the format part "zz"', () => {
                expect(formatter.format(date, 'zz')).toBe('-05');
            });

            it('correctly formats a Date using the format part "z"', () => {
                expect(formatter.format(date, 'z')).toBe('-5');
            });

            it('correctly formats a Date using the format spec "d"', () => {
                expect(formatter.format(date, 'd')).toBe('6/1/1977');
            });

            it('correctly formats a Date using the format spec "D"', () => {
                expect(formatter.format(date, 'D')).toBe('Wednesday, June 01, 1977');
            });

            it('correctly formats a Date using the format spec "f"', () => {
                expect(formatter.format(date, 'f')).toBe('Wednesday, June 01, 1977 9:04 PM');
            });

            it('correctly formats a Date using the format spec "F"', () => {
                expect(formatter.format(date, 'F')).toBe('Wednesday, June 01, 1977 9:04:02 PM');
            });

            it('correctly formats a Date using the format spec "g"', () => {
                expect(formatter.format(date, 'g')).toBe('6/1/1977 9:04 PM');
            });

            it('correctly formats a Date using the format spec "G"', () => {
                expect(formatter.format(date, 'G')).toBe('6/1/1977 9:04:02 PM');
            });

            it('correctly formats a Date using the format spec "r"', () => {
                expect(formatter.format(date, 'r')).toBe('Wed, 01 Jun 1977 21:04:02 GMT');
            });

            it('correctly formats a Date using the format spec "R"', () => {
                expect(formatter.format(date, 'R')).toBe('Wed, 01 Jun 1977 21:04:02 GMT');
            });

            it('correctly formats a Date using the format spec "s"', () => {
                expect(formatter.format(date, 's')).toBe('1977-06-01T21:04:02');
            });

            it('correctly formats a Date using the format spec "t"', () => {
                expect(formatter.format(date, 't')).toBe('9:04 PM');
            });

            it('correctly formats a Date using the format spec "T"', () => {
                expect(formatter.format(date, 'T')).toBe('9:04:02 PM');
            });

            it('correctly formats a Date using the format spec "u"', () => {
                expect(formatter.format(date, 'u')).toBe('1977-06-01 21:04:02-05');
            });

            it('correctly formats a Date using the format spec "U"', () => {
                expect(formatter.format(date, 'U')).toBe('Wednesday, June 01, 1977 9:04:02 PM');
            });

            it('correctly formats a Date using the format "gmtDateTimePattern"', () => {
                expect(formatter.format(date, Culture.current.gmtDateTimePattern)).toBe('Wed, 01 Jun 1977 21:04:02 GMT');
            });

            it('correctly formats a Date using the format "universalDateTimePattern"', () => {
                expect(formatter.format(date, Culture.current.universalDateTimePattern)).toBe('1977-06-01 21:04:02-05');
            });

            it('correctly formats a Date using the format "sortableDateTimePattern"', () => {
                expect(formatter.format(date, Culture.current.sortableDateTimePattern)).toBe('1977-06-01T21:04:02');
            });

            it('correctly formats a Date using the format "dateTimePattern"', () => {
                expect(formatter.format(date, Culture.current.dateTimePattern)).toBe('Wednesday, June 01, 1977 9:04:02 PM');
            });

            it('correctly formats a Date using the format "longDatePattern"', () => {
                expect(formatter.format(date, Culture.current.longDatePattern)).toBe('Wednesday, June 01, 1977');
            });

            it('correctly formats a Date using the format "shortDatePattern"', () => {
                expect(formatter.format(date, Culture.current.shortDatePattern)).toBe('6/1/1977');
            });

            it('correctly formats a Date using the format "longTimePattern"', () => {
                expect(formatter.format(date, Culture.current.longTimePattern)).toBe('9:04:02 PM');
            });

            it('correctly formats a Date using the format "shortTimePattern"', () => {
                expect(formatter.format(date, Culture.current.shortTimePattern)).toBe('9:04 PM');
            });

            it('correctly formats a Date using a custom format containing all multi-character format parts and a variety of literal strings', () => {
                expect(formatter.format(date, 'ff-fff:tt:ss:m.mm:H.HH~h.hh:y.yy.yyyy:M.MM.MMM.MMMM:dd.ddd.dddd:UTC-GMT WORLD '))
                    .toBe('00-:PM:02:4.04:21.21~9.09:77.77.1977:6.06.Jun.June:01.Wed.Wednesday:UTC-GMT WORLD ');
            });
        });
    });

});