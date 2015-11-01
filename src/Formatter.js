import as from './Runtime/As';

export default class Formatter {

    //#region Type

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
     * @virtual
     *
     * @param { Any } ref
     * @param { String } spec
     * @returns { ?String }
     */
    format(ref, spec) {
        return null;
    }
    /* jshint ignore:end */

    //#endregion

}