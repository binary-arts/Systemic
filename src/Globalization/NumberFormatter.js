import Culture from './Culture';
import Formatter from '../Formatter';

export default class NumberFormatter extends Formatter {

    //#region Type

    //#region Properties

    /**
     * A dictionary that contains the collective state of the NumberFormatter type.
     *
     * @private
     * @static
     *
     * @returns { Object }
     */
    static get _() {
        return NumberFormatter.__ || (NumberFormatter.__ = Object.create(null));
    }

    /**
     * @private
     * @static
     *
     * @returns { Map<Culture, NumberFormatter> }
     */
    static get _cache() {
        return NumberFormatter._.cache || (NumberFormatter._.cache = new Map());
    }

    /**
     * @override
     * @static
     *
     * @returns { NumberFormatter }
     */
    static get current() {
        const culture = Culture.current;

        //!!! not thread-safe
        return NumberFormatter._cache.has(culture)
            ? NumberFormatter._cache.get(culture)
            : () => {
                const result = new NumberFormatter(Culture.current);
                NumberFormatter._cache.set(culture, result);

                return result;
            }();
    }

    //#endregion

    //#region Methods

    /**
     * @private
     * @static
     *
     * @param { String } ref
     * @param { String } negativeSign
     * @param { Array<Number> } groupSizes
     * @param { String } decimalSeperator
     * @param { String } groupSeperator
     * @returns { String }
     */
    static _subFormat(ref, negativeSign, groupSizes, decimal, group) {
        let result = '';

        const isNegative = ref.startsWith(negativeSign);

        if (isNegative)
            ref = ref.substr(negativeSign.length);

        const decimalIndex = ref.indexOf(decimal);
        const decimalPart = (decimalIndex > 0) ? ref.substr(decimalIndex) : null;

        if (decimalIndex > 0)
            ref = ref.substr(0, decimalIndex);

        let groupIndex = 0;
        let groupSize = groupSizes[groupIndex];

        if (ref.length < groupSize)
            result = `${ref}${decimalPart}`;
        else {
            let index = ref.length;
            let done = false;

            while (!done) {
                let length = groupSize;
                let startIndex = index - length;

                if (startIndex < 0) {
                    groupSize += startIndex;
                    length += startIndex;
                    startIndex = 0;
                    done = true;
                }

                if (!length)
                    break;

                result = `${ref.substr(startIndex, length)}${result ? group : null}${result}`;
                index -= length;

                if (groupIndex < groupSizes.length - 1) {
                    groupIndex++;
                    groupSize = groupSizes[groupIndex];
                }
            }

            result = `${result}${decimalPart}`;
        }

        if (isNegative)
            result = `${negativeSign}${result}`;

        return result;
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
        return this._.priorityTypes || (this._.priorityTypes = [Number]);
    }

    //#endregion

    //#region Methods

//     /**
//      * @override
//      *
//      * @param { Any } ref
//      * @param { String } spec
//      * @returns { ?String }
//      */
//     format(ref, spec) {
//         let result = '';
//
//         if ((ref = as(ref).aNumber)) {
//             const culture = this._culture;
//             const precision = (spec.length > 1) ? (parseInt(spec.substr(1)) || -1) : -1;
//
//             switch ((spec = spec.charAt(0))) {
//                 case 'd':
//                 case 'D':
//                     result = `${parseInt(Math.abs(ref))}`;
//
//                     if (precision > 0) result = ([].fill('0', 0, Math.max(0, precision - 1)).join() + result).substring(result.length);
//                     if (ref < 0) result = `-${result}`;
//
//                     break;
//                 case 'x':
//                 case 'X':
//                     result = parseInt(Math.abs(ref)).toString(16);
//
//                     if (spec === 'X') result = result.toUpperCase();
//                     if (precision > 0) result = ([].fill('0', 0, Math.max(0, precision - 1)).join() + result).substring(result.length);
//
//                     break;
//                 case 'e':
//                 case 'E':
//                     result = ref.toExponential((precision === -1) ? undefined : precision);
//
//                     if (spec === 'E') result = result.toUpperCase();
//
//                     break;
//                 case 'f':
//                 case 'F':
//                 case 'n':
//                 case 'N':
//                     if (precision === -1) precision = culture.numberDecimalDigits;
//
//                     result = ref.toFixed(precision).toString();
//
//                     if (precision && (culture.numberDecimalSeparator !== '.')) {
//                         const index = result.indexOf('.');
//                         result = `${result.substr(0, index)}${culture.numberDecimalSeparator}${result.substr(index + 1)}`;
//                     }
//
//                     if (spec === 'n' || spec === 'N')
//                         result = IntlNumberFormatter._subFormat(result, culture.numberGroupSizes, culture.numberDecimalSeparator, culture.numberGroupSeparator);
//
//                     break;
//                 case 'c':
//                 case 'C':
//                     if (precision === -1) precision = culture.currencyDecimalDigits;
//
//                     result = Math.abs(ref).toFixed(precision).toString();
//
//                     if (precision && (culture.currencyDecimalSeparator !== '.')) {
//                         const index = result.indexOf('.');
//                         result = `${result.substr(0, index)}${culture.currencyDecimalSeparator}${result.substr(index + 1)}`;
//                     }
//
//                     result = ((ref < 0) ? culture.currencyNegativePattern : culture.currencyPositivePattern).replace('?', IntlNumberFormatter._subFormat(result, culture.currencyGroupSizes, culture.currencyDecimalSeparator, culture.currencyGroupSeparator));
//
//                     break;
//                 case 'p':
//                 case 'P':
//                     if (precision === -1) precision = culture.percentDecimalDigits;
//
//                     result = (Math.abs(ref) * 100.0).toFixed(precision).toString();
//
//                     if (precision && (culture.percentDecimalSeparator !== '.')) {
//                         const index = result.indexOf('.');
//                         result = `${result.substr(0, index)}${culture.percentDecimalSeparator}${result.substr(index + 1)}`;
//                     }
//
//                     result = ((ref < 0) ? culture.percentNegativePattern : culture.percentPositivePattern).replace('?', IntlNumberFormatter._subFormat(result, culture.percentGroupSizes, culture.percentDecimalSeparator, culture.percentGroupSeparator));
//
//                     break;
//             }
//         }
//
//         return result || null;
//    }

    //#endregion

}