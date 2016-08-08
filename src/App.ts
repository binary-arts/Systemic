import { Aurelia } from 'aurelia-framework';
import { Component } from './ComponentModel/Component';
import { Disposable } from './ComponentModel/Disposable';
import { Editable } from './ComponentModel/Editable';
import { Event, EventArgs, PropertyChangedEventArgs } from './ComponentModel/Event';

import { cannotBeDisposed } from './ComponentModel/Disposable';
import { computedFrom } from 'aurelia-framework';

class Car extends Editable {

    //#region State

    //stores
    private _make: string | null = null;
    private _owner: string | null = null;

    //#endregion

    //#region Events

    public get onsteering(): Event<Car, EventArgs<Car>> {
        return this.events.get('steering');
    }

    public get onbraking(): Event<Car, EventArgs<Car>> {
        return this.events.get('braking');
    }

    //#endregion

    //#region Properties

    @computedFrom('_make')
    @cannotBeDisposed()
    public get make(): string | null {
        return this._make;
    }
    public set make(value: string | null) {
        this.edit('_make', value);
    }

    @computedFrom('_owner')
    @cannotBeDisposed()
    public get owner(): string | null {
        return this._owner;
    }
    public set owner(value: string | null) {
        this.edit('_owner', value);
    }

    //#endregion

    //#region Methods

    public steer() {
        this.events.publish('steering', EventArgs.empty(this));
    }

    public brake() {
        this.events.publish('braking', EventArgs.empty(this));
    }

    //#endregion
}

export class App extends Disposable {

    //#region State

    //runtime constants
    public readonly messages: string[] = [];

    //fields
    private /*readonly*/ firstCar: Car;
    private /*readonly*/ secondCar: Car;

    //#endregion

    //#region Disposition

    public constructor() {
        super();

        this.firstCar = new Car();
        this.secondCar = new Car();

        window.setTimeout(
            () => {
                this.firstCar.onchanged.subscribe(this.car_changed.bind(this));
                this.firstCar.onedited.subscribe(this.car_edited.bind(this));
                this.firstCar.onediting.subscribe(this.car_editing.bind(this));
                this.firstCar.onpropertychanged.subscribe(this.car_propertychanged.bind(this));

                this.secondCar.onchanged.subscribe(this.car_changed.bind(this));
                this.secondCar.onedited.subscribe(this.car_edited.bind(this));
                this.secondCar.onediting.subscribe(this.car_editing.bind(this));
                this.secondCar.onpropertychanged.subscribe(this.car_propertychanged.bind(this));

                this.firstCar.make = 'Ford';
                this.firstCar.owner = 'Steve';

                this.secondCar.beginEdit();
                this.secondCar.make = 'Lotus';
                this.secondCar.owner = 'Jay';
                this.secondCar.endEdit();

                this.firstCar.brake();
                this.firstCar.onsteering.subscribe(this.car_steering.bind(this));
                this.firstCar.brake();
                this.firstCar.steer();
                this.firstCar.onbraking.subscribe(this.car_braking.bind(this));
                this.firstCar.brake();

                this.secondCar.steer();
                this.secondCar.onbraking.subscribe(this.car_braking.bind(this));
                this.secondCar.steer();
                this.secondCar.brake();

                const steering = this.secondCar.onsteering.subscribe(this.car_steering.bind(this));

                this.secondCar.steer();
                this.secondCar.owner = 'Kris';
                this.secondCar.onsteering.subscribe(this.car_steering.bind(this));
                this.secondCar.steer();

                steering!.dispose();

                this.secondCar.steer();
            },
            0
        );
    }

    public detached() {
        this.dispose();
    }

    //#endregion

    //#region Handlers

    private car_braking(e: EventArgs<Car>): void {
        this.messages.push(`${ e.source.owner || 'Nobody' }'s ${ e.source.make || 'car' } is braking.`);
    }

    private car_changed(e: EventArgs<Editable>): void {
        this.messages.push(`${ (<Car>e.source).owner || 'Nobody' }'s ${ (<Car>e.source).make || 'car' } has changed.`);
    }

    private car_edited(e: EventArgs<Editable>): void {
        this.messages.push(`${ (<Car>e.source).owner || 'Nobody' }'s ${ (<Car>e.source).make || 'car' } has been edited.`);
    }

    private car_editing(e: EventArgs<Editable>): void {
        this.messages.push(`${ (<Car>e.source).owner || 'Nobody' }'s ${ (<Car>e.source).make || 'car' } is editing.`);
    }

    private car_propertychanged(e: PropertyChangedEventArgs<Component>): void {
        this.messages.push(`${ (<Car>e.source).owner || 'Nobody' }'s ${ (<Car>e.source).make || 'car' }'s '${ e.name }' property changed from ${ e.oldValue } to ${ e.newValue }.`);
    }

    private car_steering(e: EventArgs<Car>): void {
        this.messages.push(`${ e.source.owner || 'Nobody' }'s ${ e.source.make || 'car' } is steering.`);
    }

    //#endregion
}

//#region Main

export function configure(aurelia: Aurelia) {
    aurelia.use
        .standardConfiguration()
        .developmentLogging();

    aurelia.start()
        .then(() => aurelia.setRoot('App'));
}

//#endregion
