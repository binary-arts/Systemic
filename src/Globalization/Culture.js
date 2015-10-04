import is from '../Runtime/Is';

import Debug from '../Diagnostics/Debug';
//import FileService from '../Net/FileService';

export default class Culture {

    constructor(graph) {
        Debug.assert(is(graph).anObject);
        Debug.assert(is(graph.id).aNumber);
        Debug.assert(is(graph.name).aNonEmptyString);

        Debug.assert(is(graph.numberFormat).anObject);

        Debug.assert(is(graph.numberFormat.nanSymbol).aNonEmptyString);
        Debug.assert(is(graph.numberFormat.negativeSign).aNonEmptyString);
        Debug.assert(is(graph.numberFormat.positiveSign).aNonEmptyString);
        Debug.assert(is(graph.numberFormat.negativeInfinityText).aNonEmptyString);
        Debug.assert(is(graph.numberFormat.positiveInfinityText).aNonEmptyString);

        Debug.assert(is(graph.numberFormat.numberGroupSizes).aNonEmptyArray);
        Debug.assert(is(graph.numberFormat.numberDecimalDigits).aNumber);
        Debug.assert(is(graph.numberFormat.numberDecimalSeparator).aNonEmptyString);
        Debug.assert(is(graph.numberFormat.numberGroupSeparator).aNonEmptyString);

        Debug.assert(is(graph.numberFormat.percentSymbol).aNonEmptyString);
        Debug.assert(is(graph.numberFormat.percentGroupSizes).aNonEmptyArray);
        Debug.assert(is(graph.numberFormat.percentDecimalDigits).aNumber);
        Debug.assert(is(graph.numberFormat.percentDecimalSeparator).aNonEmptyString);
        Debug.assert(is(graph.numberFormat.percentGroupSeparator).aNonEmptyString);
        Debug.assert(is(graph.numberFormat.percentPositivePattern).aNonEmptyString);
        Debug.assert(is(graph.numberFormat.percentNegativePattern).aNonEmptyString);

        Debug.assert(is(graph.numberFormat.currencySymbol).aNonEmptyString);
        Debug.assert(is(graph.numberFormat.currencyGroupSizes).aNonEmptyArray);
        Debug.assert(is(graph.numberFormat.currencyDecimalDigits).aNumber);
        Debug.assert(is(graph.numberFormat.currencyDecimalSeparator).aNonEmptyString);
        Debug.assert(is(graph.numberFormat.currencyGroupSeperator).aNonEmptyString);
        Debug.assert(is(graph.numberFormat.currencyNegativePattern).aNonEmptyString);
        Debug.assert(is(graph.numberFormat.currencyPositivePattern).aNonEmptyString);

        Debug.assert(is(graph.dateFormat).anObject);

        Debug.assert(is(graph.dateFormat.amDesignator).aNonEmptyString);
        Debug.assert(is(graph.dateFormat.pmDesignator).aNonEmptyString);

        Debug.assert(is(graph.dateFormat.dateSeparator).aNonEmptyString);
        Debug.assert(is(graph.dateFormat.timeSeparator).aNonEmptyString);

        Debug.assert(is(graph.dateFormat.gmtDateTimePattern).aNonEmptyString);
        Debug.assert(is(graph.dateFormat.universalDateTimePattern).aNonEmptyString);
        Debug.assert(is(graph.dateFormat.sortableDateTimePattern).aNonEmptyString);
        Debug.assert(is(graph.dateFormat.dateTimePattern).aNonEmptyString);

        Debug.assert(is(graph.dateFormat.longDatePattern).aNonEmptyString);
        Debug.assert(is(graph.dateFormat.shortDatePattern).aNonEmptyString);

        Debug.assert(is(graph.dateFormat.longTimePattern).aNonEmptyString);
        Debug.assert(is(graph.dateFormat.shortTimePattern).aNonEmptyString);

        Debug.assert(is(graph.dateFormat.firstDayOfWeek).aNumber);
        Debug.assert(is(graph.dateFormat.dayNames).aNonEmptyArray);
        Debug.assert(is(graph.dateFormat.shortDayNames).aNonEmptyArray);
        Debug.assert(is(graph.dateFormat.minimizedDayNames).aNonEmptyArray);

        Debug.assert(is(graph.dateFormat.monthNames).aNonEmptyArray);
        Debug.assert(is(graph.dateFormat.shortMonthNames).aNonEmptyArray);

        //init
        this._.graph = graph;
    }
    
    //#region Type
    
    //#region Properties

    /**
     * A dictionary that contains the collective state of the Culture type.
     *
     * @private
     *
     * @returns { Object }
     */
    static get _() {
        return Culture.__ || (Culture.__ = Object.create(null));
    }

    static get current() {
        return Culture._.current || (Culture._.current = Culture.neutral);
    }
    static set current(value) {
        Culture._.current = value;
    }

    static get neutral() {
        return Culture._.neutral || (Culture._.neutral = new Culture({
            dateFormat: {
                amDesignator: 'AM',
                pmDesignator: 'PM',

                dateSeparator: '/',
                timeSeparator: ':',

                gmtDateTimePattern: 'ddd, dd MMM yyyy HH:mm:ss \'GMT\'',
                universalDateTimePattern: 'yyyy-MM-dd HH:mm:ssZ',
                sortableDateTimePattern: 'yyyy-MM-ddTHH:mm:ss',
                dateTimePattern: 'dddd, MMMM dd, yyyy h:mm:ss tt',

                longDatePattern: 'dddd, MMMM dd, yyyy',
                shortDatePattern: 'M/d/yyyy',

                longTimePattern: 'h:mm:ss tt',
                shortTimePattern: 'h:mm tt',

                firstDayOfWeek: 0,
                dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
                shortDayNames: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                minimizedDayNames: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],

                monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December', ''],
                shortMonthNames: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', '']
            },
            id: 1033,
            name: 'en-US',
            numberFormat: {
                nanSymbol: 'NaN',
                negativeSign: '-',
                positiveSign: '+',
                negativeInfinityText: '-Infinity',
                positiveInfinityText: 'Infinity',

                numberGroupSizes: [3],
                numberDecimalDigits: 2,
                numberDecimalSeparator: '.',
                numberGroupSeparator: ',',

                percentSymbol: '%',
                percentGroupSizes: [3],
                percentDecimalDigits: 2,
                percentDecimalSeparator: '.',
                percentGroupSeparator: ',',
                percentPositivePattern: '{0} %',
                percentNegativePattern: '-{0} %',

                currencySymbol: '$',
                currencyGroupSizes: [3],
                currencyDecimalDigits: 2,
                currencyDecimalSeparator: '.',
                currencyGroupSeparator: ',',
                currencyNegativePattern: '(${0})',
                currencyPositivePattern: '${0}'
            }           
        }));
    }

    //#endregion
    
    //#region Methods

    fromName(name) {
        return name;
        //return null;
        // return name === 'en-US'
        //     ? $
        //         .Deferred(function(task) { task.resolve(Culture.neutral); })
        //         .promise()
        //     : FileService
        //         .getObject(`culture/${name}.js`)
        //         .then(function(graph) { return graph ? new Culture(graph) : null; });
    }

    //#endregion
    
    //#endregion
    
    //#region Properties
    
    /**
     * A dictionary that contains the collective state of a Culture instance.
     *
     * @private
     *
     * @returns { Object }
     */
    get _() {
        return this.__ || (this.__ = Object.create(null));
    }

    get amDesignator() {
        return this._graph.dateFormat.amDesignator;
    }

    get currencyDecimalDigits() {
        return this._graph.numberFormat.currencyDecimalDigits;
    }

    get currencyDecimalSeparator(){
        return this._graph.numberFormat.currencyDecimalSeparator;
    }

    get currencyGroupSeparator() {
        return this._graph.numberFormat.currencyGroupSeparator;
    }

    get currencyGroupSizes() {
        return this._graph.numberFormat.currencyGroupSizes;
    }

    get currencyNegativePattern() {
        return this._graph.numberFormat.currencyNegativePattern;
    }
        
    get currencyPositivePattern() {
        return this._graph.numberFormat.currencyPositivePattern;
    }

    get currencySymbol() {
        return this._graph.numberFormat.currencySymbol;
    }

    get dateSeparator() {
        return this._graph.dateFormat.dateSeparator;
    }

    get dateTimePattern() {
        return this._graph.dateFormat.dateTimePattern;
    }

    get dayNames() {
        return this._graph.dateFormat.dayNames;
    }

    get firstDayOfWeek() {
        return this._graph.dateFormat.firstDayOfWeek;
    }

    get gmtDateTimePattern() {
        return this._graph.dateFormat.gmtDateTimePattern;
    }

    get _graph(){
        return this._.graph;
    }

    get id() {
        return this._graph.id;
    }

    get language() {
        //TBI code defensively
        return this.name.split('-')[0];
    }

    get longDatePattern() {
        return this._graph.dateFormat.longDatePattern;
    }

    get longTimePattern() {
        return this._graph.dateFormat.longTimePattern;
    }

    get minimizedDayNames() {
        return this._graph.dateFormat.minimizedDayNames;
    }

    get monthNames() {
        return this._graph.dateFormat.monthNames;
    }

    get name() {
        return this._graph.name;
    }

    get nanSymbol() {
        return this._graph.numberFormat.nanSymbol;
    }

    get negativeInfinityText() {
        return this._graph.numberFormat.negativeInfinityText;
    }

    get negativeSign() {
        return this._graph.numberFormat.negativeSign;
    }

    get numberGroupSizes() {
        return this._graph.numberFormat.numberGroupSizes;
    }

    get numberDecimalDigits() {
        return this._graph.numberFormat.numberDecimalDigits;
    }

    get numberDecimalSeparator() {
        return this._graph.numberFormat.numberDecimalSeparator;
    }

    get numberGroupSeparator() {
        return this._graph.numberFormat.numberGroupSeparator;
    }

    get percentDecimalDigits() {
        return this._graph.numberFormat.percentDecimalDigits;
    }

    get percentDecimalSeparator() {
        return this._graph.numberFormat.percentDecimalSeparator;
    }

    get percentGroupSeparator() {
        return this._graph.numberFormat.percentGroupSeparator;
    }

    get percentGroupSizes() {
        return this._graph.numberFormat.percentGroupSizes;
    }

    get percentNegativePattern() {
        return this._graph.numberFormat.percentNegativePattern;
    }

    get percentPositivePattern() {
        return this._graph.numberFormat.percentPositivePattern;
    }

    get percentSymbol() {
        return this._graph.numberFormat.percentSymbol;
    }

    get pmDesignator() {
        return this._graph.dateFormat.pmDesignator;
    }

    get positiveInfinityText() {
        return this._graph.numberFormat.positiveInfinityText;
    }

    get positiveSign() {
        return this._graph.numberFormat.positiveSign;
    }

    get region() {
        //TBI code defensively
        return this.name.split('-')[1];
    }

    get shortDatePattern() {
        return this._graph.dateFormat.shortDatePattern;
    }

    get shortDayNames() {
        return this._graph.dateFormat.shortDayNames;
    }

    get shortMonthNames() {
        return this._graph.dateFormat.shortMonthNames;
    }

    get shortTimePattern() {
        return this._graph.dateFormat.shortTimePattern;
    }

    get sortableDateTimePattern() {
        return this._graph.dateFormat.sortableDateTimePattern;
    }

    get timeSeparator() {
        return this._graph.dateFormat.timeSeparator;
    }

    get universalDateTimePattern() {
        return this._graph.dateFormat.universalDateTimePattern;
    }

    //#endregion

}