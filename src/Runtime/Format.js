import is from './Is';

import Formatter from '../Formatter';

import IntlDateFormatter from '../Globalization/IntlDateFormatter';
import IntlNumberFormatter from '../Globalization/IntlNumberFormatter';

class Format {

    //#region Type

    //#region Properties

    /**
     * A dictionary that contains the collective state of the Format type.
     *
     * @private
     * @static
     * @returns { Object }
     */
    static get _() {
        return Format.__ || (Format.__ = Object.create(null));
    }

    /**
     * @private
     * @static
     * @returns { RegExp }
     */
    static get _compositeValueExpression() {
        return Format._.compositeValueExpression || (Format._.compositeValueExpression = /(\{[^\}^\{]+\})/g);
    }

    /**
     * @private
     * @static
     * @returns { Map<TFormatter, Formatter> }
     */
    static get _formatters() {
        return Format._.formatters || (Format._.formatters = new Map([[IntlNumberFormatter, new IntlNumberFormatter()], [IntlDateFormatter, new IntlDateFormatter()]]));
    }

    //#endregion

    //#region Methods

    /**
     * @static
     * @param { Formatter } TFormatter
     */
    static _inject(TFormatter) {
        //TBI: newly injected formatters are lower priority... need to prepend, so they are in the proper priority
        if (is(TFormatter).aTypeOf(Formatter) && !Format._formatters.has(TFormatter))
            Format._formatters.set(TFormatter, new TFormatter());
    }

    //#endregion

    //#endregion

    //#region Disposition

    /**
     * @param { Array<*> } refs
     */
    constructor(refs) {
        //init
        this._.refs = refs;
    }

    //#endregion

    //#region Properties

    /**
     * A dictionary that contains the collective state of a Format instance.
     *
     * @private
     * @returns { Object }
     */
    get _() {
        return this.__ || (this.__ = Object.create(null));
    }

    /**
     * @private
     * @returns { Array }
     */
    get _refs() {
        return this._.refs;
    }

    //#endregion

    //#region Methods

    /**
     * @param { String } spec
     * @returns { String?|Array<String?> }
     */
    as(spec) {
        //composite value format -> if contains at least on composite value (see the expression), then do the composite logic
//         //composite value formatting... '{0:x} went to the {1:x}'
//         return format.replace(Format._templateExpression, (out, match) => {
//             let result = '';
//             const value = this._refs[parseInt(match.substr(1))];
//
//             if (is(value).defined) {
//                 const index = match.indexOf(':');
//
//                 result = (index === -1)
//                     ? value.toLocaleString()
//                     : new Format(Array.of(value)).as((index > 0) ? match.substring(index + 1, match.length - 1) : null);
//             }

//             return result;
//         });

        const result = this._refs.map(ref => {
            let result = null;

            //TBI: use Formatter.priorityTypes to reprioritize Formatters (requires type(instance).of())
            for(let [, formatter] of this._formatters)
                if (is(result = formatter.format(ref, spec)).defined) break;

            return result;
        });

        return (result.length === 0) ? null : (result.length === 1) ? result[0] : result;
    }

    //#endregion

}

const format = (...refs) => new Format(refs);
format.inject = format._inject;

export default format;