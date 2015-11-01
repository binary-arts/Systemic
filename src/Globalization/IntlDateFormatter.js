import as from '../Runtime/As';
import is from '../Runtime/Is';

import Culture from './Culture';
import Formatter from '../Formatter';

export default class IntlDateFormatter extends Formatter {

    //#region Type

    //#region Properties

    /**
     * A dictionary that contains the collective state of the IntlDateFormatter type.
     *
     * @private
     * @static
     *
     * @returns { Object }
     */
    static get _() {
        return IntlDateFormatter.__ || (IntlDateFormatter.__ = Object.create(null));
    }

    /**
     * @private
     * @static
     *
     * @returns { Map<String, Array<String>> }
     */
    static get _standardFormatSpecs() {
        return IntlDateFormatter._.standardFormatSpecs || (IntlDateFormatter._.standardFormatSpecs = new Map([
            ['d', ['shortDatePattern']],
            ['D', ['longDatePattern']],
            ['f', ['longDatePattern', 'shortTimePattern']],
            ['F', ['dateTimePattern']],
            ['g', ['shortDatePattern', 'shortTimePattern']],
            ['G', ['shortDatePattern', 'longTimePattern']],
            ['r', ['gmtDateTimePattern']],
            ['R', ['gmtDateTimePattern']],
            ['s', ['sortableDateTimePattern']],
            ['t', ['shortTimePattern']],
            ['T', ['longTimePattern']],
            ['u', ['universalDateTimePattern']],
            ['U', ['dateTimePattern']]
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
            const culture = Culture.current;
            const expression = /GMT|UTC|dddd|ddd|dd|d|MMMM|MMM|MM|M|yyyy|yy|y|hh|h|HH|H|mm|m|ss|s|tt|t|fff|ff|f|zz|z/g;

            if (' r R u U '.indexOf(` ${spec} `) >= 0) ref = new Date(Date.UTC(ref.getUTCFullYear(), ref.getUTCMonth(), ref.getUTCDate(), ref.getUTCHours(), ref.getUTCMinutes(), ref.getUTCSeconds(), ref.getUTCMilliseconds()));

            if (spec.length === 1)
                spec = (IntlDateFormatter._standardFormatSpecs.get(spec) || [])
                    .map(spec => Object.getOwnPropertyDescriptor(Culture.prototype, spec))
                    .filter(prop => is(prop).defined && is(prop.get).aFunction)
                    .map(prop => prop.get.call(culture))
                    .filter(value => !!value)
                    .join(' ') || spec;

            if (spec.startsWith('%')) spec = spec.substr(1);

            while (true) {
                const index = expression.lastIndex || 0;
                let match = expression.exec(spec);

                result = `${result}${spec.slice(index, match ? match.index : spec.length)}`;

                if (!match) break;

                switch ((match = match[0])) {
                    case 'GMT': case 'UTC': result = `${result}${match}`; break;
                    case 'dddd': case 'ddd': result = `${result}${(match === 'dddd' ? culture.dayNames : culture.shortDayNames)[ref.getDay()]}`; break;
                    case 'dd': case 'd': result = `${result}${Formatter.zeroPad(ref.getDate(), match.length)}`; break;
                    case 'MMMM': case 'MMM': result = `${result}${(match === 'MMMM' ? culture.monthNames : culture.shortMonthNames)[ref.getMonth()]}`; break;
                    case 'MM': case 'M': result = `${result}${Formatter.zeroPad(ref.getMonth() + 1, match.length)}`; break;
                    case 'yyyy': result = `${result}${ref.getFullYear()}`; break;
                    case 'yy': case 'y': result = `${result}${Formatter.zeroPad(ref.getFullYear() % 100, match.length)}`; break;
                    case 'hh': case 'h': result = `${result}${Formatter.zeroPad(ref.getHours() % 12 || 12, match.length)}`; break;
                    case 'HH': case 'H': result = `${result}${Formatter.zeroPad(ref.getHours(), match.length)}`; break;
                    case 'mm': case 'm': result = `${result}${Formatter.zeroPad(ref.getMinutes(), match.length)}`; break;
                    case 'ss': case 's': result = `${result}${Formatter.zeroPad(ref.getSeconds(), match.length)}`; break;
                    case 'tt': case 't': result = `${result}${((ref.getHours() < 12) ? culture.amDesignator : culture.pmDesignator).substr(0, match.length)}`; break;
                    case 'fff': case 'ff': case 'f': result = `${result}${Formatter.zeroPad(ref.getMilliseconds(), 3)}`.substr(0, match.length); break;
                    case 'zz': case 'z': result = `${result}${((ref = ref.getTimezoneOffset() / 60) >= 0) ? '-' : '+'}${Formatter.zeroPad(Math.floor(Math.abs(ref)), match.length)}`; break;
                }
            }
        }

        return result || null;
    }

    //#endregion

}