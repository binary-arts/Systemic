import as from './Runtime/As';

import Culture from './Globalization/Culture';
import Exception from './Runtime/Exception';

export default class Formatter {

    //#region Type

    //#region Properties

    /**
     * @abstract
     * @static
     *
     * @returns { Formatter }
     */
    static get current() {
        throw Exception.create('Cannot invoke an abstract member.');
    }

    //#endregion

    //#region Methods

    /**
     * @static
     *
     * @param { Any } ref
     * @param { Number } minLength
     * @returns { String }
     */
    static zeroPad(ref, minLength) {
        const pad = [];
        for (let i = 0, c = minLength; i < c; i++) pad.push('0');

        return `${pad.join('') }${ref = as(ref).aString || ''}`.substring(Math.min(ref.length, minLength));
    }

    //#endregion

    //#endregion

    //#region Disposition

    /**
     * @param { Culture? } culture
     */
    constructor(culture = Culture.neutral) {
        //init
        this._.culture = culture;
    }

    //#endregion

    //#region Properties

    /**
     * A dictionary that contains the collective state of a Formatter instance.
     *
     * @protected
     *
     * @returns { Object }
     */
    get _() {
        return this.__ || (this.__ = Object.create(null));
    }

    /**
     * @protected
     *
     * @returns { Culture }
     */
    get _culture() {
        return this._.culture;
    }

    /**
     * @returns { String }
     */
    get locale() {
        return this._culture.locale;
    }

    /**
     * @virtual
     *
     * @returns { Array<T> }
     */
    get priorityTypes() {
        return this._.priorityTypes || (this._.priorityTypes = []);
    }

    //#endregion

    //#region Methods

    /* jshint ignore:start */
    /**
     * @abstract
     *
     * @param { Any } ref
     * @param { String } spec
     * @returns { ?String }
     */
    format(ref, spec) {
        throw Exception.create('Cannot invoke an abstract member.');
    }
    /* jshint ignore:end */

    //#endregion

}