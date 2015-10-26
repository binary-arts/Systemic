//TBI support enumerable types beyond Array
//TBI consider a plugin architecture for comprehensions and terminal operators

import as from './As';

class Query {

    //#region Type

    //#region Methods

    /**
     * Projects items into a new form.
     *
     * @private
     * @static
     *
     * @param { Function<?Object, Number?, Array?> } selector
     *      A transform operation to apply.
     * @param { Array } enumerable
     *      An array to select from.
     * @returns { Array }
     *      A new array whose items are the result of invoking the transform operation.
     */
    static _select(selector, enumerable) {
        return enumerable.map(selector);
    }

    //#endregion

    //#endregion

    //#region Disposition

    /**
     * @param { Any } enumerable
     */
    constructor(enumerable) {
        //init
        this._.enumerable = as(enumerable).anArray || [];
    }

    //#endregion

    //#region Properties

    /**
     * A dictionary that contains the collective state of this Query instance.
     *
     * @private
     *
     * @returns { Object }
     */
    get _() {
        return this.__ || (this.__ = Object.create(null));
    }

    /**
     * @private
     *
     * @returns { Array<Any> }
     */
    get _enumerable() {
        return this._.enumerable;
    }

    /**
     * @private
     *
     * @returns { Array<Function> }
     */
    get _operations() {
        return this._.operations || (this._.operations = []);
    }

    //#endregion

    //#region Methods

    /**
     * Projects items into a new form.
     *
     * @private
     *
     * @param { Function<?Object, Number?, Array?> } selector
     *      A transform operation to apply.
     * @returns { Query }
     *      This query instance, useful for chaining multiple operations.
     */
    select(selector) {
        this._operations.push(Query._select.bind(this, selector));
        return this;
    }

    /**
     * @returns { Array<Any> }
     */
    toArray() {
        let result = this._enumerable;

        for (const operation of this._operations)
            result = operation.bind(this, result)();

        return result;
    }

    //#endregion

}

export default (enumerable) => new Query(enumerable);