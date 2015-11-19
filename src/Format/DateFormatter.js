import as from '../Runtime/As';
import is from '../Runtime/Is';

/* jshint ignore:start */
import Debug from '../Diagnostics/Debug';
/* jshint ignore:end */
import Formatter from './Formatter';

/**
 * TODO
 */
export default class DateFormatter extends Formatter {
    //#region Type

    //#region Properties

    /**
     * Gets the collective state of the DateFormatter class.
     *
     * @private
     * @static
     *
     * @returns { !Object }
     *      A dictionary containing the collective state of the DateFormatter class.
     */
    static get _() {
        return DateFormatter.__ || (DateFormatter.__ = Object.create(null));
    }

    /**
     * Gets a list of memory-cached DateFormatter objects indexed by locale.
     *
     * @private
     * @static
     *
     * @returns { !Map.<!String, !DateFormatter> }
     *      A Map containing DateFormatter objects by locale. The Map returned by this property is
     *      empty to start and is intended to be populated by private APIs as locale-unique DateFormatter
     *      objects are initialized. Because DateFormatter objects are immutable, this property is
     *      essentially a memory-optimized backing store where, at most, only one DateFormatter object
     *      per locale is ever constructed.
     */
    static get _cache() {
        return DateFormatter._.cache || (DateFormatter._.cache = new Map());
    }

    /**
     * Asynchronously gets the locale-independent (invariant) DateFormatter object.
     *
     * @static
     * @override
     *
     * @returns { !Promise.<!DateFormatter> }
     *      A Promise of DateFormatter object that is locale-independent (invariant), associated with
     *      neither a language nor a region. The invariant DateFormatter object will not change its
     *      format conventions over time which makes it a suitable candidate for canonized Date serialization.
     *      Because DateFormatter objects are immutable, the same Promise is returned each time this
     *      property is called.
     */
    static get invariant() {
        return DateFormatter.fromLocale('');
    }

    /**
     * Gets locale-independent (invariant) format conventions for the DateFormatter class.
     *
     * @private
     * @static
     *
     * @returns { !Object }
     *      An Object containing the the invariant format conventions for the DateFormatter class.
     *      DateFormatter objects will use these conventions during format operations unless language-
     *      or region-specific values are declared in one or more locale-aware configuration files.
     *      The invariant culture returned by this property conforms to 'en-US' format conventions.
     */
    static get _invariantCulture() {
        return DateFormatter._.invariantCulture || (DateFormatter._.invariantCulture = {
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
     * @protected
     * @static
     * @override
     *
     * @returns { !Array.<!T> }
     *      TODO
     */
    static get _priorityTypes() {
        return DateFormatter._.priorityTypes || (DateFormatter._.priorityTypes = [Date]);
    }

    /**
     * TODO
     *
     * @private
     * @static
     *
     * @returns { !Map.<!String, !Array.<!String>> }
     *      TODO
     */
    static get _standardFormats() {
        return DateFormatter._.standardFormats || (DateFormatter._.standardFormats = new Map([
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
     * Asynchronously gets a DateFormatter object associated with the specified locale.
     *
     * @static
     * @override
     *
     * @param { !String } locale
     *      A String associated with the format conventions of the DateFormatter object being requested.
     *      This can either be a region-specific locale (e.g. 'en-US'), a neutral locale (e.g. 'en'),
     *      or the invariant locale (e.g. '').
     * @returns { !Promise.<!DateFormatter> }
     *      A Promise of a DateFormatter object associated with the specified locale. Because DateFormatter
     *      objects are immutable, the same Promise is returned for if the same locale specified in subsequent
     *      invocations.
     */
    /* jshint ignore:start */
    static fromLocale(locale) {
        return async() => {
            //!!! not thread-safe
            if (!DateFormatter._cache.has(locale))
                DateFormatter._cache.set(locale, new DateFormatter(locale));

            const result = DateFormatter._cache.get(locale);
            await result._initialized;

            return result;
        }();
    }
    /* jshint ignore:end */

    //#endregion

    //#endergion

    //#region Disposition

    /**
     * TODO
     *
     * @private
     *
     * @param { !String } locale
     *      TODO
     */
    constructor(locale) {
        super(DateFormatter._invariantCulture, locale);

        //!!! TODO -> clean up validation by using JSON Schema
        /* jshint ignore:start */
        async() => {
            await this._initialized;
            const culture = this._culture;

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
        }();
        /* jshint ignore:end */
    }

    //#endregion

    //#region Methods

    /**
     * TODO
     *
     * @override
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
            const culture = this._culture;
            const expression = /DDDDD|DDDD|DDD|DD|ddd|dd|MMMMM|MMMM|MMM|MM|mmm|mm|yyyyy|yyy|yy|hhhhh|hhhh|hhh|hh|nnn|nn|sss|ss|apap|ap|ffff|fff|ff|zzz|zz/g;

            if (' r R u U '.indexOf(` ${spec} `) >= 0) ref = new Date(Date.UTC(ref.getUTCFullYear(), ref.getUTCMonth(), ref.getUTCDate(), ref.getUTCHours(), ref.getUTCMinutes(), ref.getUTCSeconds(), ref.getUTCMilliseconds()));

            if (spec.length === 1)
                spec = (DateFormatter._standardFormats.get(spec) || [])
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