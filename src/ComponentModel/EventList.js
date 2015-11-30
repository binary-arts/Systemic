//TODO: reimplement with a Map as the backing store

import is from '../Runtime/Is';

import Event from './Event';

/**
 * TODO
 * 
 * @public @sealed
 */
export default class EventList {

    /**
     * TODO
     * 
     * @param { ?Object|?Function } source TODO
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
     * @returns { ?Object } TODO
     */
    get events() {
        return this.disposed ? null : this._events || (this._events = {});
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

    //#endregion

    //#region Methods

    /**
     * TODO
     *
     * @public
     *
     * @param { !String } name TODO
     */
    clear(name) {
        if (!this.disposed) {
            const event = this.events[name];
            if (event) event.clearHandlers();
        }
    }

    /**
     * TODO
     *
     * @public
     *
     * @param { !String } name TODO
     * @param { ?Object } [e] TODO
     */
    dispatch(name, e) {
        if (!this.disposed) {
            const event = this.events[name];
            if (event) event.dispatch(e);
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
                if (this._events) {
                    Object
                        .keys(this._events)
                        .forEach(key => this._events[key].dispose());
                }
            }
            finally {
                //teardown
                delete this._events;
                delete this._source;

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
     * @param { !String } name TODO
     * 
     * @returns { ?Object } TODO
     */
    get(name) {
        return this.disposed ? null : (this.events[name] || (this.events[name] = new Event(this.source))).subscription;
    }

    /**
     * TODO
     *
     * @public
     *
     * @returns { !Boolean } TODO
     */

    has(name) {
        return this.events && this.events[name];
    }

    //#endregion

}