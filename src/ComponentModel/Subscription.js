import is from '../Runtime/Is';

import Debug from '../Diagnostics/Debug';
import Event from './Event';

/**
 * TODO
 */
export default class Subscription {

    constructor(event) {
        Debug.assert(is(event).a(Event));

        //init
        this._.addHandler = event.addHandler.bind(event);
        this._.removeHandler = event.removeHandler.bind(event);
    }

    //#region Properties

    /**
     * A dictionary that contains the collective state of a Subscription instance.
     *
     * @private
     *
     * @returns { Object }
     */
    get _() {
        return this.__ || (this.__ = Object.create(null));
    }

    get addHandler() {
        const result = this._.addHandler;

        Debug.assert(is(result).aFunction);

        return result;
    }

    get disposed() {
        const result = this._.disposed || (this._.disposed = false);

        Debug.assert(is(result).aBoolean);

        return result;
    }

    get removeHandler() {
        const result = this._.removeHandler;

        Debug.assert(is(result).aFunction);

        return result;
    }
    //#endregion

    //#region Methods

    dispose() {
        if (!this.disposed) {
            //teardown
            delete this._.addHandler;
            delete this._.removeHandler;

            //state
            this._.disposed = true;
        }
    }

    //#endregion

}