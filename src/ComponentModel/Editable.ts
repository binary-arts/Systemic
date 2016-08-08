//TODO: persistance and retrieval
//TODO: knows how to serialize and deserialize himself

import { Component } from './../ComponentModel/Component';
import { Event, EventArgs } from './../ComponentModel/Event';

import { cannotBeDisposed } from './../ComponentModel/Disposable';
import { computedFrom } from 'aurelia-framework';

export abstract class Editable extends Component {
    //#region State

    //fields
    private readonly changeBuffer: Map<string, any> = new Map();
    private readonly editBuffer: Map<string, any> = new Map();

    //stores
    private _editFrames: number = 0;

    //#endregion

    //#region Events

    public get onchanged(): Event<Editable, EventArgs<Editable>> {
        return this.events.get('changed');
    }

    public get onedited(): Event<Editable, EventArgs<Editable>> {
        return this.events.get('edited');
    }

    public get onediting(): Event<Editable, EventArgs<Editable>> {
        return this.events.get('editing');
    }

    //#enregion

    //#region Properties

    private get editFrames(): number {
        return this._editFrames;
    }
    private set editFrames(value: number) {
        const currentEditFrames = this._editFrames;

        if (currentEditFrames !== (value = Math.max(0, value))) {
            this._editFrames = value;

            if (currentEditFrames === 0 && value === 1)
                this.editing();
            else if (value === 0) {
                const currentHasChanged = this.hasChanged;

                this.editBuffer
                    .forEach((value, fieldName) => {
                        const currentValue = Reflect.get(this, fieldName, this);

                        if (currentValue !== value && Reflect.set(this, fieldName, value, this)) {
                            if (!this.changeBuffer.has(fieldName))
                                this.changeBuffer.set(fieldName, currentValue);
                            else if (this.changeBuffer.get(fieldName) === value)
                                this.changeBuffer.delete(fieldName);
                        }
                    });

                this.editBuffer.clear();
                this.edited();

                if (this.hasChanged && currentHasChanged === false)
                    this.changed();
            }
        }
    }

    @computedFrom('changeBuffer')
    @cannotBeDisposed()
    public get hasChanged(): boolean {
        return !!this.changeBuffer.size;
    }

    @computedFrom('_editFrames')
    @cannotBeDisposed()
    public get isEditing(): boolean {
        return !!this.editFrames;
    }

    //#endregion

    //#region Methods

    //@cannotBeDisposed()
    public beginEdit(): void {
        this.editFrames++;
    }

    //@cannotBeDisposed()
    public cancelEdit(): void {
        this.editBuffer.clear();
        this.editFrames = 0;
    }

    protected changed(): void {
        this.events.publish('changed', EventArgs.empty(this));
    }

    //@cannotBeDisposed()
    protected edit(fieldName: string, value: any): void {
        this.beginEdit();
        this.editBuffer.set(fieldName, value);
        this.endEdit();
    }

    protected edited(): void {
        this.events.publish('edited', EventArgs.empty(this));
    }

    protected editing(): void {
        this.events.publish('editing', EventArgs.empty(this));
    }

    //@cannotBeDisposed()
    public endEdit(): boolean {
        this.editFrames--;
        return this.isEditing;
    }

    protected propertychanged(name: string, newValue: any, oldValue: any): void {
        // TODO: remove explicit changed, edited, and editing triggers in favor of capturing onpropertychanged events (must work, and must not be async)
        // switch (name) {
        //     case 'hasChanged':
        //         if (!!newValue) this.changed();
        //         break;
        //     case 'isEditing':
        //         !!newValue
        //             ? this.editing()
        //             : this.edited();
        //         break;
        //     default:
        //         super.propertyChanged(name, newValue, oldValue);
        //         break;
        // }

        super.propertyChanged(name, newValue, oldValue);
    }

    //@cannotBeDisposed()
    public revert(): void {
        //TODO: cancel edits, change the buffer back to fresh (isChanged is false)
    };

    //@cannotBeDisposed()
    public save(): boolean {
        //TODO: make a class decorator persistedBy (takes a type that implements the Persister interface)
        //TODO: if persistedBy is available, call it
        //TODO: endEdits, persist if available, change buffer back to fresh (isChanged is false)
        return false;
    }

    //#endregion
}
