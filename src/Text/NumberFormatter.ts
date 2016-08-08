// import as from '../Runtime/As';
// import is from '../Runtime/Is';

// import Debug from '../Diagnostics/Debug';
// import Formatter from './Formatter';

// /**
//  * TODO
//  *
//  * @public @sealed
//  */
// export default class NumberFormatter extends Formatter {
//     //#region Type

//     //#region Properties

//     /**
//      * Gets locale-independent (invariant) format conventions for the NumberFormatter class.
//      *
//      * @protected @static @override
//      *
//      * @returns { !Object }
//      *      The invariant format conventions for the NumberFormatter class. NumberFormatter objects
//      *      will apply these conventions during format operations unless language- or region- specific
//      *      values are declared in the associated formatter configuration files. Values may be individually
//      *      overridden. The object returned by this property conforms to 'en-US' format conventions.
//      */
//     static get invariantCulture() {
//         return NumberFormatter._invariantCulture || (NumberFormatter._invariantCulture = {
//             nanSymbol: 'NaN',
//             negativeSign: '-',
//             positiveSign: '+',
//             negativeInfinity: '{-}∞',
//             positiveInfinity: '∞',

//             groupSizes: [3],
//             precision: 2,
//             decimal: '.',
//             group: ',',

//             percent: {
//                 symbol: '%',
//                 groupSizes: [3],
//                 precision: 2,
//                 decimal: '.',
//                 group: ',',

//                 format: {
//                     positive: '{?}{%}',
//                     negative: '{-}{?}{%}'
//                 }
//             },

//             currency: {
//                 symbol: '$',
//                 groupSizes: [3],
//                 precision: 2,
//                 decimal: '.',
//                 group: ',',

//                 format: {
//                     positive: '({$}{?})',
//                     negative: '{$}{?}'
//                 }
//             }
//         });
//     }

//     /**
//      * TODO
//      *
//      * @public @static @override
//      *
//      * @returns { !Array<!T> } TODO
//      */
//     static get priorityTypes() {
//         return NumberFormatter._numberFormatterPriorityTypes || (NumberFormatter._numberFormatterPriorityTypes = [Number]);
//     }

//     //#endregion

//     //#region Methods

//     /**
//      * TODO
//      *
//      * @private @static
//      *
//      * @param { !String } ref TODO
//      * @param { !String } negativeSign TODO
//      * @param { !Array<!Number> } groupSizes TODO
//      * @param { !String } decimal TODO
//      * @param { !String } group TODO
//      * @returns { !String } TODO
//      */
//     static subFormat(ref, negativeSign, groupSizes, decimal, group) {
//         let result = '';

//         const isNegative = ref.startsWith(negativeSign);

//         if (isNegative) ref = ref.substr(negativeSign.length);

//         const decimalIndex = ref.indexOf(decimal);
//         const decimalPart = decimalIndex >= 0 ? ref.substr(decimalIndex) : null;

//         if (decimalIndex >= 0) ref = ref.substr(0, decimalIndex);

//         let groupIndex = 0;
//         let groupSize = groupSizes[groupIndex];

//         if (ref.length < groupSize) result = `${ref}${decimalPart}`;
//         else {
//             let index = ref.length;
//             let done = false;

//             while (!done) {
//                 let length = groupSize;
//                 let startIndex = index - length;

//                 if (startIndex < 0) {
//                     groupSize += startIndex;
//                     length += startIndex;
//                     startIndex = 0;
//                     done = true;
//                 }

//                 if (!length) break;

//                 result = `${ref.substr(startIndex, length)}${result ? group : null}${result}`;
//                 index -= length;

//                 if (groupIndex < groupSizes.length - 1) {
//                     groupIndex++;
//                     groupSize = groupSizes[groupIndex];
//                 }
//             }

//             result = `${result}${decimalPart}`;
//         }

//         if (isNegative) result = `${negativeSign}${result}`;

//         return result;
//     }

//     //#endregion

//     //#region Methods

//     /**
//      * TODO
//      *
//      * @protected @static @override
//      *
//      * @param { !Object } culture TODO
//      */
//     static validate(culture) {
//         Debug.assert(is(culture).anObject);

//         Debug.assert(is(culture.nanSymbol).aNonEmptyString);
//         Debug.assert(is(culture.negativeSign).aNonEmptyString);
//         Debug.assert(is(culture.positiveSign).aNonEmptyString);
//         Debug.assert(is(culture.negativeInfinity).aNonEmptyString);
//         Debug.assert(is(culture.positiveInfinity).aNonEmptyString);

//         Debug.assert(is(culture.groupSizes).aNonEmptyArray);
//         Debug.assert(is(culture.precision).aNumber);
//         Debug.assert(is(culture.decimal).aNonEmptyString);
//         Debug.assert(is(culture.group).aNonEmptyString);

//         Debug.assert(is(culture.percent).anObject);

//         Debug.assert(is(culture.percent.symbol).aNonEmptyString);
//         Debug.assert(is(culture.percent.groupSizes).aNonEmptyArray);
//         Debug.assert(is(culture.percent.precision).aNumber);
//         Debug.assert(is(culture.percent.decimal).aNonEmptyString);
//         Debug.assert(is(culture.percent.group).aNonEmptyString);

//         Debug.assert(is(culture.percent.format).anObject);

//         Debug.assert(is(culture.percent.format.positive).aNonEmptyString);
//         Debug.assert(is(culture.percent.format.negative).aNonEmptyString);

//         Debug.assert(is(culture.currency).anObject);

//         Debug.assert(is(culture.currency.symbol).aNonEmptyString);
//         Debug.assert(is(culture.currency.groupSizes).aNonEmptyArray);
//         Debug.assert(is(culture.currency.precision).aNumber);
//         Debug.assert(is(culture.currency.decimal).aNonEmptyString);
//         Debug.assert(is(culture.currency.group).aNonEmptyString);

//         Debug.assert(is(culture.currency.format).anObject);

//         Debug.assert(is(culture.currency.format.negative).aNonEmptyString);
//         Debug.assert(is(culture.currency.format.positive).aNonEmptyString);
//     }

//     //#endregion

//     //#endergion

//     //#region Methods

//     /**
//      * TODO
//      *
//      * @public @override
//      *
//      * @param { * } ref TODO
//      * @param { !String } spec TODO
//      * @returns { ?String } TODO
//      */
//     format(ref/*, spec*/) {
//         const result = '';

//         ref = as(ref).aNumber;

//         if (ref) {
// //            const culture = this._culture;
// //            const precision = (spec.length > 1) ? (parseInt(spec.substr(1)) || -1) : -1;
// //
// //             switch ((spec = spec.charAt(0))) {
// //                 case 'd':
// //                 case 'D':
// //                     result = `${parseInt(Math.abs(ref))}`;
// //
// //                     if (precision > 0) result = ([].fill('0', 0, Math.max(0, precision - 1)).join() + result).substring(result.length);
// //                     if (ref < 0) result = `-${result}`;
// //
// //                     break;
// //                 case 'x':
// //                 case 'X':
// //                     result = parseInt(Math.abs(ref)).toString(16);
// //
// //                     if (spec === 'X') result = result.toUpperCase();
// //                     if (precision > 0) result = ([].fill('0', 0, Math.max(0, precision - 1)).join() + result).substring(result.length);
// //
// //                     break;
// //                 case 'e':
// //                 case 'E':
// //                     result = ref.toExponential((precision === -1) ? undefined : precision);
// //
// //                     if (spec === 'E') result = result.toUpperCase();
// //
// //                     break;
// //                 case 'f':
// //                 case 'F':
// //                 case 'n':
// //                 case 'N':
// //                     if (precision === -1) precision = culture.numberDecimalDigits;
// //
// //                     result = ref.toFixed(precision).toString();
// //
// //                     if (precision && (culture.numberDecimalSeparator !== '.')) {
// //                         const index = result.indexOf('.');
// //                         result = `${result.substr(0, index)}${culture.numberDecimalSeparator}${result.substr(index + 1)}`;
// //                     }
// //
// //                     if (spec === 'n' || spec === 'N')
// //                         result = IntlNumberFormatter._subFormat(result, culture.numberGroupSizes, culture.numberDecimalSeparator, culture.numberGroupSeparator);
// //
// //                     break;
// //                 case 'c':
// //                 case 'C':
// //                     if (precision === -1) precision = culture.currencyDecimalDigits;
// //
// //                     result = Math.abs(ref).toFixed(precision).toString();
// //
// //                     if (precision && (culture.currencyDecimalSeparator !== '.')) {
// //                         const index = result.indexOf('.');
// //                         result = `${result.substr(0, index)}${culture.currencyDecimalSeparator}${result.substr(index + 1)}`;
// //                     }
// //
// //                     result = ((ref < 0) ? culture.currencyNegativePattern : culture.currencyPositivePattern).replace('?', IntlNumberFormatter._subFormat(result, culture.currencyGroupSizes, culture.currencyDecimalSeparator, culture.currencyGroupSeparator));
// //
// //                     break;
// //                 case 'p':
// //                 case 'P':
// //                     if (precision === -1) precision = culture.percentDecimalDigits;
// //
// //                     result = (Math.abs(ref) * 100.0).toFixed(precision).toString();
// //
// //                     if (precision && (culture.percentDecimalSeparator !== '.')) {
// //                         const index = result.indexOf('.');
// //                         result = `${result.substr(0, index)}${culture.percentDecimalSeparator}${result.substr(index + 1)}`;
// //                     }
// //
// //                     result = ((ref < 0) ? culture.percentNegativePattern : culture.percentPositivePattern).replace('?', IntlNumberFormatter._subFormat(result, culture.percentGroupSizes, culture.percentDecimalSeparator, culture.percentGroupSeparator));
// //
// //                     break;
// //             }
//         }

//         return result || null;
//     }

//     //#endregion
// }
