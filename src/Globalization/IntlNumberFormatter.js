import as from '../Runtime/As';
import is from '../Runtime/Is';

import Culture from './Culture';
import Formatter from '../Formatter';

export default class IntlNumberFormatter extends Formatter {

    //#region Type

    //#region Methods

    /**
     * @private
     * @static
     *
     * @param { Number } ref
     * @param { Array<Number> } groupSizes
     * @param { String } decimalSeperator
     * @param { String } groupSeperator
     * @returns { String }
     */
    static _subFormat(/*ref, groupSizes, decimalSeperator, groupSeperator*/) {
        return '';

    //     var decimalPart = null;
    //     var decimalIndex = number.indexOf(decimal);
    //     if (decimalIndex > 0) {
    //         decimalPart = number.substr(decimalIndex);
    //         number = number.substr(0, decimalIndex);
    //     }
    // 
    //     var negative = number.startsWith('-');
    //     if (negative) {
    //         number = number.substr(1);
    //     }
    // 
    //     var groupIndex = 0;
    //     var groupSize = groups[groupIndex];
    //     if (number.length < groupSize) {
    //         return decimalPart ? number + decimalPart : number;
    //     }
    // 
    //     var index = number.length;
    //     var s = '';
    //     var done = false;
    //     while (!done) {
    //         var length = groupSize;
    //         var startIndex = index - length;
    //         if (startIndex < 0) {
    //             groupSize += startIndex;
    //             length += startIndex;
    //             startIndex = 0;
    //             done = true;
    //         }
    //         if (!length) {
    //             break;
    //         }
    //         
    //         var part = number.substr(startIndex, length);
    //         if (s.length) {
    //             s = part + comma + s;
    //         }
    //         else {
    //             s = part;
    //         }
    //         index -= length;
    // 
    //         if (groupIndex < groups.length - 1) {
    //             groupIndex++;
    //             groupSize = groups[groupIndex];
    //         }
    //     }
    // 
    //     if (negative) {
    //         s = '-' + s;
    //     }    
    //     return decimalPart ? s + decimalPart : s;
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

    /**
     * @override
     *
     * @param { * } ref
     * @param { String } spec
     * @returns { String? }
     */
    format(ref, spec) {
        let result = '';

        if (is(ref = as(ref).aNumber).defined) {
            const culture = Culture.current;
            let precision = (spec.length > 1) ? (parseInt(spec.substr(1)) || -1) : -1;

            switch ((spec = spec.charAt(0))) {
                case 'd':
                case 'D':
                    result = `${parseInt(Math.abs(ref))}`;

                    if (precision > 0) result = ([].fill('0', 0, Math.max(0, precision - 1)).join() + result).substring(result.length);
                    if (ref < 0) result = `-${result}`;

                    break;
                case 'x':
                case 'X':
                    result = parseInt(Math.abs(ref)).toString(16);

                    if (spec === 'X') result = result.toUpperCase();
                    if (precision > 0) result = ([].fill('0', 0, Math.max(0, precision - 1)).join() + result).substring(result.length);

                    break;
                case 'e':
                case 'E':
                    result = ref.toExponential((precision === -1) ? undefined : precision);

                    if (spec === 'E') result = result.toUpperCase();

                    break;
                case 'f':
                case 'F':
                case 'n':
                case 'N':
                    if (precision === -1) precision = culture.numberDecimalDigits;

                    result = ref.toFixed(precision).toString();

                    if (precision && (culture.numberDecimalSeparator !== '.')) {
                        const index = result.indexOf('.');
                        result = `${result.substr(0, index)}${culture.numberDecimalSeparator}${result.substr(index + 1)}`;
                    }

                    if (spec === 'n' || spec === 'N')
                        result = IntlNumberFormatter._subFormat(result, culture.numberGroupSizes, culture.numberDecimalSeparator, culture.numberGroupSeparator);

                    break;
                case 'c':
                case 'C':
                    if (precision === -1) precision = culture.currencyDecimalDigits;

                    result = Math.abs(ref).toFixed(precision).toString();
                    
                    if (precision && (culture.currencyDecimalSeparator !== '.')) {
                        const index = result.indexOf('.');
                        result = `${result.substr(0, index)}${culture.currencyDecimalSeparator}${result.substr(index + 1)}`;
                    }

                    result = ((ref < 0) ? culture.currencyNegativePattern : culture.currencyPositivePattern).replace('?', IntlNumberFormatter._subFormat(result, culture.currencyGroupSizes, culture.currencyDecimalSeparator, culture.currencyGroupSeparator));

                    break;
                case 'p':
                case 'P':
                    if (precision === -1) precision = culture.percentDecimalDigits;

                    result = (Math.abs(ref) * 100.0).toFixed(precision).toString();

                    if (precision && (culture.percentDecimalSeparator !== '.')) {
                        const index = result.indexOf('.');
                        result = `${result.substr(0, index)}${culture.percentDecimalSeparator}${result.substr(index + 1)}`;
                    }

                    result = ((ref < 0) ? culture.percentNegativePattern : culture.percentPositivePattern).replace('?', IntlNumberFormatter._subFormat(result, culture.percentGroupSizes, culture.percentDecimalSeparator, culture.percentGroupSeparator));

                    break;
            }
        }

        return result || null;
    }

    //#endregion

}