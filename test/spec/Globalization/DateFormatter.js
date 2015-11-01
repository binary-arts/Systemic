//TBI fix tests that are time-zone dependant (usine Jasmine date mocking)

import Culture from 'src/Globalization/Culture';
import DateFormatter from 'src/Globalization/DateFormatter';

describe('Globalization.DateFormatter', () => {
    const formatter = new DateFormatter();
    const date = new Date(Date.parse('June 1, 1977 9:04:02 PM'));

    describe('_standardFormatSpecs', () => {
        it('maps the "d" spec to the "shortDate" format', () => {
            expect(DateFormatter._standardFormatSpecs.get('d')).toEqual(['shortDate']);
        });

        it('maps the "D" spec to the "wideDate" format', () => {
            expect(DateFormatter._standardFormatSpecs.get('D')).toEqual(['wideDate']);
        });

        it('maps the "f" spec to the "wideDate shortTime" format', () => {
            expect(DateFormatter._standardFormatSpecs.get('f')).toEqual(['wideDate', 'shortTime']);
        });

        it('maps the "F" spec to the "dateTime" format', () => {
            expect(DateFormatter._standardFormatSpecs.get('F')).toEqual(['dateTime']);
        });

        it('maps the "g" spec to the "shortDate shortTime" format', () => {
            expect(DateFormatter._standardFormatSpecs.get('g')).toEqual(['shortDate', 'shortTime']);
        });

        it('maps the "G" spec to the "mediumDate mediumTime" format', () => {
            expect(DateFormatter._standardFormatSpecs.get('G')).toEqual(['mediumDate', 'mediumTime']);
        });

        it('maps the "r" spec to the "dateTimeGMT" format', () => {
            expect(DateFormatter._standardFormatSpecs.get('r')).toEqual(['dateTimeGMT']);
        });

        it('maps the "R" spec to the "dateTimeGMT" format', () => {
            expect(DateFormatter._standardFormatSpecs.get('R')).toEqual(['dateTimeGMT']);
        });

        it('maps the "s" spec to the "sortable" format', () => {
            expect(DateFormatter._standardFormatSpecs.get('s')).toEqual(['sortable']);
        });

        it('maps the "t" spec to the "shortTime" format', () => {
            expect(DateFormatter._standardFormatSpecs.get('t')).toEqual(['shortTime']);
        });

        it('maps the "T" spec to the "mediumTime" format', () => {
            expect(DateFormatter._standardFormatSpecs.get('T')).toEqual(['mediumTime']);
        });

        it('maps the "u" spec to the "universal" format', () => {
            expect(DateFormatter._standardFormatSpecs.get('u')).toEqual(['universal']);
        });

        it('maps the "U" spec to the "dateTime" format', () => {
            expect(DateFormatter._standardFormatSpecs.get('U')).toEqual(['dateTime']);
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
            it('correctly formats a Date using the format part "DDDDD"', () => {
                expect(formatter.format(date, 'DDDDD')).toBe('Wednesday');
            });

            it('correctly formats a Date using the format part "DDDD"', () => {
                expect(formatter.format(date, 'DDDD')).toBe('Wed');
            });

            it('correctly formats a Date using the format part "DDD"', () => {
                expect(formatter.format(date, 'DDD')).toBe('We');
            });

            it('correctly formats a Date using the format part "DD"', () => {
                expect(formatter.format(date, 'DD')).toBe('W');
            });

            it('correctly formats a Date using the format part "ddd"', () => {
                expect(formatter.format(date, 'ddd')).toBe('01');
            });

            it('correctly formats a Date using the format part "dd"', () => {
                expect(formatter.format(date, 'dd')).toBe('1');
            });

            it('correctly formats a Date using the format part "MMMMM"', () => {
                expect(formatter.format(date, 'MMMMM')).toBe('June');
            });

            it('correctly formats a Date using the format part "MMMM"', () => {
                expect(formatter.format(date, 'MMMM')).toBe('Jun');
            });

            it('correctly formats a Date using the format part "MMM"', () => {
                expect(formatter.format(date, 'MMM')).toBe('Ju');
            });

            it('correctly formats a Date using the format part "MM"', () => {
                expect(formatter.format(date, 'MM')).toBe('J');
            });

            it('correctly formats a Date using the format part "mmm"', () => {
                expect(formatter.format(date, 'mmm')).toBe('06');
            });

            it('correctly formats a Date using the format part "mm"', () => {
                expect(formatter.format(date, 'mm')).toBe('6');
            });

            it('correctly formats a Date using the format part "yyyyy"', () => {
                expect(formatter.format(date, 'yyyyy')).toBe('1977');
            });

            it('correctly formats a Date using the format part "yyy"', () => {
                expect(formatter.format(date, 'yyy')).toBe('77');
            });

            it('correctly formats a Date using the format part "yy"', () => {
                expect(formatter.format(date, 'yy')).toBe('77');
            });

            it('correctly formats a Date using the format part "hhhhh"', () => {
                expect(formatter.format(date, 'hhhhh')).toBe('21');
            });

            it('correctly formats a Date using the format part "hhhh"', () => {
                expect(formatter.format(date, 'hhhh')).toBe('21');
            });

            it('correctly formats a Date using the format part "hhh"', () => {
                expect(formatter.format(date, 'hhh')).toBe('09');
            });

            it('correctly formats a Date using the format part "hh"', () => {
                expect(formatter.format(date, 'hh')).toBe('9');
            });

            it('correctly formats a Date using the format part "nnn"', () => {
                expect(formatter.format(date, 'nnn')).toBe('04');
            });

            it('correctly formats a Date using the format part "nn"', () => {
                expect(formatter.format(date, 'nn')).toBe('4');
            });

            it('correctly formats a Date using the format part "sss"', () => {
                expect(formatter.format(date, 'sss')).toBe('02');
            });

            it('correctly formats a Date using the format part "ss"', () => {
                expect(formatter.format(date, 'ss')).toBe('2');
            });

            it('correctly formats a Date using the format part "apap"', () => {
                expect(formatter.format(date, 'apap')).toBe('PM');
            });

            it('correctly formats a Date using the format part "ap"', () => {
                expect(formatter.format(date, 'ap')).toBe('P');
            });

            it('correctly formats a Date using the format part "ffff"', () => {
                expect(formatter.format(date, 'ffff')).toBe('000');
            });

            it('correctly formats a Date using the format part "fff"', () => {
                expect(formatter.format(date, 'fff')).toBe('00');
            });

            it('correctly formats a Date using the format part "ff"', () => {
                expect(formatter.format(date, 'ff')).toBe('0');
            });

            xit('correctly formats a Date using the format part "zzz"', () => {
                expect(formatter.format(date, 'zzz')).toBe('-05');
            });

            xit('correctly formats a Date using the format part "zz"', () => {
                expect(formatter.format(date, 'zz')).toBe('-5');
            });

            it('correctly formats a Date using the format spec "d"', () => {
                expect(formatter.format(date, 'd')).toBe('6/1/77');
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
                expect(formatter.format(date, 'g')).toBe('6/1/77 9:04 PM');
            });

            it('correctly formats a Date using the format spec "G"', () => {
                expect(formatter.format(date, 'G')).toBe('06/01/1977 9:04:02 PM');
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

            xit('correctly formats a Date using the format spec "u"', () => {
                expect(formatter.format(date, 'u')).toBe('1977-06-01 21:04:02-05');
            });

            it('correctly formats a Date using the format spec "U"', () => {
                expect(formatter.format(date, 'U')).toBe('Wednesday, June 01, 1977 9:04:02 PM');
            });

            it('correctly formats a Date using the format "dateTime"', () => {
                expect(formatter.format(date, Culture.current.date.format.dateTime)).toBe('Wednesday, June 01, 1977 9:04:02 PM');
            });

            it('correctly formats a Date using the format "dateTimeGMT"', () => {
                expect(formatter.format(date, Culture.current.date.format.dateTimeGMT)).toBe('Wed, 01 Jun 1977 21:04:02 GMT');
            });

            it('correctly formats a Date using the format "wideDate"', () => {
                expect(formatter.format(date, Culture.current.date.format.wideDate)).toBe('Wednesday, June 01, 1977');
            });

            it('correctly formats a Date using the format "mediumDate"', () => {
                expect(formatter.format(date, Culture.current.date.format.mediumDate)).toBe('06/01/1977');
            });

            it('correctly formats a Date using the format "shortDate"', () => {
                expect(formatter.format(date, Culture.current.date.format.shortDate)).toBe('6/1/77');
            });

            it('correctly formats a Date using the format "mediumTime"', () => {
                expect(formatter.format(date, Culture.current.date.format.mediumTime)).toBe('9:04:02 PM');
            });

            it('correctly formats a Date using the format "shortTime"', () => {
                expect(formatter.format(date, Culture.current.date.format.shortTime)).toBe('9:04 PM');
            });

            xit('correctly formats a Date using the format "universal"', () => {
                expect(formatter.format(date, Culture.current.date.format.universal)).toBe('1977-06-01 21:04:02-05');
            });

            it('correctly formats a Date using the format "sortable"', () => {
                expect(formatter.format(date, Culture.current.date.format.sortable)).toBe('1977-06-01T21:04:02');
            });

            it('correctly formats a Date using a custom format containing all multi-character format parts and a variety of literal strings', () => {
                expect(formatter.format(date, 'ffff:ap.apap:sss:nn.nnn:hh.hhh~hhhh.hhhhh:yy.yyy.yyyyy:mm.mmm~MM.MMM.MMMM.MMMMM:ddd~DDD.DDDD.DDDDD UTC GMT ABC '))
                    .toBe('000:P.PM:02:4.04:9.09~21.21:77.77.1977:6.06~J.Ju.Jun.June:01~We.Wed.Wednesday UTC GMT ABC ');
            });
        });
    });

});