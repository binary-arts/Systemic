import is from '../Runtime/Is';

import Debug from '../Diagnostics/Debug';
import Subscription from './Subscription';

/**
 * TODO
 */
export default class Event {

    constructor(source) {
        Debug.assert(is(source).anObject || is(source).aFunction);

        //init
        this._.source = source;
    }

    //#region Properties

    /**
     * A dictionary that contains the collective state of an Event instance.
     *
     * @private
     *
     * @returns { Object }
     */
    get _() {
        return this.__ || (this.__ = Object.create(null));
    }

    get disposed() {
        const result = this._.disposed || (this._.disposed = false);

        Debug.assert(is(result).aBoolean);

        return result;
    }

    get _handlers() {
        const result = this.disposed ? null : (this._.handlers || (this._.handlers = []));

        Debug.assert((this.disposed && is(result).null) || is(result).anArray);

        return result;
    }

    get _source() {
        const result = this._.source;

        Debug.assert(is(result).anObject || is(result).aFunction);

        return result;
    }

    get subscription() {
        const result = this.disposed ? null : (this._.subscription || (this._.subscription = new Subscription(this)));

        Debug.assert((this.disposed && is(result).null) || is(result).a(Subscription));

        return result;
    }

    //#endregion

    //#region Methods

    addHandler(handler) {
        Debug.assert(is(handler).aFunction);

        if (!this.disposed && this._handlers.indexOf(handler) === -1)
            this._handlers.push(handler);
    }

    clearHandlers() {
        if (!this.disposed)
            this._handlers.length = 0;
    }

    dispatch(e) {
        if (!this.disposed) {
            if (!is(e).anObject) e = {};

            let thrown = false;

            this._handlers.forEach(
                handler => {
                    if (!thrown) {
                        try { handler.bind(null, this._source, e)(); }
                        catch (ex) {
                            thrown = true;
                            throw ex;
                        }
                    }
                }
            );
        }
    }

    dispose() {
        if (!this.disposed) {
            try {
                //transitive disposal
                if (this._.subscription) this._.subscription.dispose();
            }
            finally {
                //teardown
                if (this._.handlers) this._.handlers.length = 0;

                delete this._.handlers;
                delete this._.source;
                delete this._.subscription;

                //state
                this._.disposed = true;
            }
        }
    }

    removeHandler(handler) {
        Debug.assert(is(handler).aFunction);

        if (!this.disposed) {
            const index = this._handlers.indexOf(handler);

            if (index >= 0)
                this._handlers.splice(index, 1);
        }
    }

    //#endregion

}