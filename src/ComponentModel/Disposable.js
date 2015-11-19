import is from '../Runtime/Is';

import Debug from '../Diagnostics/Debug';
import Disposition from './Disposition';
import EventList from './EventList';
import Exception from '../Runtime/Exception';

/**
 * TODO
 */
export default class Disposable {

    //#region Events

    get disposing() {
        const result = this._events.get('disposing');

        Debug.assert(is(result).anObject);

        return result;
    }

    //#endregion

    //#region Properties

    /**
     * A dictionary that contains the collective state of a Disposable instance.
     *
     * @private
     *
     * @returns { Object }
     */
    get _() {
        return this.__ || (this.__ = Object.create(null));
    }

    get disposed() {
        const result = this.disposition === Disposition.Disposed;

        Debug.assert(is(result).aBoolean);

        return result;
    }

    get disposition() {
        return this._disposition;
    }
    get _disposition() {
        const result = this._.disposition || (this._.disposition = this._supportsInitialization ? Disposition.Uninitialized : Disposition.Live);

        Debug.assert(is(result).aNumber);

        return result;
    }
    set _disposition(value) {
        if (this.disposition !== value) {
            Debug.assert(value !== Disposition.Uninitialized || this.disposition === Disposition.Initializing);
            Debug.assert(value !== Disposition.Initializing || this.disposition === Disposition.Uninitialized);
            Debug.assert(value !== Disposition.Live || this.disposition === Disposition.Initializing);
            Debug.assert(value !== Disposition.Disposing || (this.disposition !== Disposition.Disposing && this.disposition !== Disposition.Disposed));
            Debug.assert(value !== Disposition.Disposed || this.disposition === Disposition.Disposing);

            this._.disposition = value;
        }
    }

    get _events() {
        const result = this.disposed ? null : (this._.events || (this._.events = new EventList(this)));

        Debug.assert((this.disposed && is(result).null) || is(result).a(EventList));

        return result;
    }

    get _supportsInitialization() {
        const result = false;

        Debug.assert(is(result).aBoolean);

        return result;
    }

    //#endregion

    //#region Methods

    _dispatch(name, e) {
        Debug.assert(is(name).aNonEmptyString);

        if (!this.disposed) this._events.dispatch(name, e);
    }

    dispose() {
        if (!this.disposed && this.disposition !== Disposition.Disposing) {
            try {
                this._disposition = Disposition.Disposing;
                this._onDisposing();
            }
            finally {
                try {
                    //transitive disposal
                    //TODO: support object disposal by key
                    //TODO: support array disposal by entry
                    Object
                        .keys(this._)
                        .forEach(key => {
                            if (is(this._[key].dispose).aFunction) this._[key].dispose();
                        });
                }
                finally {
                    //teardown
                    //TODO: support object disposal by key (nullify the key)
                    //TODO: support array teardown by entry (set length = 0);
                    Object
                        .keys(this._)
                        .forEach(key => delete this._[key]);

                    //state
                    this._disposition = Disposition.Disposed;
                }
            }
        }
    }

    initialize() {
        if (this.disposition === Disposition.Uninitialized) {
            try {
                this._disposition = Disposition.Initializing;

                if (this._onInitialize()) this._disposition = Disposition.Live;
                else throw Exception.create('An error occurred during object initialization.');
            }
            catch (ex) {
                this._disposition = Disposition.Uninitialized;
                throw ex;
            }
        }
    }

    _onDisposing() {
        this._dispatch('disposing');
    }

    _onInitialize() {
        const result = true;

        Debug.assert(is(result).aBoolean);

        return result;
    }

    //#endregion

}