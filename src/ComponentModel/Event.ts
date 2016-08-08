import { Container, Disposable as IDisposable } from 'aurelia-framework';
import { EventAggregator, Subscription } from 'aurelia-event-aggregator';

class Subscriber<T, U extends EventArgs<T>> implements IDisposable {
    //#region State

    //fields
    private readonly subscribers: Array<Subscriber<T, U>>;
    private readonly subscription: Subscription;

    //stores
    private _isDisposed: boolean = false;

    //#endregion

    //#region Disposition

    public constructor(event: Publisher<T, U>, handler: Function) {
        this.subscribers = Reflect.get(event, 'subscribers');
        this.subscription = Reflect.get(event, 'broker').subscribe(Reflect.get(event, 'name'), handler);

        this.subscribers.push(this);
    }

    public dispose(): void {
        if (!this.isDisposed) {
            try {
                //transitive disposal
                this.subscription.dispose();
            }
            finally {
                //teardown
                const index = this.subscribers.indexOf(this);

                if (index != -1)
                    this.subscribers.splice(index, 1);

                Reflect.deleteProperty(this, 'subscribers');
                Reflect.deleteProperty(this, 'subscription');

                //state
                this._isDisposed = true;
            }
        }
    }

    //#endregion

    //#region Properties

    public get isDisposed(): boolean {
        return this._isDisposed;
    }

    //#endregion
}

class Publisher<T, U extends EventArgs<T>> implements IDisposable, Event<T, U> {
    //#region Type

    //#region State

    //fields
    private static currentId: number = 0;

    //#endregion

    //#region Methods

    private static nextName(): string {
        return `SystemicEvent${ ++this.currentId }`;
    }

    //#endregion

    //#endregion

    //#region State

    //fields
    private readonly broker: EventAggregator = Container.instance.get(EventAggregator);
    private readonly name: string = Publisher.nextName();
    private readonly subscribers: Array<Subscriber<T, U>> = [];

    //stores
    private _isDisposed: boolean = false;

    //#endregion

    //#region Disposition

    public dispose(): void {
        if (!this.isDisposed) {
            try {
                //transitive disposal
                for (const subscriber of this.subscribers)
                    subscriber.dispose();
            }
            finally {
                //teardown
                this.subscribers.length = 0;

                Reflect.deleteProperty(this, 'broker');
                Reflect.deleteProperty(this, 'subscribers');

                //state
                this._isDisposed = true;
            }
        }
    }

    //#endregion

    //#region Properties

    public get isDisposed(): boolean {
        return this._isDisposed;
    }

    //#endregion

    //#region Methods

    public subscribe(handler: (e: U) => void): Subscriber<T, U> | null {
        return this.isDisposed
            ? null
            : new Subscriber<T, U>(this, handler);
    }

    public publish(e: EventArgs<T>): void {
        if (!this.isDisposed)
            this.broker.publish(this.name, e);
    }

    //#endregion
}

export class EventArgs<T> {
    //#region Type

    //#region Properties

    public static empty<T>(source: T): EventArgs<T> {
        return new EventArgs(source);
    }

    //#endregion

    //#endregion

    //#region State

    //stores
    private readonly _source: T;

    //#endregion

    //#region Disposition

    public constructor(source: T) {
        this._source = source;
    }

    //#endregion

    //#region Properties

    public get source(): T {
        return this._source;
    }

    //#endregion
}

export class PropertyChangedEventArgs<T> extends EventArgs<T> {
    //#region State

    //stores
    private readonly _name: string;
    private readonly _newValue: any;
    private readonly _oldValue: any;

    //#endregion

    //#region Disposition

    public constructor(source: T, name: string, newValue: any, oldValue: any) {
        super(source);

        this._name = name;
        this._newValue = newValue;
        this._oldValue = oldValue;
    }

    //#endregion

    //#region Properties

    public get name(): string {
        return this._name;
    }

    public get newValue(): any {
        return this._newValue;
    }

    public get oldValue(): any {
        return this._oldValue;
    }

    //#endregion

}

export interface Event<T, U extends EventArgs<T>> {
    //#region Methods

    subscribe(handler: (e: U) => void): Subscriber<T, U> | null;

    //#endregion
}

export class EventList implements IDisposable {
    //#region State

    //stores
    private _isDisposed: boolean = false;
    private _publishers?: Map<string, Publisher<any, EventArgs<any>>>;

    //#endregion

    //#region Disposition

    public dispose(): void {
        if (!this.isDisposed) {
            try {
                //transitive disposal
                if (this._publishers) {
                    this._publishers.forEach(publisher => {
                        try { publisher.dispose(); }
                        catch(ex) { }
                    });
                }
            }
            finally {
                //teardown
                if (this._publishers) {
                    this._publishers.clear();
                    Reflect.deleteProperty(this, '_publishers');
                }

                //state
                this._isDisposed = true;
            }
        }
    }

    //#endregion

    //#region Properties

    public get isDisposed(): boolean {
        return this._isDisposed;
    }

    protected get publishers(): Map<string, Publisher<any, EventArgs<any>>> {
        if (this.isDisposed)
            throw new Error(`Cannot call 'publishers' property of a disposed EventList instance.`);

        return this._publishers || (this._publishers = new Map());
    }

    //#endregion

    //#region Methods

    public get<T, U extends EventArgs<T>>(name: string): Event<T, U> {
        if (!this.publishers.has(name))
            this.publishers.set(name, new Publisher<T, U>());

        return this.publishers.get(name) as Event<T, U>;
    }

    public publish<T, U extends EventArgs<T>>(name: string, e: U): void {
        if (!this.isDisposed && this.publishers.has(name))
            this.publishers.get(name)!.publish(e);
    }

    //#endregion
}
