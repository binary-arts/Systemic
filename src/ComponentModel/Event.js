import is from '../Runtime/Is';

import Subscription from './Subscription';

/**
 * TODO
 * 
 * @public sealed
 */
export default class Event {

    /**
     * TODO
     *
     * @param { !Object|!Function } source TODO
     */
    constructor(source) {
        this._source = source;
    }

    //#region Properties

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
     * @private
     *
     * @returns { ?Array } TODO
     */
    get handlers() {
        return this.disposed ? null : this._handlers || (this._handlers = []);
    }

    /**
     * TODO
     *
     * @private
     *
     * @returns { !Object|!Function } TODO
     */
    get source() {
        return this._source;
    }

    /**
     * TODO
     *
     * @public
     *
     * @returns { ?Subscription } TODO
     */
    get subscription() {
        return this.disposed ? null : this._subscription || (this._subscription = new Subscription(this));
    }

    //#endregion

    //#region Methods

    /**
     * TODO
     *
     * @public
     *
     * @param { !Function } handler TODO
     */
    addHandler(handler) {
        if (!this.disposed && this.handlers.indexOf(handler) === -1) this.handlers.push(handler);
    }

    /**
     * TODO
     *
     * @public
     */
    clearHandlers() {
        if (!this.disposed) this.handlers.length = 0;
    }

    /**
     * TODO
     *
     * @public
     *
     * @param { ?Object } [e] TODO
     */
    dispatch(e) {
        if (!this.disposed) {
            if (!is(e).anObject) e = {};

            let thrown = false;

            this.handlers.forEach(
                handler => {
                    if (!thrown) {
                        try { handler.bind(null, this.source, e)(); }
                        catch (ex) {
                            thrown = true;
                            throw ex;
                        }
                    }
                }
            );
        }
    }

    /**
     * TODO
     *
     * @public
     */
    dispose() {
        if (!this.disposed) {
            try {
                //transitive disposal
                if (this._subscription) this._subscription.dispose();
            }
            finally {
                //teardown
                if (this._handlers) this._handlers.length = 0;

                delete this._handlers;
                delete this._source;
                delete this._subscription;

                //state
                this._disposed = true;
            }
        }
    }

    /**
     * TODO
     *
     * @public
     *
     * @param { !Function } handler TODO
     */
    removeHandler(handler) {
        Debug.assert(is(handler).aFunction);

        if (!this.disposed) {
            const index = this.handlers.indexOf(handler);

            if (index >= 0) this.handlers.splice(index, 1);
        }
    }

    //#endregion

}