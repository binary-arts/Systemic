import as from '../Runtime/As';
import is from '../Runtime/Is';

import Culture from './Culture';
import Formatter from '../Formatter';

export default class DateFormatter extends Formatter {

    //#region Type

    //#region Properties

    /**
     * A dictionary that contains the collective state of the DateFormatter type.
     *
     * @private
     * @static
     *
     * @returns { Object }
     */
    static get _() {
        return DateFormatter.__ || (DateFormatter.__ = Object.create(null));
    }

    /**
     * @private
     * @static
     *
     * @returns { Map<Culture, DateFormatter> }
     */
    static get _cache() {
        return DateFormatter._.cache || (DateFormatter._.cache = new Map());
    }

    /**
     * @override
     * @static
     *
     * @returns { DateFormatter }
     */
    static get current() {
        const culture = Culture.current;

        //!!! not thread-safe
        return DateFormatter._cache.has(culture)
            ? DateFormatter._cache.get(culture)
            : () => {
                const result = new DateFormatter(Culture.current);
                DateFormatter._cache.set(culture, result);

                return result;
            }();
    }

    /**
     * @private
     * @static
     *
     * @returns { Map<String, Array<String>> }
     */
    static get _standardFormatSpecs() {
        return DateFormatter._.standardFormatSpecs || (DateFormatter._.standardFormatSpecs = new Map([
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

    //#endregion

    //#region Properties

    /**
     * @override
     *
     * @returns { Array<T> }
     */
    get priorityTypes() {
        return this._.priorityTypes || (this._.priorityTypes = [Date]);
    }

    //#endregion

    //#region Methods

    /**
     * @override
     *
     * @param { Any } ref
     * @param { String } spec
     * @returns { ?String }
     */
    format(ref, spec) {
        let result = '';

        if ((ref = as(ref).aDate)) {
            const culture = this._culture;
            const expression = /DDDDD|DDDD|DDD|DD|ddd|dd|MMMMM|MMMM|MMM|MM|mmm|mm|yyyyy|yyy|yy|hhhhh|hhhh|hhh|hh|nnn|nn|sss|ss|apap|ap|ffff|fff|ff|zzz|zz/g;

            if (' r R u U '.indexOf(` ${spec} `) >= 0) ref = new Date(Date.UTC(ref.getUTCFullYear(), ref.getUTCMonth(), ref.getUTCDate(), ref.getUTCHours(), ref.getUTCMinutes(), ref.getUTCSeconds(), ref.getUTCMilliseconds()));

            if (spec.length === 1)
                spec = (DateFormatter._standardFormatSpecs.get(spec) || [])
                    .map(spec => culture.date.format[spec])
                    .filter(prop => is(prop).aNonEmptyString)
                    .join(' ');

            while (true) {
                const index = expression.lastIndex || 0;
                let match = expression.exec(spec);

                result = `${result}${spec.slice(index, match ? match.index : spec.length)}`;

                if (!match) break;

                switch ((match = match[0])) {
                    case 'DDDDD': case 'DDDD': case 'DDD': case 'DD': result = `${result}${(match === 'DDDDD' ? culture.date.wideDayNames : match === 'DDDD' ? culture.date.mediumDayNames : match === 'DDD' ? culture.date.shortDayNames : culture.date.narrowDayNames)[ref.getDay()]}`; break;
                    case 'ddd': case 'dd': result = `${result}${Formatter.zeroPad(ref.getDate(), match.length - 1)}`; break;
                    case 'MMMMM': case 'MMMM': case 'MMM': case 'MM': result = `${result}${(match === 'MMMMM' ? culture.date.wideMonthNames : match === 'MMMM' ? culture.date.mediumMonthNames : match === 'MMM' ? culture.date.shortMonthNames : culture.date.narrowMonthNames)[ref.getMonth()]}`; break;
                    case 'mmm': case 'mm': result = `${result}${Formatter.zeroPad(ref.getMonth() + 1, match.length - 1)}`; break;
                    case 'yyyyy': result = `${result}${ref.getFullYear()}`; break;
                    case 'yyy': case 'yy': result = `${result}${Formatter.zeroPad(ref.getFullYear() % 100, match.length - 1)}`; break;
                    case 'hhhhh': case 'hhhh': result = `${result}${Formatter.zeroPad(ref.getHours(), match.length - 3)}`; break;
                    case 'hhh': case 'hh': result = `${result}${Formatter.zeroPad(ref.getHours() % 12 || 12, match.length - 1)}`; break;
                    case 'nnn': case 'nn': result = `${result}${Formatter.zeroPad(ref.getMinutes(), match.length - 1)}`; break;
                    case 'sss': case 'ss': result = `${result}${Formatter.zeroPad(ref.getSeconds(), match.length - 1)}`; break;
                    case 'apap': case 'ap': result = `${result}${((ref.getHours() < 12) ? culture.date.amPeriod : culture.date.pmPeriod).substr(0, match.length / 2)}`; break;
                    case 'ffff': case 'fff': case 'ff': result = `${result}${Formatter.zeroPad(ref.getMilliseconds(), 3)}`.substr(0, match.length - 1); break;
                    case 'zzz': case 'zz': result = `${result}${((ref = ref.getTimezoneOffset() / 60) >= 0) ? '-' : '+'}${Formatter.zeroPad(Math.floor(Math.abs(ref)), match.length - 1)}`; break;
                }
            }
        }

        return result || null;
    }

    //#endregion

}