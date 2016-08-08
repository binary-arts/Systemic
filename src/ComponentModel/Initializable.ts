//TODO: convert isInitialized to an async property (use an empty promise as a signal)

import { Disposable } from './Disposable';
import { Event, EventArgs } from './Event';

import { cannotBeDisposed } from './Disposable';

export abstract class Initializable extends Disposable {
    //#region State

    //stores
    private _isInitialized: boolean = false;

    //#endregion

    //#region Disposition

    public constructor() {
        super();

        //!!! async init... guaranteed to occur after all sync logic in derived constructors runs
        // this._isInitialized = new Promise((continueWith, throwWith) => {
        //     try {
        //         this.initializing();
        //         continueWith();
        //     }
        //     catch(ex) {
        //         throwWith(ex);
        //     }
        // });
        setTimeout(
            () => {
                this.initializing();
                this._isInitialized = true;
            },
            0
        );
    }

    protected initializing() {
        this.events.publish('initializing', EventArgs.empty(this));
    }

    //#endregion

    //#region Events

    public get oninitializing(): Event<Initializable, EventArgs<Initializable>> {
        return this.events.get('initializing');
    }

    //#endregion

    //#region Properties

    @cannotBeDisposed()
    public get isInitialized(): boolean {
        return this._isInitialized;
    }

    //#endregion
}
