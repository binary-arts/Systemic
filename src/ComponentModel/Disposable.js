//TODO: get rid of initialize state and prefer to do async init on construction, with a promise as the initialization token

import is from '../Runtime/Is';

import Debug from '../Diagnostics/Debug';
import Disposition from './Disposition';
import EventList from './EventList';
import Exception from '../Runtime/Exception';

/**
 * A base class that provides a mechanism for managing object lifetime.
 * 
 * @public
 */
export default class Disposable {

    //#region Events

    /**
     * TODO
     *
     * @public
     *
     * @returns { !Object } TODO
     */
    get disposing() {
        return this._events.get('disposing');
    }

    //#endregion

    //#region Properties

    /**
     * TODO
     *
     * @public
     *
     * @returns { !Boolean } TODO
     */
    get disposed() {
        return this.disposition === Disposition.Disposed;
    }

    /**
     * TODO
     *
     * @private
     *
     * @returns { !Number } TODO
     */
    get disposition() {
        return this._disposition || (this._disposition = this.supportsInitialization ? Disposition.Uninitialized : Disposition.Live);
    }
    /**
     * TODO
     *
     * @private
     *
     * @param { !Number } value TODO
     */
    set disposition(value) {
        const disposition = this.disposition;
        
        if (disposition !== value) {
            Debug.assert(value !== Disposition.Uninitialized || disposition === Disposition.Initializing);
            Debug.assert(value !== Disposition.Initializing || disposition === Disposition.Uninitialized);
            Debug.assert(value !== Disposition.Live || disposition === Disposition.Initializing);
            Debug.assert(value !== Disposition.Disposing || disposition !== Disposition.Disposing && disposition !== Disposition.Disposed);
            Debug.assert(value !== Disposition.Disposed || disposition === Disposition.Disposing);

            this._disposition = value;
        }
    }

    /**
     * TODO
     *
     * @private
     *
     * @returns { ?EventList } TODO
     */
    get events() {
        return this.disposed ? null : this._events || (this._events = new EventList(this));
    }

    /**
     * TODO
     *
     * @protected @virtual
     *
     * @returns { !Boolean } TODO
     */
    get supportsInitialization() {
        return false;
    }

    //#endregion

    //#region Methods

    /**
     * TODO
     *
     * @private
     *
     * @param { !String } name TODO
     * @param { !Object } e TODO
     */
    dispatch(name, e) {
        if (!this.disposed) this.events.dispatch(name, e);
    }

    /**
     * Performs application-defined tasks associated with releasing references and resetting internal 
     * state.
     *
     * @public
     */
    dispose() {
        if (!this.disposed && this.disposition !== Disposition.Disposing) {
            try {
                this.disposition = Disposition.Disposing;
                this.onDisposing();
            }
            finally {
                try {
                    //transitive disposal
                    //TODO: enumerate backing store only (_ state)
                    //TODO: support object disposal by key
                    //TODO: support array disposal by entry
                    Object
                        .keys(this)
                        .forEach(key => {
                            if (is(this[key].dispose).aFunction) this[key].dispose();
                        });
                }
                finally {
                    //teardown
                    //TODO: enumerate backing store only (_ state)
                    //TODO: support object disposal by key (nullify the key)
                    //TODO: support array teardown by entry (set length = 0);
                    Object
                        .keys(this)
                        .forEach(key => delete this[key]);

                    //state
                    this.disposition = Disposition.Disposed;
                }
            }
        }
    }

    /**
     * TODO
     *
     * @protected
     */
    initialize() {
        if (this.disposition === Disposition.Uninitialized) {
            try {
                this.disposition = Disposition.Initializing;

                if (this.onInitialize()) this.disposition = Disposition.Live;
                else throw Exception.create('An error occurred during object initialization.');
            }
            catch (ex) {
                this.disposition = Disposition.Uninitialized;
                throw ex;
            }
        }
    }

    /**
     * TODO
     *
     * @protected @virtual
     */
    onDisposing() {
        this.dispatch('disposing');
    }

    /**
     * TODO
     *
     * @protected @virtual
     * 
     * @returns { !Boolean } TODO
     */
    onInitialize() {
        return true;
    }

    //#endregion

}