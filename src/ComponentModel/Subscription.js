/**
 * TODO
 *
 * @public @sealed
 */
export default class Subscription {

    /**
     * TODO
     *
     * @param { !Event } event TODO
     */
    constructor(event) {
        this._addHandler = event.addHandler.bind(event);
        this._removeHandler = event.removeHandler.bind(event);
    }

    //#region Properties

    /**
     * TODO
     *
     * @public
     *
     * @returns { !Function } TODO
     */
    get addHandler() {
        return this._addHandler;
    }

    /**
     * TODO
     *
     * @public
     *
     * @returns { !Boolean } TODO
     */
    get disposed() {
        return this._disposed || (this._disposed = false);
    }

    /**
     * TODO
     *
     * @public
     *
     * @returns { !Function } TODO
     */
    get removeHandler() {
        return this._removeHandler;
    }
    //#endregion

    //#region Methods

    /**
     * TODO
     *
     * @public
     */
    dispose() {
        if (!this.disposed) {
            //teardown
            Reflect.deleteProperty(this, '_addHandler');
            Reflect.deleteProperty(this, '_removeHandler');

            //state
            this._disposed = true;
        }
    }

    //#endregion

}