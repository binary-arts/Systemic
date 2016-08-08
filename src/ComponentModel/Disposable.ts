import { Disposable as IDisposable } from 'aurelia-framework';
import { Event, EventArgs, EventList } from './Event';

import { is } from '../Runtime/Is';

/**
 * Decorates properties of Disposable types that should throw errors if called on a disposed instance.
 */
export function cannotBeDisposed(): (target: Disposable, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) => TypedPropertyDescriptor<any> {
    return function(target: Disposable, propertyKey: string, descriptor: TypedPropertyDescriptor<any>): TypedPropertyDescriptor<any> {
        const intercepted = descriptor.get!;

        descriptor.get = function(this:Disposable, ...args: Array<any>) {
            if (this.isDisposed)
                throw new Error(`Cannot call '${ propertyKey }' property of a disposed Disposable instance.`);

            return Reflect.apply(intercepted, this, args);
        }

        return descriptor;
    }
}

/**
 * Provides mechanisms for publishing events and for managing object lifetime.
 */
export abstract class Disposable implements IDisposable {
    //#region State

    //stores
    private _isDisposed: boolean = false;
    private _events?: EventList;

    //#endregion

    //#region Disposition

    /**
     * Performs application-defined tasks associated with releasing references and resetting internal state.
     */
    public dispose(): void {
        if (!this.isDisposed) {
            try {
                this.disposing();
            }
            finally {
                try {
                    //transitive disposal
                    for (const key of Object.keys(this)) {
                        const field = (<any>this)[key];

                        //TODO: dispose maps and sets

                        if (is(field).anArray)
                            for(const item of field)
                                if (is(item.dispose).aFunction)
                                    item.dispose();
                        else if (is(field).anObject)
                            for(const key of Object.keys(field))
                                if (is(field[key].dispose).aFunction)
                                    field[key].dispose();

                        if (is(field.dispose).aFunction)
                            field.dispose();
                    }
                }
                finally {
                    //teardown
                    for (const key of Object.keys(this))
                        if (key !== '_isDisposed') {
                            const field= (<any>this)[key];

                            //TODO: clear maps and sets

                            if (is(field).anArray) field.length = 0;

                            Reflect.deleteProperty(this, key);
                        }

                    //state
                    this._isDisposed = true;
                }
            }
        }
    }

    //#endregion

    //#region Events

    public get ondisposing(): Event<Disposable, EventArgs<Disposable>> {
        return this.events.get('disposing');
    }

    //#endregion

    //#region Properties

    @cannotBeDisposed()
    protected get events(): EventList {
        return this._events || (this._events = new EventList());
    }

    public get isDisposed(): boolean {
        return this._isDisposed;
    }

    //#endregion

    //#region Methods

    protected disposing() {
        this.events.publish('disposing', EventArgs.empty(this));
    }

    //#endregion
}
