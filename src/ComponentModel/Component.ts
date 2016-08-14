//TODO: static factory for getting, takes a parent component (or null) ... gets from a rooted cache if possible

import { BindingEngine, Container } from 'aurelia-framework';
import { Event, EventArgs, PropertyChangedEventArgs } from './Event';
import { Initializable } from './Initializable';
import { Subscription } from 'aurelia-event-aggregator';

export abstract class Component extends Initializable {
    //#region State

    //fields
    private readonly propertyObservers: Array<Subscription> = [];
    private readonly backReferences: Set<Component> = new Set();

    //#endregion

    //#region Disposition

    protected initializing(): void {
        if ('__metadata__' in this) {
            const engine: BindingEngine = Container.instance.get(BindingEngine);

            for (const propertyKey of Reflect.ownKeys((<any>this).__metadata__))
                if (typeof propertyKey === 'string')
                    this.propertyObservers
                        .push(engine
                            .propertyObserver(this, propertyKey)
                            .subscribe((newValue, oldValue) => this.propertyChanged(propertyKey, newValue, oldValue)));
        }

        super.initializing();
    }

    //#endregion

    //#region Events

    public get onpropertychanged(): Event<Component, PropertyChangedEventArgs<Component>> {
        return this.getEvent('propertychanged');
    }

    //#endregion

    //#region Methods

    protected addRef(ref: Component): Component {
        if (this !== ref && !this.isDisposed && !ref.isDisposed && !ref.backReferences.has(this))
            ref.backReferences.add(this);

        return ref;
    }

    protected beforeDisposing(): boolean {
        let cancelled = super.beforeDisposing();

        if (!cancelled) {
            //TODO: get the ref making the transitive disposal
            //TODO: if the ref is a transitive back-ref and is not the identity, and is in the backreferences list, remove it
            //TODO: if the current references list not empty, cancel
        }

        return cancelled;
    }

    protected propertyChanged(name: string, newValue: any, oldValue: any): void {
        this.publish('propertychanged', new PropertyChangedEventArgs(this, name, newValue, oldValue));
    }

    protected publish(name: string, e: EventArgs<Component>): void {
        if (!this.isDisposed) {
            this.backReferences.forEach(backReference => {
                if (!backReference.isDisposed)
                    backReference.refEvent(this, name, e);
            });

            super.publish(name, e);
        }
    }

    protected refEvent(ref: Component, name: string, e: EventArgs<Component>): void { }

    protected removeRef(ref: Component): Component {
        if (this !== ref && !ref.isDisposed && ref.backReferences.has(this))
            ref.backReferences.delete(this);

        return ref;
    }

    //#endregion
}
