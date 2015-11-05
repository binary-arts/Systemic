import is from '../Runtime/Is';

import Debug from '../Diagnostics/Debug';
import FileService from '../Net/FileService';

export default class Culture {

    //#region Type

    //#region Properties

    /**
     * A dictionary that contains the collective state of the Culture type.
     *
     * @private
     * @static
     *
     * @returns { Object }
     */
    static get _() {
        return Culture.__ || (Culture.__ = Object.create(null));
    }

    /**
     * @private
     * @static
     *
     * @returns { Map<String, Culture> }
     */
    static get _cache() {
        return Culture._.cache || (Culture._.cache = () => {
            const result = new Map();

            result.set('en-US', new Culture({
                date: {
                    amPeriod: 'AM',
                    pmPeriod: 'PM',

                    dateSeparator: '/',
                    timeSeparator: ':',

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
                        dateTime: 'DDDDD, MMMMM ddd, yyyyy hh:nnn:sss apap',
                        dateTimeGMT: 'DDDD, ddd MMMM yyyyy hhhhh:nnn:sss GMT',

                        wideDate: 'DDDDD, MMMMM ddd, yyyyy',
                        mediumDate: 'mmm/ddd/yyyyy',
                        shortDate: 'mm/dd/yyy',

                        mediumTime: 'hh:nnn:sss apap',
                        shortTime: 'hh:nnn apap'
                    }
                },
                id: 1033,
                locale: 'en-US',
                name: 'English (United States)',
                number: {
                    nanSymbol: 'NaN',
                    negativeSign: '-',
                    positiveSign: '+',
                    negativeInfinity: '-∞',
                    positiveInfinity: '∞',

                    groupSizes: [3],
                    precision: 2,
                    decimal: '.',
                    group: ',',

                    percent: {
                        symbol: '%',
                        groupSizes: [3],
                        precision: 2,
                        decimal: '.',
                        group: ',',

                        format: {
                            positive: '{0}%',
                            negative: '-{0}%'
                        }
                    },

                    currency: {
                        symbol: '$',
                        groupSizes: [3],
                        precision: 2,
                        decimal: '.',
                        group: ',',

                        format: {
                            positive: '(${0})',
                            negative: '${0}'
                        }
                    }
                }
            }));

            return result;
        }());
    }

    static get current() {
        return Culture._.current || (Culture._.current = Culture.neutral);
    }
    static set current(value = Culture.neutral) {
        Culture._.current = value;
    }

    static get neutral() {
        return Culture._cache.get('en-US');
    }

    static get rootPath() {
        return Culture._.rootPath || (Culture._.rootPath = '');
    }
    static set rootPath(value) {
        Culture._.rootPath = `${(value && !value.endsWith('/')) ? `${value}/` : value}`;
    }

    //#endregion

    //#region Methods

    static fromLocale(locale) {
        //!!! not thread-safe
        return Culture._cache.has(locale)
            ? new Promise(continueWith => { continueWith(Culture._cache.get(locale)); })
            : FileService
                .getObject(`${Culture.rootPath}culture/${locale}.json`)
                .then(graph => graph
                    ? () => {
                        const result = new Culture(graph);
                        Debug.assert(result.locale === locale);

                        //!!! not thread-safe
                        Culture._cache.set(locale, result);

                        return result;
                    }()
                    : null
                );
    }

    //#endregion

    //#endregion

    //#region Disposition

    constructor(graph) {
        Debug.assert(is(graph).anObject);
        Debug.assert(is(graph.id).aNumber);
        Debug.assert(is(graph.locale).aNonEmptyString);
        Debug.assert(is(graph.name).aNonEmptyString);

        Debug.assert(is(graph.number).anObject);
        Debug.assert(is(graph.number.nanSymbol).aNonEmptyString);
        Debug.assert(is(graph.number.negativeSign).aNonEmptyString);
        Debug.assert(is(graph.number.positiveSign).aNonEmptyString);
        Debug.assert(is(graph.number.negativeInfinity).aNonEmptyString);
        Debug.assert(is(graph.number.positiveInfinity).aNonEmptyString);
        Debug.assert(is(graph.number.groupSizes).aNonEmptyArray);
        Debug.assert(is(graph.number.precision).aNumber);
        Debug.assert(is(graph.number.decimal).aNonEmptyString);
        Debug.assert(is(graph.number.seperator).aNonEmptyString);

        Debug.assert(is(graph.number.percent).anObject);
        Debug.assert(is(graph.number.percent.symbol).aNonEmptyString);
        Debug.assert(is(graph.number.percent.groupSizes).aNonEmptyArray);
        Debug.assert(is(graph.number.percent.precision).aNumber);
        Debug.assert(is(graph.number.percent.decimal).aNonEmptyString);
        Debug.assert(is(graph.number.percent.group).aNonEmptyString);
        Debug.assert(is(graph.number.percent.format).anObject);
        Debug.assert(is(graph.number.percent.format.positive).aNonEmptyString);
        Debug.assert(is(graph.number.percent.format.negative).aNonEmptyString);

        Debug.assert(is(graph.number.currency).anObject);
        Debug.assert(is(graph.number.currency.symbol).aNonEmptyString);
        Debug.assert(is(graph.number.currency.groupSizes).aNonEmptyArray);
        Debug.assert(is(graph.number.currency.precision).aNumber);
        Debug.assert(is(graph.number.currency.decimal).aNonEmptyString);
        Debug.assert(is(graph.number.currency.group).aNonEmptyString);
        Debug.assert(is(graph.number.currency.format).anObject);
        Debug.assert(is(graph.number.currency.format.negative).aNonEmptyString);
        Debug.assert(is(graph.number.currency.format.positive).aNonEmptyString);

        Debug.assert(is(graph.date).anObject);
        Debug.assert(is(graph.date.amPeriod).aNonEmptyString);
        Debug.assert(is(graph.date.pmPeriod).aNonEmptyString);
        Debug.assert(is(graph.date.dateSeparator).aNonEmptyString);
        Debug.assert(is(graph.date.timeSeparator).aNonEmptyString);
        Debug.assert(is(graph.date.firstDayOfWeek).aNumber);
        Debug.assert(is(graph.date.wideMonthNames).aNonEmptyArray);
        Debug.assert(is(graph.date.mediumMonthNames).aNonEmptyArray);
        Debug.assert(is(graph.date.shortMonthNames).aNonEmptyArray);
        Debug.assert(is(graph.date.narrowMonthNames).aNonEmptyArray);
        Debug.assert(is(graph.date.wideDayNames).aNonEmptyArray);
        Debug.assert(is(graph.date.mediumDayNames).aNonEmptyArray);
        Debug.assert(is(graph.date.shortDayNames).aNonEmptyArray);
        Debug.assert(is(graph.date.narrowDayNames).aNonEmptyArray);

        Debug.assert(is(graph.date.format).anObject);
        Debug.assert(is(graph.date.format.dateTime).aNonEmptyString);
        Debug.assert(is(graph.date.format.dateTimeGMT).aNonEmptyString);
        Debug.assert(is(graph.date.format.wideDate).aNonEmptyString);
        Debug.assert(is(graph.date.format.mediumDate).aNonEmptyString);
        Debug.assert(is(graph.date.format.shortDate).aNonEmptyString);
        Debug.assert(is(graph.date.format.mediumTime).aNonEmptyString);
        Debug.assert(is(graph.date.format.shortTime).aNonEmptyString);

        //init
        graph.date.format.sortable = 'yyyyy-mmm-dddThhhhh:nnn:sss';
        graph.date.format.universal = 'yyyyy-mmm-ddd hhhhh:nnn:ssszzz';

        this._.graph = graph;
    }

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

    get date() {
        return this._graph.date;
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

    get locale() {
        return this._graph.locale;
    }

    get name() {
        return this._graph.name;
    }

    get number() {
        return this._graph.number;
    }

    get region() {
        //TBI code defensively
        return this.name.split('-')[1];
    }

    //#endregion

}