//!!! TODO -> fix tests that are time-zone dependant (usine Jasmine date mocking)

import res from 'src/Runtime/Res';

import DateFormatter from 'src/Text/DateFormatter';

describe('Format.DateFormatter', () => {
    const date = new Date(Date.parse('June 1, 1977 9:04:02 PM'));

    let rootPath;
    let invariant;
    let enUS;
    let frFR;

    beforeAll(resume => {
        //!!! TODO -> use jasmine spys to mock an accessor property
        rootPath = res.rootPath;
        res.rootPath = 'base/test';

        (async () => {
            invariant = await DateFormatter.invariant;

            [enUS, frFR] = await Promise.all([
                DateFormatter.fromLocale('en-US'),
                DateFormatter.fromLocale('fr-FR')
            ]);

            resume();
        })();
    });

    afterAll(() => {
        res.rootPath = rootPath;
    });

    describe('invariantCulture', () => {
        it('returns an object that describes "en-US" format conventions', () => {
            expect(DateFormatter._invariantCulture).toEqual({
                amPeriod: 'AM',
                pmPeriod: 'PM',

                dateSeparator: '/',
                joinSeperator: '-',
                partSeperator: ',',
                timeSeparator: ':',
                wordSeperator: ' ',

                firstDayOfWeek: 0,

                wideMonthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December', ''],
                mediumMonthNames: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', ''],
                shortMonthNames: ['Ja', 'Fe', 'Ma', 'Ap', 'Ma', 'Ju', 'Jl', 'Au', 'Se', 'Oc', 'No', 'De', ''],
                narrowMonthNames: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D', ''],

                wideDayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
                mediumDayNames: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                shortDayNames: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
                narrowDayNames: ['S', 'M', 'T', 'W', 'Th', 'F', 'S'],

                format: {
                    dateTime: 'DDDDD{,}{ }MMMMM{ }ddd{,}{ }yyyyy{ }hh{:}nnn{:}sss{ }apap',
                    dateTimeGMT: 'DDDD{,}{ }ddd{ }MMMM{ }yyyyy{ }hhhhh{:}nnn{:}sss{ }GMT',

                    wideDate: 'DDDDD{,}{ }MMMMM{ }ddd{,}{ }yyyyy',
                    mediumDate: 'mmm{/}ddd{/}yyyyy',
                    shortDate: 'mm{/}dd{/}yyy',

                    mediumTime: 'hh{:}nnn{:}sss{ }apap',
                    shortTime: 'hh{:}nnn{ }apap',

                    sortable: 'yyyyy{-}mmm{-}dddThhhhh{:}nnn{:}sss',
                    universal: 'yyyyy{-}mmm{-}ddd hhhhh{:}nnn{:}ssszzz'
                }
            });
        });
    });

    describe('priorityTypes', () => {
        it('returns an Array of expected types', () => {
            expect(DateFormatter.priorityTypes).toEqual([Date]);
        });

        it('returns the same Array on subsequent invocations', () => {
            expect(DateFormatter.priorityTypes).toBe(DateFormatter.priorityTypes);
        });
    });

    describe('standardFormats', () => {
        it('maps the "d" spec to the "shortDate" format', () => {
            expect(DateFormatter.standardFormats.get('d')).toEqual(['shortDate']);
        });

        it('maps the "D" spec to the "wideDate" format', () => {
            expect(DateFormatter.standardFormats.get('D')).toEqual(['wideDate']);
        });

        it('maps the "f" spec to the "wideDate shortTime" format', () => {
            expect(DateFormatter.standardFormats.get('f')).toEqual(['wideDate', 'shortTime']);
        });

        it('maps the "F" spec to the "dateTime" format', () => {
            expect(DateFormatter.standardFormats.get('F')).toEqual(['dateTime']);
        });

        it('maps the "g" spec to the "shortDate shortTime" format', () => {
            expect(DateFormatter.standardFormats.get('g')).toEqual(['shortDate', 'shortTime']);
        });

        it('maps the "G" spec to the "mediumDate mediumTime" format', () => {
            expect(DateFormatter.standardFormats.get('G')).toEqual(['mediumDate', 'mediumTime']);
        });

        it('maps the "r" spec to the "dateTimeGMT" format', () => {
            expect(DateFormatter.standardFormats.get('r')).toEqual(['dateTimeGMT']);
        });

        it('maps the "R" spec to the "dateTimeGMT" format', () => {
            expect(DateFormatter.standardFormats.get('R')).toEqual(['dateTimeGMT']);
        });

        it('maps the "s" spec to the "sortable" format', () => {
            expect(DateFormatter.standardFormats.get('s')).toEqual(['sortable']);
        });

        it('maps the "t" spec to the "shortTime" format', () => {
            expect(DateFormatter.standardFormats.get('t')).toEqual(['shortTime']);
        });

        it('maps the "T" spec to the "mediumTime" format', () => {
            expect(DateFormatter.standardFormats.get('T')).toEqual(['mediumTime']);
        });

        it('maps the "u" spec to the "universal" format', () => {
            expect(DateFormatter.standardFormats.get('u')).toEqual(['universal']);
        });

        it('maps the "U" spec to the "dateTime" format', () => {
            expect(DateFormatter.standardFormats.get('U')).toEqual(['dateTime']);
        });
    });

    describe('format()', () => {
        it('returns null when ref is missing, null, or cannot be coerced to a date', () => {
            expect(invariant.format(undefined, 'g')).toBeNull();
            expect(invariant.format(null, 'g')).toBeNull();
            expect(invariant.format(true, 'g')).toBeNull();
            expect(invariant.format(0, 'g')).toBeNull();
            expect(invariant.format('', 'g')).toBeNull();
            expect(invariant.format([], 'g')).toBeNull();
            expect(invariant.format({}, 'g')).toBeNull();
        });

        it('returns null if spec is an empty string', () => {
            expect(invariant.format(date, '')).toBeNull();
        });

        it('returns spec if spec does not contain any formatting parts and is not a standard format spec.', () => {
            expect(invariant.format(date, 'YO bla')).toBe('YO bla');
        });

        describe('with an invalid locale', () => { });

        describe('with the "en-US" locale', () => {
            it('correctly formats a Date using the format part "DDDDD"', () => {
                expect(enUS.format(date, 'DDDDD')).toBe('Wednesday');
            });

            it('correctly formats a Date using the format part "DDDD"', () => {
                expect(enUS.format(date, 'DDDD')).toBe('Wed');
            });

            it('correctly formats a Date using the format part "DDD"', () => {
                expect(enUS.format(date, 'DDD')).toBe('We');
            });

            it('correctly formats a Date using the format part "DD"', () => {
                expect(enUS.format(date, 'DD')).toBe('W');
            });

            it('correctly formats a Date using the format part "ddd"', () => {
                expect(enUS.format(date, 'ddd')).toBe('01');
            });

            it('correctly formats a Date using the format part "dd"', () => {
                expect(enUS.format(date, 'dd')).toBe('1');
            });

            it('correctly formats a Date using the format part "MMMMM"', () => {
                expect(enUS.format(date, 'MMMMM')).toBe('June');
            });

            it('correctly formats a Date using the format part "MMMM"', () => {
                expect(enUS.format(date, 'MMMM')).toBe('Jun');
            });

            it('correctly formats a Date using the format part "MMM"', () => {
                expect(enUS.format(date, 'MMM')).toBe('Ju');
            });

            it('correctly formats a Date using the format part "MM"', () => {
                expect(enUS.format(date, 'MM')).toBe('J');
            });

            it('correctly formats a Date using the format part "mmm"', () => {
                expect(enUS.format(date, 'mmm')).toBe('06');
            });

            it('correctly formats a Date using the format part "mm"', () => {
                expect(enUS.format(date, 'mm')).toBe('6');
            });

            it('correctly formats a Date using the format part "yyyyy"', () => {
                expect(enUS.format(date, 'yyyyy')).toBe('1977');
            });

            it('correctly formats a Date using the format part "yyy"', () => {
                expect(enUS.format(date, 'yyy')).toBe('77');
            });

            it('correctly formats a Date using the format part "yy"', () => {
                expect(enUS.format(date, 'yy')).toBe('77');
            });

            it('correctly formats a Date using the format part "hhhhh"', () => {
                expect(enUS.format(date, 'hhhhh')).toBe('21');
            });

            it('correctly formats a Date using the format part "hhhh"', () => {
                expect(enUS.format(date, 'hhhh')).toBe('21');
            });

            it('correctly formats a Date using the format part "hhh"', () => {
                expect(enUS.format(date, 'hhh')).toBe('09');
            });

            it('correctly formats a Date using the format part "hh"', () => {
                expect(enUS.format(date, 'hh')).toBe('9');
            });

            it('correctly formats a Date using the format part "nnn"', () => {
                expect(enUS.format(date, 'nnn')).toBe('04');
            });

            it('correctly formats a Date using the format part "nn"', () => {
                expect(enUS.format(date, 'nn')).toBe('4');
            });

            it('correctly formats a Date using the format part "sss"', () => {
                expect(enUS.format(date, 'sss')).toBe('02');
            });

            it('correctly formats a Date using the format part "ss"', () => {
                expect(enUS.format(date, 'ss')).toBe('2');
            });

            it('correctly formats a Date using the format part "apap"', () => {
                expect(enUS.format(date, 'apap')).toBe('PM');
            });

            it('correctly formats a Date using the format part "ap"', () => {
                expect(enUS.format(date, 'ap')).toBe('P');
            });

            it('correctly formats a Date using the format part "ffff"', () => {
                expect(enUS.format(date, 'ffff')).toBe('000');
            });

            it('correctly formats a Date using the format part "fff"', () => {
                expect(enUS.format(date, 'fff')).toBe('00');
            });

            it('correctly formats a Date using the format part "ff"', () => {
                expect(enUS.format(date, 'ff')).toBe('0');
            });

            xit('correctly formats a Date using the format part "zzz"', () => {
                expect(enUS.format(date, 'zzz')).toBe('-05');
            });

            xit('correctly formats a Date using the format part "zz"', () => {
                expect(enUS.format(date, 'zz')).toBe('-5');
            });

            it('correctly formats a Date using the standard format "d"', () => {
                expect(enUS.format(date, 'd')).toBe('6/1/77');
            });

            it('correctly formats a Date using the standard format "D"', () => {
                expect(enUS.format(date, 'D')).toBe('Wednesday, June 01, 1977');
            });

            it('correctly formats a Date using the standard format "f"', () => {
                expect(enUS.format(date, 'f')).toBe('Wednesday, June 01, 1977 9:04 PM');
            });

            it('correctly formats a Date using the standard format "F"', () => {
                expect(enUS.format(date, 'F')).toBe('Wednesday, June 01, 1977 9:04:02 PM');
            });

            it('correctly formats a Date using the standard format "g"', () => {
                expect(enUS.format(date, 'g')).toBe('6/1/77 9:04 PM');
            });

            it('correctly formats a Date using the standard format "G"', () => {
                expect(enUS.format(date, 'G')).toBe('06/01/1977 9:04:02 PM');
            });

            it('correctly formats a Date using the standard format "r"', () => {
                expect(enUS.format(date, 'r')).toBe('Wed, 01 Jun 1977 21:04:02 GMT');
            });

            it('correctly formats a Date using the standard format "R"', () => {
                expect(enUS.format(date, 'R')).toBe('Wed, 01 Jun 1977 21:04:02 GMT');
            });

            it('correctly formats a Date using the standard format "s"', () => {
                expect(enUS.format(date, 's')).toBe('1977-06-01T21:04:02');
            });

            it('correctly formats a Date using the standard format "t"', () => {
                expect(enUS.format(date, 't')).toBe('9:04 PM');
            });

            it('correctly formats a Date using the standard format "T"', () => {
                expect(enUS.format(date, 'T')).toBe('9:04:02 PM');
            });

            xit('correctly formats a Date using the standard format "u"', () => {
                expect(enUS.format(date, 'u')).toBe('1977-06-01 21:04:02-05');
            });

            it('correctly formats a Date using the standard format "U"', () => {
                expect(enUS.format(date, 'U')).toBe('Wednesday, June 01, 1977 9:04:02 PM');
            });

            it('correctly formats a Date using the format "dateTime"', () => {
                expect(enUS.format(date, enUS.culture.format.dateTime)).toBe('Wednesday, June 01, 1977 9:04:02 PM');
            });

            it('correctly formats a Date using the format "dateTimeGMT"', () => {
                expect(enUS.format(date, enUS.culture.format.dateTimeGMT)).toBe('Wed, 01 Jun 1977 21:04:02 GMT');
            });

            it('correctly formats a Date using the format "wideDate"', () => {
                expect(enUS.format(date, enUS.culture.format.wideDate)).toBe('Wednesday, June 01, 1977');
            });

            it('correctly formats a Date using the format "mediumDate"', () => {
                expect(enUS.format(date, enUS.culture.format.mediumDate)).toBe('06/01/1977');
            });

            it('correctly formats a Date using the format "shortDate"', () => {
                expect(enUS.format(date, enUS.culture.format.shortDate)).toBe('6/1/77');
            });

            it('correctly formats a Date using the format "mediumTime"', () => {
                expect(enUS.format(date, enUS.culture.format.mediumTime)).toBe('9:04:02 PM');
            });

            it('correctly formats a Date using the format "shortTime"', () => {
                expect(enUS.format(date, enUS.culture.format.shortTime)).toBe('9:04 PM');
            });

            xit('correctly formats a Date using the format "universal"', () => {
                expect(enUS.format(date, enUS.culture.format.universal)).toBe('1977-06-01 21:04:02-05');
            });

            it('correctly formats a Date using the format "sortable"', () => {
                expect(enUS.format(date, enUS.culture.format.sortable)).toBe('1977-06-01T21:04:02');
            });

            it('correctly formats a Date using a custom format containing all format parts and a variety of literal strings', () => {
                expect(enUS.format(date, 'ffff:ap.apap:sss:nn.nnn:hh.hhh~hhhh.hhhhh:yy.yyy.yyyyy:mm.mmm~MM.MMM.MMMM.MMMMM:ddd~DDD.DDDD.DDDDD UTC GMT ABC '))
                    .toBe('000:P.PM:02:4.04:9.09~21.21:77.77.1977:6.06~J.Ju.Jun.June:01~We.Wed.Wednesday UTC GMT ABC ');
            });
        });

        describe('with the "fr-FR" locale', () => {
            it('correctly formats a Date using the format part "DDDDD"', () => {
                expect(frFR.format(date, 'DDDDD')).toBe('mercredi');
            });

            it('correctly formats a Date using the format part "DDDD"', () => {
                expect(frFR.format(date, 'DDDD')).toBe('mer.');
            });

            it('correctly formats a Date using the format part "DDD"', () => {
                expect(frFR.format(date, 'DDD')).toBe('me');
            });

            it('correctly formats a Date using the format part "DD"', () => {
                expect(frFR.format(date, 'DD')).toBe('M');
            });

            it('correctly formats a Date using the format part "ddd"', () => {
                expect(frFR.format(date, 'ddd')).toBe('01');
            });

            it('correctly formats a Date using the format part "dd"', () => {
                expect(frFR.format(date, 'dd')).toBe('1');
            });

            it('correctly formats a Date using the format part "MMMMM"', () => {
                expect(frFR.format(date, 'MMMMM')).toBe('juin');
            });

            it('correctly formats a Date using the format part "MMMM"', () => {
                expect(frFR.format(date, 'MMMM')).toBe('jui.');
            });

            it('correctly formats a Date using the format part "MMM"', () => {
                expect(frFR.format(date, 'MMM')).toBe('ju');
            });

            it('correctly formats a Date using the format part "MM"', () => {
                expect(frFR.format(date, 'MM')).toBe('J');
            });

            it('correctly formats a Date using the format part "mmm"', () => {
                expect(frFR.format(date, 'mmm')).toBe('06');
            });

            it('correctly formats a Date using the format part "mm"', () => {
                expect(frFR.format(date, 'mm')).toBe('6');
            });

            it('correctly formats a Date using the format part "yyyyy"', () => {
                expect(frFR.format(date, 'yyyyy')).toBe('1977');
            });

            it('correctly formats a Date using the format part "yyy"', () => {
                expect(frFR.format(date, 'yyy')).toBe('77');
            });

            it('correctly formats a Date using the format part "yy"', () => {
                expect(frFR.format(date, 'yy')).toBe('77');
            });

            it('correctly formats a Date using the format part "hhhhh"', () => {
                expect(frFR.format(date, 'hhhhh')).toBe('21');
            });

            it('correctly formats a Date using the format part "hhhh"', () => {
                expect(frFR.format(date, 'hhhh')).toBe('21');
            });

            it('correctly formats a Date using the format part "hhh"', () => {
                expect(frFR.format(date, 'hhh')).toBe('09');
            });

            it('correctly formats a Date using the format part "hh"', () => {
                expect(frFR.format(date, 'hh')).toBe('9');
            });

            it('correctly formats a Date using the format part "nnn"', () => {
                expect(frFR.format(date, 'nnn')).toBe('04');
            });

            it('correctly formats a Date using the format part "nn"', () => {
                expect(frFR.format(date, 'nn')).toBe('4');
            });

            it('correctly formats a Date using the format part "sss"', () => {
                expect(frFR.format(date, 'sss')).toBe('02');
            });

            it('correctly formats a Date using the format part "ss"', () => {
                expect(frFR.format(date, 'ss')).toBe('2');
            });

            it('correctly formats a Date using the format part "apap"', () => {
                expect(frFR.format(date, 'apap')).toBe('PM');
            });

            it('correctly formats a Date using the format part "ap"', () => {
                expect(frFR.format(date, 'ap')).toBe('P');
            });

            it('correctly formats a Date using the format part "ffff"', () => {
                expect(frFR.format(date, 'ffff')).toBe('000');
            });

            it('correctly formats a Date using the format part "fff"', () => {
                expect(frFR.format(date, 'fff')).toBe('00');
            });

            it('correctly formats a Date using the format part "ff"', () => {
                expect(frFR.format(date, 'ff')).toBe('0');
            });

            xit('correctly formats a Date using the format part "zzz"', () => {
                expect(frFR.format(date, 'zzz')).toBe('-05');
            });

            xit('correctly formats a Date using the format part "zz"', () => {
                expect(frFR.format(date, 'zz')).toBe('-5');
            });

            it('correctly formats a Date using the standard format "d"', () => {
                expect(frFR.format(date, 'd')).toBe('1/6/77');
            });

            it('correctly formats a Date using the standard format "D"', () => {
                expect(frFR.format(date, 'D')).toBe('mercredi 01 juin 1977');
            });

            it('correctly formats a Date using the standard format "f"', () => {
                expect(frFR.format(date, 'f')).toBe('mercredi 01 juin 1977 9:04 PM');
            });

            it('correctly formats a Date using the standard format "F"', () => {
                expect(frFR.format(date, 'F')).toBe('mercredi 01 juin 1977 9:04:02 PM');
            });

            it('correctly formats a Date using the standard format "g"', () => {
                expect(frFR.format(date, 'g')).toBe('1/6/77 9:04 PM');
            });

            it('correctly formats a Date using the standard format "G"', () => {
                expect(frFR.format(date, 'G')).toBe('01/06/1977 9:04:02 PM');
            });

            it('correctly formats a Date using the standard format "r"', () => {
                expect(frFR.format(date, 'r')).toBe('mer. 01 jui. 1977 21:04:02 \'UTC\'');
            });

            it('correctly formats a Date using the standard format "R"', () => {
                expect(frFR.format(date, 'R')).toBe('mer. 01 jui. 1977 21:04:02 \'UTC\'');
            });

            it('correctly formats a Date using the standard format "s"', () => {
                expect(frFR.format(date, 's')).toBe('1977-06-01T21:04:02');
            });

            it('correctly formats a Date using the standard format "t"', () => {
                expect(frFR.format(date, 't')).toBe('9:04 PM');
            });

            it('correctly formats a Date using the standard format "T"', () => {
                expect(frFR.format(date, 'T')).toBe('9:04:02 PM');
            });

            xit('correctly formats a Date using the standard format "u"', () => {
                expect(frFR.format(date, 'u')).toBe('1977-06-01 21:04:02-05');
            });

            it('correctly formats a Date using the standard format "U"', () => {
                expect(frFR.format(date, 'U')).toBe('mercredi 01 juin 1977 9:04:02 PM');
            });

            it('correctly formats a Date using the format "dateTime"', () => {
                expect(frFR.format(date, frFR.culture.format.dateTime)).toBe('mercredi 01 juin 1977 9:04:02 PM');
            });

            it('correctly formats a Date using the format "dateTimeGMT"', () => {
                expect(frFR.format(date, frFR.culture.format.dateTimeGMT)).toBe('mer. 01 jui. 1977 21:04:02 \'UTC\'');
            });

            it('correctly formats a Date using the format "wideDate"', () => {
                expect(frFR.format(date, frFR.culture.format.wideDate)).toBe('mercredi 01 juin 1977');
            });

            it('correctly formats a Date using the format "mediumDate"', () => {
                expect(frFR.format(date, frFR.culture.format.mediumDate)).toBe('01/06/1977');
            });

            it('correctly formats a Date using the format "shortDate"', () => {
                expect(frFR.format(date, frFR.culture.format.shortDate)).toBe('1/6/77');
            });

            it('correctly formats a Date using the format "mediumTime"', () => {
                expect(frFR.format(date, frFR.culture.format.mediumTime)).toBe('9:04:02 PM');
            });

            it('correctly formats a Date using the format "shortTime"', () => {
                expect(frFR.format(date, frFR.culture.format.shortTime)).toBe('9:04 PM');
            });

            xit('correctly formats a Date using the format "universal"', () => {
                expect(frFR.format(date, frFR.culture.format.universal)).toBe('1977-06-01 21:04:02-05');
            });

            it('correctly formats a Date using the format "sortable"', () => {
                expect(frFR.format(date, frFR.culture.format.sortable)).toBe('1977-06-01T21:04:02');
            });

            it('correctly formats a Date using a custom format containing all format parts and a variety of literal strings', () => {
                expect(frFR.format(date, 'ffff:ap.apap:sss:nn.nnn:hh.hhh~hhhh.hhhhh:yy.yyy.yyyyy:mm.mmm~MM.MMM.MMMM.MMMMM:ddd~DDD.DDDD.DDDDD UTC GMT ABC '))
                    .toBe('000:P.PM:02:4.04:9.09~21.21:77.77.1977:6.06~J.ju.jui..juin:01~me.mer..mercredi UTC GMT ABC ');
            });
        });
    });
});