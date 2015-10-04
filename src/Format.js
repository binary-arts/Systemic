import Exception from './Runtime/Exception';

export default class Format {

    constructor() {
        throw Exception.create('Cannot invoke the constructor function of a static class.');
    }

    //#region Methods

    date() {
//Date.prototype.format = function Date$format(format) {
//     if (ss.isNullOrUndefined(format) || (format.length == 0) || (format == 'i')) {
//         return this.toString();
//     }
//     if (format == 'id') {
//         return this.toDateString();
//     }
//     if (format == 'it') {
//         return this.toTimeString();
//     }
// 
//     return this._netFormat(format, false);
// }
// 
// Date.prototype.localFormat = function Date$localeFormat(format) {
//     if (ss.isNullOrUndefined(format) || (format.length == 0) || (format == 'i')) {
//         return this.toLocaleString();
//     }
//     if (format == 'id') {
//         return this.toLocaleDateString();
//     }
//     if (format == 'it') {
//         return this.toLocaleTimeString();
//     }
// 
//     return this._netFormat(format, true);
// }
// 
// Date.prototype._netFormat = function Date$_netFormat(format, useLocale) {
//     var dtf = useLocale ? ss.CultureInfo.CurrentCulture.dateFormat : ss.CultureInfo.InvariantCulture.dateFormat;
//     var useUTC = false;
// 
//     if (format.length == 1) {
//         switch (format) {
//             case 'f': format = dtf.longDatePattern + ' ' + dtf.shortTimePattern;
//             case 'F': format = dtf.dateTimePattern; break;
// 
//             case 'd': format = dtf.shortDatePattern; break;
//             case 'D': format = dtf.longDatePattern; break;
// 
//             case 't': format = dtf.shortTimePattern; break;
//             case 'T': format = dtf.longTimePattern; break;
// 
//             case 'g': format = dtf.shortDatePattern + ' ' + dtf.shortTimePattern; break;
//             case 'G': format = dtf.shortDatePattern + ' ' + dtf.longTimePattern; break;
// 
//             case 'R': case 'r': format = dtf.gmtDateTimePattern; useUTC = true; break;
//             case 'u': format = dtf.universalDateTimePattern; useUTC = true; break;
//             case 'U': format = dtf.dateTimePattern; useUTC = true; break;
// 
//             case 's': format = dtf.sortableDateTimePattern; break;
//         }
//     }
// 
//     if (format.charAt(0) == '%') {
//         format = format.substr(1);
//     }
// 
//     if (!Date._formatRE) {
//         Date._formatRE = /dddd|ddd|dd|d|MMMM|MMM|MM|M|yyyy|yy|y|hh|h|HH|H|mm|m|ss|s|tt|t|fff|ff|f|zzz|zz|z/g;
//     }
// 
//     var re = Date._formatRE;    
//     var sb = new ss.StringBuilder();
//     var dt = this;
//     if (useUTC) {
//         dt = new Date(Date.UTC(dt.getUTCFullYear(), dt.getUTCMonth(), dt.getUTCDate(),
//                                dt.getUTCHours(), dt.getUTCMinutes(), dt.getUTCSeconds(), dt.getUTCMilliseconds()));
//     }
// 
//     re.lastIndex = 0;
//     while (true) {
//         var index = re.lastIndex;
//         var match = re.exec(format);
// 
//         sb.append(format.slice(index, match ? match.index : format.length));
//         if (!match) {
//             break;
//         }
// 
//         var fs = match[0];
//         var part = fs;
//         switch (fs) {
//             case 'dddd':
//                 part = dtf.dayNames[dt.getDay()];
//                 break;
//             case 'ddd':
//                 part = dtf.shortDayNames[dt.getDay()];
//                 break;
//             case 'dd':
//                 part = dt.getDate().toString().padLeft(2, '0');
//                 break;
//             case 'd':
//                 part = dt.getDate();
//                 break;
//             case 'MMMM':
//                 part = dtf.monthNames[dt.getMonth()];
//                 break;
//             case 'MMM':
//                 part = dtf.shortMonthNames[dt.getMonth()];
//                 break;
//             case 'MM':
//                 part = (dt.getMonth() + 1).toString().padLeft(2, '0');
//                 break;
//             case 'M':
//                 part = (dt.getMonth() + 1);
//                 break;
//             case 'yyyy':
//                 part = dt.getFullYear();
//                 break;
//             case 'yy':
//                 part = (dt.getFullYear() % 100).toString().padLeft(2, '0');
//                 break;
//             case 'y':
//                 part = (dt.getFullYear() % 100);
//                 break;
//             case 'h': case 'hh':
//                 part = dt.getHours() % 12;
//                 if (!part) {
//                     part = '12';
//                 }
//                 else if (fs == 'hh') {
//                     part = part.toString().padLeft(2, '0');
//                 }
//                 break;
//             case 'HH':
//                 part = dt.getHours().toString().padLeft(2, '0');
//                 break;
//             case 'H':
//                 part = dt.getHours();
//                 break;
//             case 'mm':
//                 part = dt.getMinutes().toString().padLeft(2, '0');
//                 break;
//             case 'm':
//                 part = dt.getMinutes();
//                 break;
//             case 'ss':
//                 part = dt.getSeconds().toString().padLeft(2, '0');
//                 break;
//             case 's':
//                 part = dt.getSeconds();
//                 break;
//             case 't': case 'tt':
//                 part = (dt.getHours() < 12) ? dtf.amDesignator : dtf.pmDesignator;
//                 if (fs == 't') {
//                     part = part.charAt(0);
//                 }
//                 break;
//             case 'fff':
//                 part = dt.getMilliseconds().toString().padLeft(3, '0');
//                 break;
//             case 'ff':
//                 part = dt.getMilliseconds().toString().padLeft(3).substr(0, 2);
//                 break;
//             case 'f':
//                 part = dt.getMilliseconds().toString().padLeft(3).charAt(0);
//                 break;
//             case 'z':
//                 part = dt.getTimezoneOffset() / 60;
//                 part = ((part >= 0) ? '-' : '+') + Math.floor(Math.abs(part));
//                 break;
//             case 'zz': case 'zzz':
//                 part = dt.getTimezoneOffset() / 60;
//                 part = ((part >= 0) ? '-' : '+') + Math.floor(Math.abs(part)).toString().padLeft(2, '0');
//                 if (fs == 'zzz') {
//                     part += dtf.timeSeparator + Math.abs(dt.getTimezoneOffset() % 60).toString().padLeft(2, '0');
//                 }
//                 break;
//         }
//         sb.append(part);
//     }
// 
//     return sb.toString();
// }
    }
	
	number() {
// Number.prototype.format = function Number$format(format) {
//     if (ss.isNullOrUndefined(format) || (format.length == 0) || (format == 'i')) {
//         return this.toString();
//     }
//     return this._netFormat(format, false);
// }
// 
// Number.prototype.localeFormat = function Number$format(format) {
//     if (ss.isNullOrUndefined(format) || (format.length == 0) || (format == 'i')) {
//         return this.toLocaleString();
//     }
//     return this._netFormat(format, true);
// }
// 
// Number._commaFormat = function Number$_commaFormat(number, groups, decimal, comma) {
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
// }
// 
// Number.prototype._netFormat = function Number$_netFormat(format, useLocale) {
//     var nf = useLocale ? ss.CultureInfo.CurrentCulture.numberFormat : ss.CultureInfo.InvariantCulture.numberFormat;
// 
//     var s = '';    
//     var precision = -1;
//     
//     if (format.length > 1) {
//         precision = parseInt(format.substr(1));
//     }
// 
//     var fs = format.charAt(0);
//     switch (fs) {
//         case 'd': case 'D':
//             s = parseInt(Math.abs(this)).toString();
//             if (precision != -1) {
//                 s = s.padLeft(precision, '0');
//             }
//             if (this < 0) {
//                 s = '-' + s;
//             }
//             break;
//         case 'x': case 'X':
//             s = parseInt(Math.abs(this)).toString(16);
//             if (fs == 'X') {
//                 s = s.toUpperCase();
//             }
//             if (precision != -1) {
//                 s = s.padLeft(precision, '0');
//             }
//             break;
//         case 'e': case 'E':
//             if (precision == -1) {
//                 s = this.toExponential();
//             }
//             else {
//                 s = this.toExponential(precision);
//             }
//             if (fs == 'E') {
//                 s = s.toUpperCase();
//             }
//             break;
//         case 'f': case 'F':
//         case 'n': case 'N':
//             if (precision == -1) {
//                 precision = nf.numberDecimalDigits;
//             }
//             s = this.toFixed(precision).toString();
//             if (precision && (nf.numberDecimalSeparator != '.')) {
//                 var index = s.indexOf('.');
//                 s = s.substr(0, index) + nf.numberDecimalSeparator + s.substr(index + 1);
//             }
//             if ((fs == 'n') || (fs == 'N')) {
//                 s = Number._commaFormat(s, nf.numberGroupSizes, nf.numberDecimalSeparator, nf.numberGroupSeparator);
//             }
//             break;
//         case 'c': case 'C':
//             if (precision == -1) {
//                 precision = nf.currencyDecimalDigits;
//             }
//             s = Math.abs(this).toFixed(precision).toString();
//             if (precision && (nf.currencyDecimalSeparator != '.')) {
//                 var index = s.indexOf('.');
//                 s = s.substr(0, index) + nf.currencyDecimalSeparator + s.substr(index + 1);
//             }
//             s = Number._commaFormat(s, nf.currencyGroupSizes, nf.currencyDecimalSeparator, nf.currencyGroupSeparator);
//             if (this < 0) {
//                 s = String.format(nf.currencyNegativePattern, s);
//             }
//             else {
//                 s = String.format(nf.currencyPositivePattern, s);
//             }
//             break;
//         case 'p': case 'P':
//             if (precision == -1) {
//                 precision = nf.percentDecimalDigits;
//             }
//             s = (Math.abs(this) * 100.0).toFixed(precision).toString();
//             if (precision && (nf.percentDecimalSeparator != '.')) {
//                 var index = s.indexOf('.');
//                 s = s.substr(0, index) + nf.percentDecimalSeparator + s.substr(index + 1);
//             }
//             s = Number._commaFormat(s, nf.percentGroupSizes, nf.percentDecimalSeparator, nf.percentGroupSeparator);
//             if (this < 0) {
//                 s = String.format(nf.percentNegativePattern, s);
//             }
//             else {
//                 s = String.format(nf.percentPositivePattern, s);
//             }
//             break;
//     }
// 
//     return s;
// }
	}
	
	string() {
// String._format = function String$_format(format, values, useLocale) {
//     if (!String._formatRE) {
//         String._formatRE = /(\{[^\}^\{]+\})/g;
//     }
// 
//     return format.replace(String._formatRE,
//                           function(str, m) {
//                               var index = parseInt(m.substr(1));
//                               var value = values[index + 1];
//                               if (ss.isNullOrUndefined(value)) {
//                                   return '';
//                               }
//                               if (value.format) {
//                                   var formatSpec = null;
//                                   var formatIndex = m.indexOf(':');
//                                   if (formatIndex > 0) {
//                                       formatSpec = m.substring(formatIndex + 1, m.length - 1);
//                                   }
//                                   return useLocale ? value.localeFormat(formatSpec) : value.format(formatSpec);
//                               }
//                               else {
//                                   return useLocale ? value.toLocaleString() : value.toString();
//                               }
//                           });
// }
// 
// String.format = function String$format(format) {
//     return String._format(format, arguments, /* useLocale */ false);
// }
	}

    //#endregion

}