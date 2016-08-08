class Is {

    //#region State

    //runtime constants
    private readonly ref: any;

    //#endregion

    //#region Disposition

    constructor(ref: any) {
        this.ref = ref;
    }

    //#endregion

    //#region Properties

    public get aBoolean(): boolean  {
        return this.a(Boolean);
    }

    public get aDate(): boolean {
        return this.a(Date);
    }

    public get aDocument(): boolean {
        return this.a(HTMLDocument);
    }

    public get aFunction(): boolean {
        return this.a(Function);
    }

    public get aMap(): boolean {
        return this.a(Map);
    }

    public get anArray(): boolean {
        return this.a(Array);
    }

    public get anElement(): boolean {
        return this.a(HTMLElement);
    }

    public get anError(): boolean {
        return this.a(Error);
    }

    public get anObject(): boolean {
        return this.a(Object);
    }

    public aNodeList(): boolean {
        return this.a(NodeList);
    }

    public get aNonEmptyArray(): boolean {
        return this.anArray && !!this.ref.length;
    }

    public get aNonEmptyString(): boolean {
        return this.aString && !!this.ref.trim();
    }

    public get aNumber(): boolean {
        return this.a(Number);
    }

    public get aRegExp(): boolean {
        return this.a(RegExp);
    }

    public get aSet(): boolean {
        return this.a(Set);
    }

    public aString(): this is string {
        return this.a(String);
    }

    public get aWindow(): boolean {
        return this.a(Window);
    }

    public get defined(): boolean {
        return !this.undefined && !this.null && !this.nan;
    }

    public get nan(): boolean {
        return this.a(NaN);
    }

    public get null(): boolean {
        return this.a(null);
    }

    public get undefined(): boolean {
        return this.a(undefined);
    }

    //#endregion

    //#region Methods

    public a(T: any): boolean {
        let result = false;
        const TRefName = /^\[object (.*)\]$/.exec(Reflect.apply(Object.prototype.toString, this.ref, []))![1];

        switch (T) {
            case undefined:
                result = TRefName === 'Undefined';
                break;

            case null:
                result = TRefName === 'Null';
                break;

            case Array:
                result = TRefName === 'Array';
                break;

            case Boolean:
                result = TRefName === 'Boolean';
                break;

            case Date:
                result = TRefName === 'Date';
                break;

            case Error:
                result = TRefName === 'Error';
                break;

            case HTMLDocument:
                result = TRefName === 'HTMLDocument' || TRefName === 'Document';
                break;

            case HTMLElement: {
                const windowedHTMLElement = (((this.ref || {}).ownerDocument || {}).defaultView || {}).HTMLElement;
                result = !!windowedHTMLElement && this.ref instanceof windowedHTMLElement;
            }
                break;

            case Function:
                result = TRefName === 'Function';
                break;

            case NodeList:
                result = TRefName === 'NodeList';
                break;

            case Number:
                result = TRefName === 'Number' && !isNaN(this.ref);
                break;

            case RegExp:
                result = TRefName === 'RegExp';
                break;

            case String:
                result = TRefName === 'String';
                break;

            case Window:
                result = TRefName === 'Window' || TRefName === 'global';
                break;

            case Object:
                result = TRefName === 'Object' || TRefName === 'Arguments';
                break;

            default: {
                const TName = /^\[object (.*)\]$/.exec(Reflect.apply(Object.prototype.toString, this.ref, []))![1];

                if (TName === 'Number' && isNaN(T)) result = TRefName === 'Number' && isNaN(this.ref);
                else result = this.ref instanceof T;
            }
                break;
        }

        return result;
    }

    public anArrayOfLength(length: number): boolean {
        return this.anArray && this.ref.length === length;
    }

    public aTypeOf(T: Function | null): boolean {
        let result = false;

        if (typeof T === 'function' && !(result = T === this.ref) && !(result = T.isPrototypeOf(this.ref))) {
            let proto = this.ref;

            while (typeof proto === 'function') {
                if ((result = proto === T) || proto === Object) break;

                if (typeof proto.prototype === 'object' && Reflect.getPrototypeOf(proto).constructor === Function) proto = (Reflect.getPrototypeOf(proto.prototype) || {}).constructor;
                else proto = Reflect.getPrototypeOf(proto);
            }
        }

        return result;
    }

    //#endregion

}

export function is(ref: any) { return new Is(ref); }
