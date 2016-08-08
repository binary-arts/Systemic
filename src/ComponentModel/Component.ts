//TODO: parent/child relationships ... dispose knocks out lineage until no parents
//TODO: static factory for getting, takes a parent component (or null) ... gets from a rooted cache if possible

import { BindingEngine, Container } from 'aurelia-framework';
import { Event, PropertyChangedEventArgs } from './Event';
import { Initializable } from './Initializable';
import { Subscription } from 'aurelia-event-aggregator';

export abstract class Component extends Initializable {
    //#region State

    //fields
    private readonly propertyObservers: Array<Subscription> = [];

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
        return this.events.get('propertychanged');
    }

    //#endregion

    //#region Methods

    protected propertyChanged(name: string, newValue: any, oldValue: any): void {
        this.events.publish('propertychanged', new PropertyChangedEventArgs(this, name, newValue, oldValue));
    }

    //#endregion
}
