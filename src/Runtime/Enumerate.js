//TBI support items decomposition beyond Array
//TBI consider a plugin architecture for comprehensions and terminal operators

import is from './Is';

class Enumerate {

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
     * @param { Array } items
     *      An array to select from.
     * @returns { Array }
     *      A new array whose items are the result of invoking the transform operation.
     */
    static _select(selector, items) {
        return items.map(selector);
    }

    //#endregion

    //#endregion

    //#region Disposition

    /**
     * @param { Array<Any> } items
     */
    constructor(items) {
        //init
        this._.items = items
            .map(item => is(item).anArray ? item : [item])
            .reduce((aggregate, items) => (aggregate || []).concat(items));
    }

    //#endregion

    //#region Properties

    /**
     * A dictionary that contains the collective state of this Enumerate instance.
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
    get _items() {
        return this._.items;
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
     * @param { Function<?Object, Number?, Array?> } selector
     *      A transform operation to apply.
     * @returns { Enumerate }
     *      This enumerate instance, useful for chaining multiple operations.
     */
    select(selector) {
        this._operations.push(Enumerate._select.bind(this, selector));
        return this;
    }

    /**
     * @returns { Array<Any> }
     */
    toArray() {
        let result = this._items;

        for (const operation of this._operations)
            result = operation.bind(this, result)();

        return result;
    }

    //#endregion

}

export default (...items) => new Enumerate(items);