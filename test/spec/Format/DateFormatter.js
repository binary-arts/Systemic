//!!! TODO -> fix tests that are time-zone dependant (usine Jasmine date mocking)

import res from 'src/Runtime/Res';

import DateFormatter from 'src/Format/DateFormatter';

const date = new Date(Date.parse('June 1, 1977 9:04:02 PM'));

describe('Format.DateFormatter', () => {
    let rootPath;
    let invariant1;
    let invariant2;
    let enUS1;
    let enUS2;
    let frFR1;
    let frFR2;

    /*jshint ignore:start */
    beforeAll(resume => {
        //!!! TODO -> use jasmine spys to mock an accessor property
        rootPath = res.rootPath;
        res.rootPath = 'base/test';

        async() => {
            [invariant1, enUS1, frFR1] = await Promise.all([
                DateFormatter.invariant,
                DateFormatter.fromLocale('en-US'),
                DateFormatter.fromLocale('fr-FR'),
            ]);

            [invariant2, enUS2, frFR2] = await Promise.all([
                DateFormatter.invariant,
                DateFormatter.fromLocale('en-US'),
                DateFormatter.fromLocale('fr-FR'),
            ]);

            resume();
        }();
    });
    /*jshint ignore:end */

    afterAll(() => {
        res.rootPath = rootPath;
    });

    describe('_cache', () => { });

    describe('invariant', () => {
        it('returns a DateFormatter object with the correct language, locale, and region', () => {
            expect(invariant1.language).toBeNull();
            expect(invariant1.locale).toBe('');
            expect(invariant1.region).toBeNull();
        });

        it('returns a DateFormatter object with a culture matching the invariant culture of the DateFormatter class', () => {
            expect(invariant1._culture).toEqual(DateFormatter._invariantCulture);
        });

        it('returns the same DateFormatter object for each invocation', () => {
            expect(invariant1).toBe(invariant2);
        });
    });

    describe('_invariantCulture', () => {
        it('returns an Object that describes "en-US" format conventions', () => {
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

    describe('_priorityTypes', () => {
        it('returns an Array of expected types', () => {
            expect(DateFormatter._priorityTypes).toEqual([Date]);
        });

        it('returns the same Array on subsequent invocations', () => {
            expect(DateFormatter._priorityTypes).toBe(DateFormatter._priorityTypes);
        });
    });

    describe('_standardFormats', () => {
        it('maps the "d" spec to the "shortDate" format', () => {
            expect(DateFormatter._standardFormats.get('d')).toEqual(['shortDate']);
        });

        it('maps the "D" spec to the "wideDate" format', () => {
            expect(DateFormatter._standardFormats.get('D')).toEqual(['wideDate']);
        });

        it('maps the "f" spec to the "wideDate shortTime" format', () => {
            expect(DateFormatter._standardFormats.get('f')).toEqual(['wideDate', 'shortTime']);
        });

        it('maps the "F" spec to the "dateTime" format', () => {
            expect(DateFormatter._standardFormats.get('F')).toEqual(['dateTime']);
        });

        it('maps the "g" spec to the "shortDate shortTime" format', () => {
            expect(DateFormatter._standardFormats.get('g')).toEqual(['shortDate', 'shortTime']);
        });

        it('maps the "G" spec to the "mediumDate mediumTime" format', () => {
            expect(DateFormatter._standardFormats.get('G')).toEqual(['mediumDate', 'mediumTime']);
        });

        it('maps the "r" spec to the "dateTimeGMT" format', () => {
            expect(DateFormatter._standardFormats.get('r')).toEqual(['dateTimeGMT']);
        });

        it('maps the "R" spec to the "dateTimeGMT" format', () => {
            expect(DateFormatter._standardFormats.get('R')).toEqual(['dateTimeGMT']);
        });

        it('maps the "s" spec to the "sortable" format', () => {
            expect(DateFormatter._standardFormats.get('s')).toEqual(['sortable']);
        });

        it('maps the "t" spec to the "shortTime" format', () => {
            expect(DateFormatter._standardFormats.get('t')).toEqual(['shortTime']);
        });

        it('maps the "T" spec to the "mediumTime" format', () => {
            expect(DateFormatter._standardFormats.get('T')).toEqual(['mediumTime']);
        });

        it('maps the "u" spec to the "universal" format', () => {
            expect(DateFormatter._standardFormats.get('u')).toEqual(['universal']);
        });

        it('maps the "U" spec to the "dateTime" format', () => {
            expect(DateFormatter._standardFormats.get('U')).toEqual(['dateTime']);
        });
    });

    describe('fromLocale()', () => {
        describe('with an invalid locale', () => { });

        describe('with the "en-US" locale', () => {
            it('returns a DateFormatter object with the correct language, locale, and region', () => {
                expect(enUS1.language).toBe('en');
                expect(enUS1.locale).toBe('en-US');
                expect(enUS1.region).toBe('US');
            });

            it('returns the same DateFormatter object for each invocation', () => {
                expect(enUS1).toBe(enUS2);
            });
        });

        describe('with the "fr-FR" locale', () => {
            it('returns a DateFormatter object with the correct language, locale, and region', () => {
                expect(frFR1.language).toBe('fr');
                expect(frFR1.locale).toBe('fr-FR');
                expect(frFR1.region).toBe('FR');
            });

            it('returns the same DateFormatter object for each invocation', () => {
                expect(frFR1).toBe(frFR2);
            });
        });
    });

    describe('format()', () => {
        it('returns null when ref is missing, null, or cannot be coerced to a date', () => {
            expect(invariant1.format(undefined, 'g')).toBeNull();
            expect(invariant1.format(null, 'g')).toBeNull();
            expect(invariant1.format(true, 'g')).toBeNull();
            expect(invariant1.format(0, 'g')).toBeNull();
            expect(invariant1.format('', 'g')).toBeNull();
            expect(invariant1.format([], 'g')).toBeNull();
            expect(invariant1.format({}, 'g')).toBeNull();
        });

        it('returns null if spec is an empty string', () => {
            expect(invariant1.format(date, '')).toBeNull();
        });

        it('returns spec if spec does not contain any formatting parts and is not a standard format spec.', () => {
            expect(invariant1.format(date, 'YO bla')).toBe('YO bla');
        });

        describe('with an invalid locale', () => { });

        describe('with the "en-US" locale', () => {
            it('correctly formats a Date using the format part "DDDDD"', () => {
                expect(enUS1.format(date, 'DDDDD')).toBe('Wednesday');
            });

            it('correctly formats a Date using the format part "DDDD"', () => {
                expect(enUS1.format(date, 'DDDD')).toBe('Wed');
            });

            it('correctly formats a Date using the format part "DDD"', () => {
                expect(enUS1.format(date, 'DDD')).toBe('We');
            });

            it('correctly formats a Date using the format part "DD"', () => {
                expect(enUS1.format(date, 'DD')).toBe('W');
            });

            it('correctly formats a Date using the format part "ddd"', () => {
                expect(enUS1.format(date, 'ddd')).toBe('01');
            });

            it('correctly formats a Date using the format part "dd"', () => {
                expect(enUS1.format(date, 'dd')).toBe('1');
            });

            it('correctly formats a Date using the format part "MMMMM"', () => {
                expect(enUS1.format(date, 'MMMMM')).toBe('June');
            });

            it('correctly formats a Date using the format part "MMMM"', () => {
                expect(enUS1.format(date, 'MMMM')).toBe('Jun');
            });

            it('correctly formats a Date using the format part "MMM"', () => {
                expect(enUS1.format(date, 'MMM')).toBe('Ju');
            });

            it('correctly formats a Date using the format part "MM"', () => {
                expect(enUS1.format(date, 'MM')).toBe('J');
            });

            it('correctly formats a Date using the format part "mmm"', () => {
                expect(enUS1.format(date, 'mmm')).toBe('06');
            });

            it('correctly formats a Date using the format part "mm"', () => {
                expect(enUS1.format(date, 'mm')).toBe('6');
            });

            it('correctly formats a Date using the format part "yyyyy"', () => {
                expect(enUS1.format(date, 'yyyyy')).toBe('1977');
            });

            it('correctly formats a Date using the format part "yyy"', () => {
                expect(enUS1.format(date, 'yyy')).toBe('77');
            });

            it('correctly formats a Date using the format part "yy"', () => {
                expect(enUS1.format(date, 'yy')).toBe('77');
            });

            it('correctly formats a Date using the format part "hhhhh"', () => {
                expect(enUS1.format(date, 'hhhhh')).toBe('21');
            });

            it('correctly formats a Date using the format part "hhhh"', () => {
                expect(enUS1.format(date, 'hhhh')).toBe('21');
            });

            it('correctly formats a Date using the format part "hhh"', () => {
                expect(enUS1.format(date, 'hhh')).toBe('09');
            });

            it('correctly formats a Date using the format part "hh"', () => {
                expect(enUS1.format(date, 'hh')).toBe('9');
            });

            it('correctly formats a Date using the format part "nnn"', () => {
                expect(enUS1.format(date, 'nnn')).toBe('04');
            });

            it('correctly formats a Date using the format part "nn"', () => {
                expect(enUS1.format(date, 'nn')).toBe('4');
            });

            it('correctly formats a Date using the format part "sss"', () => {
                expect(enUS1.format(date, 'sss')).toBe('02');
            });

            it('correctly formats a Date using the format part "ss"', () => {
                expect(enUS1.format(date, 'ss')).toBe('2');
            });

            it('correctly formats a Date using the format part "apap"', () => {
                expect(enUS1.format(date, 'apap')).toBe('PM');
            });

            it('correctly formats a Date using the format part "ap"', () => {
                expect(enUS1.format(date, 'ap')).toBe('P');
            });

            it('correctly formats a Date using the format part "ffff"', () => {
                expect(enUS1.format(date, 'ffff')).toBe('000');
            });

            it('correctly formats a Date using the format part "fff"', () => {
                expect(enUS1.format(date, 'fff')).toBe('00');
            });

            it('correctly formats a Date using the format part "ff"', () => {
                expect(enUS1.format(date, 'ff')).toBe('0');
            });

            xit('correctly formats a Date using the format part "zzz"', () => {
                expect(enUS1.format(date, 'zzz')).toBe('-05');
            });

            xit('correctly formats a Date using the format part "zz"', () => {
                expect(enUS1.format(date, 'zz')).toBe('-5');
            });

            it('correctly formats a Date using the standard format "d"', () => {
                expect(enUS1.format(date, 'd')).toBe('6/1/77');
            });

            it('correctly formats a Date using the standard format "D"', () => {
                expect(enUS1.format(date, 'D')).toBe('Wednesday, June 01, 1977');
            });

            it('correctly formats a Date using the standard format "f"', () => {
                expect(enUS1.format(date, 'f')).toBe('Wednesday, June 01, 1977 9:04 PM');
            });

            it('correctly formats a Date using the standard format "F"', () => {
                expect(enUS1.format(date, 'F')).toBe('Wednesday, June 01, 1977 9:04:02 PM');
            });

            it('correctly formats a Date using the standard format "g"', () => {
                expect(enUS1.format(date, 'g')).toBe('6/1/77 9:04 PM');
            });

            it('correctly formats a Date using the standard format "G"', () => {
                expect(enUS1.format(date, 'G')).toBe('06/01/1977 9:04:02 PM');
            });

            it('correctly formats a Date using the standard format "r"', () => {
                expect(enUS1.format(date, 'r')).toBe('Wed, 01 Jun 1977 21:04:02 GMT');
            });

            it('correctly formats a Date using the standard format "R"', () => {
                expect(enUS1.format(date, 'R')).toBe('Wed, 01 Jun 1977 21:04:02 GMT');
            });

            it('correctly formats a Date using the standard format "s"', () => {
                expect(enUS1.format(date, 's')).toBe('1977-06-01T21:04:02');
            });

            it('correctly formats a Date using the standard format "t"', () => {
                expect(enUS1.format(date, 't')).toBe('9:04 PM');
            });

            it('correctly formats a Date using the standard format "T"', () => {
                expect(enUS1.format(date, 'T')).toBe('9:04:02 PM');
            });

            xit('correctly formats a Date using the standard format "u"', () => {
                expect(enUS1.format(date, 'u')).toBe('1977-06-01 21:04:02-05');
            });

            it('correctly formats a Date using the standard format "U"', () => {
                expect(enUS1.format(date, 'U')).toBe('Wednesday, June 01, 1977 9:04:02 PM');
            });

            it('correctly formats a Date using the format "dateTime"', () => {
                expect(enUS1.format(date, enUS1._culture.format.dateTime)).toBe('Wednesday, June 01, 1977 9:04:02 PM');
            });

            it('correctly formats a Date using the format "dateTimeGMT"', () => {
                expect(enUS1.format(date, enUS1._culture.format.dateTimeGMT)).toBe('Wed, 01 Jun 1977 21:04:02 GMT');
            });

            it('correctly formats a Date using the format "wideDate"', () => {
                expect(enUS1.format(date, enUS1._culture.format.wideDate)).toBe('Wednesday, June 01, 1977');
            });

            it('correctly formats a Date using the format "mediumDate"', () => {
                expect(enUS1.format(date, enUS1._culture.format.mediumDate)).toBe('06/01/1977');
            });

            it('correctly formats a Date using the format "shortDate"', () => {
                expect(enUS1.format(date, enUS1._culture.format.shortDate)).toBe('6/1/77');
            });

            it('correctly formats a Date using the format "mediumTime"', () => {
                expect(enUS1.format(date, enUS1._culture.format.mediumTime)).toBe('9:04:02 PM');
            });

            it('correctly formats a Date using the format "shortTime"', () => {
                expect(enUS1.format(date, enUS1._culture.format.shortTime)).toBe('9:04 PM');
            });

            xit('correctly formats a Date using the format "universal"', () => {
                expect(enUS1.format(date, enUS1._culture.format.universal)).toBe('1977-06-01 21:04:02-05');
            });

            it('correctly formats a Date using the format "sortable"', () => {
                expect(enUS1.format(date, enUS1._culture.format.sortable)).toBe('1977-06-01T21:04:02');
            });

            it('correctly formats a Date using a custom format containing all format parts and a variety of literal strings', () => {
                expect(enUS1.format(date, 'ffff:ap.apap:sss:nn.nnn:hh.hhh~hhhh.hhhhh:yy.yyy.yyyyy:mm.mmm~MM.MMM.MMMM.MMMMM:ddd~DDD.DDDD.DDDDD UTC GMT ABC '))
                    .toBe('000:P.PM:02:4.04:9.09~21.21:77.77.1977:6.06~J.Ju.Jun.June:01~We.Wed.Wednesday UTC GMT ABC ');
            });
        });

        describe('with the "fr-FR" locale', () => {
            it('correctly formats a Date using the format part "DDDDD"', () => {
                expect(frFR1.format(date, 'DDDDD')).toBe('mercredi');
            });

            it('correctly formats a Date using the format part "DDDD"', () => {
                expect(frFR1.format(date, 'DDDD')).toBe('mer.');
            });

            it('correctly formats a Date using the format part "DDD"', () => {
                expect(frFR1.format(date, 'DDD')).toBe('me');
            });

            it('correctly formats a Date using the format part "DD"', () => {
                expect(frFR1.format(date, 'DD')).toBe('M');
            });

            it('correctly formats a Date using the format part "ddd"', () => {
                expect(frFR1.format(date, 'ddd')).toBe('01');
            });

            it('correctly formats a Date using the format part "dd"', () => {
                expect(frFR1.format(date, 'dd')).toBe('1');
            });

            it('correctly formats a Date using the format part "MMMMM"', () => {
                expect(frFR1.format(date, 'MMMMM')).toBe('juin');
            });

            it('correctly formats a Date using the format part "MMMM"', () => {
                expect(frFR1.format(date, 'MMMM')).toBe('jui.');
            });

            it('correctly formats a Date using the format part "MMM"', () => {
                expect(frFR1.format(date, 'MMM')).toBe('ju');
            });

            it('correctly formats a Date using the format part "MM"', () => {
                expect(frFR1.format(date, 'MM')).toBe('J');
            });

            it('correctly formats a Date using the format part "mmm"', () => {
                expect(frFR1.format(date, 'mmm')).toBe('06');
            });

            it('correctly formats a Date using the format part "mm"', () => {
                expect(frFR1.format(date, 'mm')).toBe('6');
            });

            it('correctly formats a Date using the format part "yyyyy"', () => {
                expect(frFR1.format(date, 'yyyyy')).toBe('1977');
            });

            it('correctly formats a Date using the format part "yyy"', () => {
                expect(frFR1.format(date, 'yyy')).toBe('77');
            });

            it('correctly formats a Date using the format part "yy"', () => {
                expect(frFR1.format(date, 'yy')).toBe('77');
            });

            it('correctly formats a Date using the format part "hhhhh"', () => {
                expect(frFR1.format(date, 'hhhhh')).toBe('21');
            });

            it('correctly formats a Date using the format part "hhhh"', () => {
                expect(frFR1.format(date, 'hhhh')).toBe('21');
            });

            it('correctly formats a Date using the format part "hhh"', () => {
                expect(frFR1.format(date, 'hhh')).toBe('09');
            });

            it('correctly formats a Date using the format part "hh"', () => {
                expect(frFR1.format(date, 'hh')).toBe('9');
            });

            it('correctly formats a Date using the format part "nnn"', () => {
                expect(frFR1.format(date, 'nnn')).toBe('04');
            });

            it('correctly formats a Date using the format part "nn"', () => {
                expect(frFR1.format(date, 'nn')).toBe('4');
            });

            it('correctly formats a Date using the format part "sss"', () => {
                expect(frFR1.format(date, 'sss')).toBe('02');
            });

            it('correctly formats a Date using the format part "ss"', () => {
                expect(frFR1.format(date, 'ss')).toBe('2');
            });

            it('correctly formats a Date using the format part "apap"', () => {
                expect(frFR1.format(date, 'apap')).toBe('PM');
            });

            it('correctly formats a Date using the format part "ap"', () => {
                expect(frFR1.format(date, 'ap')).toBe('P');
            });

            it('correctly formats a Date using the format part "ffff"', () => {
                expect(frFR1.format(date, 'ffff')).toBe('000');
            });

            it('correctly formats a Date using the format part "fff"', () => {
                expect(frFR1.format(date, 'fff')).toBe('00');
            });

            it('correctly formats a Date using the format part "ff"', () => {
                expect(frFR1.format(date, 'ff')).toBe('0');
            });

            xit('correctly formats a Date using the format part "zzz"', () => {
                expect(frFR1.format(date, 'zzz')).toBe('-05');
            });

            xit('correctly formats a Date using the format part "zz"', () => {
                expect(frFR1.format(date, 'zz')).toBe('-5');
            });

            it('correctly formats a Date using the standard format "d"', () => {
                expect(frFR1.format(date, 'd')).toBe('1/6/77');
            });

            it('correctly formats a Date using the standard format "D"', () => {
                expect(frFR1.format(date, 'D')).toBe('mercredi 01 juin 1977');
            });

            it('correctly formats a Date using the standard format "f"', () => {
                expect(frFR1.format(date, 'f')).toBe('mercredi 01 juin 1977 9:04 PM');
            });

            it('correctly formats a Date using the standard format "F"', () => {
                expect(frFR1.format(date, 'F')).toBe('mercredi 01 juin 1977 9:04:02 PM');
            });

            it('correctly formats a Date using the standard format "g"', () => {
                expect(frFR1.format(date, 'g')).toBe('1/6/77 9:04 PM');
            });

            it('correctly formats a Date using the standard format "G"', () => {
                expect(frFR1.format(date, 'G')).toBe('01/06/1977 9:04:02 PM');
            });

            it('correctly formats a Date using the standard format "r"', () => {
                expect(frFR1.format(date, 'r')).toBe('mer. 01 jui. 1977 21:04:02 \'UTC\'');
            });

            it('correctly formats a Date using the standard format "R"', () => {
                expect(frFR1.format(date, 'R')).toBe('mer. 01 jui. 1977 21:04:02 \'UTC\'');
            });

            it('correctly formats a Date using the standard format "s"', () => {
                expect(frFR1.format(date, 's')).toBe('1977-06-01T21:04:02');
            });

            it('correctly formats a Date using the standard format "t"', () => {
                expect(frFR1.format(date, 't')).toBe('9:04 PM');
            });

            it('correctly formats a Date using the standard format "T"', () => {
                expect(frFR1.format(date, 'T')).toBe('9:04:02 PM');
            });

            xit('correctly formats a Date using the standard format "u"', () => {
                expect(frFR1.format(date, 'u')).toBe('1977-06-01 21:04:02-05');
            });

            it('correctly formats a Date using the standard format "U"', () => {
                expect(frFR1.format(date, 'U')).toBe('mercredi 01 juin 1977 9:04:02 PM');
            });

            it('correctly formats a Date using the format "dateTime"', () => {
                expect(frFR1.format(date, frFR1._culture.format.dateTime)).toBe('mercredi 01 juin 1977 9:04:02 PM');
            });

            it('correctly formats a Date using the format "dateTimeGMT"', () => {
                expect(frFR1.format(date, frFR1._culture.format.dateTimeGMT)).toBe('mer. 01 jui. 1977 21:04:02 \'UTC\'');
            });

            it('correctly formats a Date using the format "wideDate"', () => {
                expect(frFR1.format(date, frFR1._culture.format.wideDate)).toBe('mercredi 01 juin 1977');
            });

            it('correctly formats a Date using the format "mediumDate"', () => {
                expect(frFR1.format(date, frFR1._culture.format.mediumDate)).toBe('01/06/1977');
            });

            it('correctly formats a Date using the format "shortDate"', () => {
                expect(frFR1.format(date, frFR1._culture.format.shortDate)).toBe('1/6/77');
            });

            it('correctly formats a Date using the format "mediumTime"', () => {
                expect(frFR1.format(date, frFR1._culture.format.mediumTime)).toBe('9:04:02 PM');
            });

            it('correctly formats a Date using the format "shortTime"', () => {
                expect(frFR1.format(date, frFR1._culture.format.shortTime)).toBe('9:04 PM');
            });

            xit('correctly formats a Date using the format "universal"', () => {
                expect(frFR1.format(date, frFR1._culture.format.universal)).toBe('1977-06-01 21:04:02-05');
            });

            it('correctly formats a Date using the format "sortable"', () => {
                expect(frFR1.format(date, frFR1._culture.format.sortable)).toBe('1977-06-01T21:04:02');
            });

            it('correctly formats a Date using a custom format containing all format parts and a variety of literal strings', () => {
                expect(frFR1.format(date, 'ffff:ap.apap:sss:nn.nnn:hh.hhh~hhhh.hhhhh:yy.yyy.yyyyy:mm.mmm~MM.MMM.MMMM.MMMMM:ddd~DDD.DDDD.DDDDD UTC GMT ABC '))
                    .toBe('000:P.PM:02:4.04:9.09~21.21:77.77.1977:6.06~J.ju.jui..juin:01~me.mer..mercredi UTC GMT ABC ');
            });
        });
    });
});