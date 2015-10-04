import is from '../Runtime/Is';

import Debug from '../Diagnostics/Debug';
import Event from './Event';

export default class EventList {

    constructor(source) {
        Debug.assert(is(source).anObject || is(source).aFunction);

        //init
        this._.source = source;
    }

    //#region Properties

    /**
     * A dictionary that contains the collective state of an EventList instance.
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

    get _events() {
        const result = this.disposed ? null : (this._.events || (this._.events = {}));

        Debug.assert((this.disposed && is(result).null) || is(result).anObject);

        return result;
    }

    get _source() {
        const result = this._.source;

        Debug.assert(is(result).anObject || is(result).aFunction);

        return result;
    }

    //#endregion

    //#region Methods

    clear(name) {
        Debug.assert(is(name).aNonEmptyString);

        if (!this.disposed) {
            const event = this._events[name];
            if (event) event.clearHandlers();
        }
    }

    dispatch(name, e) {
        Debug.assert(is(name).aNonEmptyString);

        if (!this.disposed) {
            const event = this._events[name];
            if (event) event.dispatch(e);
        }
    }

    dispose() {
        if (!this.disposed) {
            try {
                //transitive disposal
                if (this._.events)
                    Object
                        .keys(this._.events)
                        .forEach(key => this._.events[key].dispose());
            }
            finally {
                //teardown
                delete this._.events;
                delete this._.source;

                //state
                this._.disposed = true;
            }
        }
    }

    get(name) {
        Debug.assert(is(name).aNonEmptyString);

        const result = this.disposed ? null : (this._events[name] || (this._events[name] = new Event(this._source))).subscription;

        Debug.assert((this.disposed && is(result).null) || is(result).anObject);

        return result;
    }

    has(name) {
        const result = this._events && this._events[name];

        Debug.assert(is(result).aBoolean);

        return result;
    }

    //#endregion

}