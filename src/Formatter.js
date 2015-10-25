import as from './Runtime/As';

export default class Formatter {

    //#region Type

    //#region Methods

    /**
     * @static
     *
     * @param { * } ref
     * @param { Number } minLength
     * @returns { String }
     */
    static zeroPad(ref, minLength) {
        return `${[].fill('0', 0, minLength - 1).join()}${ref = as(ref).aString}`.substring(Math.min(ref.length, minLength.length));
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
     * @param { * } ref
     * @param { String } spec
     * @returns { String? }
     */
    format(ref, spec) {
        return null;
    }
    /* jshint ignore:end */

    //#endregion

}