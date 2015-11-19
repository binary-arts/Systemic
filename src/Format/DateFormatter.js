import as from '../Runtime/As';
import is from '../Runtime/Is';

import Debug from '../Diagnostics/Debug';
import Formatter from './Formatter';

/**
 * TODO
 */
export default class DateFormatter extends Formatter {
    //#region Type

    //#region Properties

    /**
     * Gets locale-independent (invariant) format conventions for the DateFormatter class.
     *
     * @protected @static @override
     *
     * @returns { !Object }
     *      The invariant format conventions for the DateFormatter class. DateFormatter objects will
     *      apply these conventions during format operations unless language- or region- specific values
     *      are declared in the associated formatter configuration files. Values may be individually
     *      overridden. The object returned by this property conforms to 'en-US' format conventions.
     */
    static get invariantCulture() {
        return DateFormatter._invariantCulture || (DateFormatter._invariantCulture = {
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
    }

    /**
     * TODO
     *
     * @public @static @override
     *
     * @returns { !Array.<!T> }
     *      TODO
     */
    static get priorityTypes() {
        return DateFormatter._dateFormatterPriorityTypes || (DateFormatter._dateFormatterPriorityTypes = [Date]);
    }

    /**
     * TODO
     *
     * @private @static
     *
     * @returns { !Map.<!String, !Array.<!String>> }
     *      TODO
     */
    static get standardFormats() {
        return DateFormatter._standardFormats || (DateFormatter._standardFormats = new Map([
            ['d', ['shortDate']],
            ['D', ['wideDate']],
            ['f', ['wideDate', 'shortTime']],
            ['F', ['dateTime']],
            ['g', ['shortDate', 'shortTime']],
            ['G', ['mediumDate', 'mediumTime']],
            ['r', ['dateTimeGMT']],
            ['R', ['dateTimeGMT']],
            ['s', ['sortable']],
            ['t', ['shortTime']],
            ['T', ['mediumTime']],
            ['u', ['universal']],
            ['U', ['dateTime']]
        ]));
    }

    //#endregion

    //#region Methods

    /**
     * TODO
     *
     * @protected @static @override
     *
     * @param { !Object }
     *      TODO
     */
    static validate(culture) {
        Debug.assert(is(culture).anObject);

        Debug.assert(is(culture.amPeriod).aNonEmptyString);
        Debug.assert(is(culture.pmPeriod).aNonEmptyString);

        Debug.assert(is(culture.dateSeparator).aString);
        Debug.assert(is(culture.joinSeperator).aString);
        Debug.assert(is(culture.partSeperator).aString);
        Debug.assert(is(culture.timeSeperator).aString);
        Debug.assert(is(culture.wordSeperator).aString);

        Debug.assert(is(culture.firstDayOfWeek).aNumber);

        Debug.assert(is(culture.wideMonthNames).anArrayOfLength(13));
        Debug.assert(is(culture.mediumMonthNames).anArrayOfLength(13));
        Debug.assert(is(culture.shortMonthNames).anArrayOfLength(13));
        Debug.assert(is(culture.narrowMonthNames).anArrayOfLength(13));

        Debug.assert(is(culture.wideDayNames).anArrayOfLength(7));
        Debug.assert(is(culture.mediumDayNames).anArrayOfLength(7));
        Debug.assert(is(culture.shortDayNames).anArrayOfLength(7));
        Debug.assert(is(culture.narrowDayNames).anArrayOfLength(7));

        Debug.assert(is(culture.format).anObject);

        Debug.assert(is(culture.format.dateTime).aNonEmptyString);
        Debug.assert(is(culture.format.dateTimeGMT).aNonEmptyString);

        Debug.assert(is(culture.format.wideDate).aNonEmptyString);
        Debug.assert(is(culture.format.mediumDate).aNonEmptyString);
        Debug.assert(is(culture.format.shortDate).aNonEmptyString);

        Debug.assert(is(culture.format.mediumTime).aNonEmptyString);
        Debug.assert(is(culture.format.shortTime).aNonEmptyString);

        Debug.assert(is(culture.format.sortable).aNonEmptyString);
        Debug.assert(is(culture.format.universal).aNonEmptyString);
    }

    //#endregion

    //#endergion

    //#region Methods

    /**
     * TODO
     *
     * @public @override
     *
     * @param { * } ref
     *      TODO
     * @param { !String } spec
     *      TODO
     * @returns { ?String }
     *      TODO
     */
    format(ref, spec) {
        let result = '';

        if ((ref = as(ref).aDate)) {
            const culture = this.culture;
            const expression = /DDDDD|DDDD|DDD|DD|ddd|dd|MMMMM|MMMM|MMM|MM|mmm|mm|yyyyy|yyy|yy|hhhhh|hhhh|hhh|hh|nnn|nn|sss|ss|apap|ap|ffff|fff|ff|zzz|zz/g;

            if (' r R u U '.indexOf(` ${spec} `) >= 0) ref = new Date(Date.UTC(ref.getUTCFullYear(), ref.getUTCMonth(), ref.getUTCDate(), ref.getUTCHours(), ref.getUTCMinutes(), ref.getUTCSeconds(), ref.getUTCMilliseconds()));

            if (spec.length === 1)
                spec = (DateFormatter.standardFormats.get(spec) || [])
                    .map(spec => culture.format[spec])
                    .filter(prop => is(prop).aNonEmptyString)
                    .join(' ');

            while (spec.indexOf('{/}') >= 0) spec = spec.replace('{/}', culture.dateSeparator);
            while (spec.indexOf('{-}') >= 0) spec = spec.replace('{-}', culture.joinSeperator);
            while (spec.indexOf('{,}') >= 0) spec = spec.replace('{,}', culture.partSeperator);
            while (spec.indexOf('{:}') >= 0) spec = spec.replace('{:}', culture.timeSeparator);
            while (spec.indexOf('{ }') >= 0) spec = spec.replace('{ }', culture.wordSeperator);

            while (true) {
                const index = expression.lastIndex || 0;
                let match = expression.exec(spec);

                result = `${result}${spec.slice(index, match ? match.index : spec.length)}`;

                if (!match) break;

                switch ((match = match[0])) {
                    case 'DDDDD': case 'DDDD': case 'DDD': case 'DD': result = `${result}${(match === 'DDDDD' ? culture.wideDayNames : match === 'DDDD' ? culture.mediumDayNames : match === 'DDD' ? culture.shortDayNames : culture.narrowDayNames)[ref.getDay()]}`; break;
                    case 'ddd': case 'dd': result = `${result}${Formatter.zeroPad(ref.getDate(), match.length - 1)}`; break;
                    case 'MMMMM': case 'MMMM': case 'MMM': case 'MM': result = `${result}${(match === 'MMMMM' ? culture.wideMonthNames : match === 'MMMM' ? culture.mediumMonthNames : match === 'MMM' ? culture.shortMonthNames : culture.narrowMonthNames)[ref.getMonth()]}`; break;
                    case 'mmm': case 'mm': result = `${result}${Formatter.zeroPad(ref.getMonth() + 1, match.length - 1)}`; break;
                    case 'yyyyy': result = `${result}${ref.getFullYear()}`; break;
                    case 'yyy': case 'yy': result = `${result}${Formatter.zeroPad(ref.getFullYear() % 100, match.length - 1)}`; break;
                    case 'hhhhh': case 'hhhh': result = `${result}${Formatter.zeroPad(ref.getHours(), match.length - 3)}`; break;
                    case 'hhh': case 'hh': result = `${result}${Formatter.zeroPad(ref.getHours() % 12 || 12, match.length - 1)}`; break;
                    case 'nnn': case 'nn': result = `${result}${Formatter.zeroPad(ref.getMinutes(), match.length - 1)}`; break;
                    case 'sss': case 'ss': result = `${result}${Formatter.zeroPad(ref.getSeconds(), match.length - 1)}`; break;
                    case 'apap': case 'ap': result = `${result}${((ref.getHours() < 12) ? culture.amPeriod : culture.pmPeriod).substr(0, match.length / 2)}`; break;
                    case 'ffff': case 'fff': case 'ff': result = `${result}${Formatter.zeroPad(ref.getMilliseconds(), 3)}`.substr(0, match.length - 1); break;
                    case 'zzz': case 'zz': result = `${result}${((ref = ref.getTimezoneOffset() / 60) >= 0) ? '-' : '+'}${Formatter.zeroPad(Math.floor(Math.abs(ref)), match.length - 1)}`; break;
                }
            }
        }

        return result || null;
    }

    //#endregion
}