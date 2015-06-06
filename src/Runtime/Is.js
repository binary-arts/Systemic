class Is {

    constructor(ref) {
        //init
        this._.ref = ref;
    }

    //#region Properties

    /**
     * A dictionary that contains the collective state of an Is instance.
     *
     * @private
     * @returns { Object }
     */
    get _() {
        return this.__ || (this.__ = Object.create(null));
    }

    get aBoolean() {
        return this.a(Boolean);
    }

    get aDate() {
        return this.a(Date);
    }

    get aDocument() {
        return this.a(HTMLDocument);
    }

    get aFunction() {
        return this.a(Function);
    }

    get anArray() {
        return this.a(Array);
    }

    get anElement() {
        return this.a(HTMLElement);
    }

    get anError() {
        return this.a(Error);
    }

    get anObject() {
        return this.a(Object);
    }

    get aNodeList() {
        return this.a(NodeList);
    }

    get aNonEmptyArray() {
        return this.anArray && !!this._ref.length;
    }

    get aNonEmptyString() {
        return this.aString && !!this._ref.trim();
    }

    get aNumber() {
        return this.a(Number);
    }

    get aRegExp() {
        return this.a(RegExp);
    }

    get aString() {
        return this.a(String);
    }

    get aWindow() {
        return this.a(Window);
    }

    get defined() {
        return !this.undefined && !this.null && !this.nan;
    }

    get nan() {
        return this.a(NaN);
    }

    get null() {
        return this.a(null);
    }

    get _ref() {
        return this._.ref;
    }

    get undefined() {
        return this.a(undefined);
    }

    //#endregion

    //#region Methods

    a(T) {
        let result = false;
        const TRefName = /^\[object (.*)\]$/.exec(Object.prototype.toString.call(this._ref))[1];

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

            case HTMLElement:
                const windowedHTMLElement = (((this._ref || {}).ownerDocument || {}).defaultView || {}).HTMLElement;
                result = !!windowedHTMLElement && this._ref instanceof windowedHTMLElement;
                break;

            case Function:
                result = TRefName === 'Function';
                break;

            case NodeList:
                result = TRefName === 'NodeList';
                break;

            case Number:
                result = TRefName === 'Number' && !isNaN(this._ref);
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

            default:
                const TName = /^\[object (.*)\]$/.exec(Object.prototype.toString.call(T))[1];

                if (TName === 'Number' && isNaN(T))
                    result = TRefName === 'Number' && isNaN(this._ref);
                else
                    result = this._ref instanceof T;

                break;
        }

        return result;
    }

    aTypeOf(T) {
        let result = false;

        if (typeof T === 'function' && !(result = (T === this._ref)) && !(result = T.isPrototypeOf(this._ref))) {
            let proto = this._ref;

            while (typeof proto === 'function') {
                if ((result = proto === T) || proto === Object)
                    break;

                if (typeof proto.prototype === 'object' && Object.getPrototypeOf(proto).constructor === Function)
                    proto = (Object.getPrototypeOf(proto.prototype) || {}).constructor;
                else
                    proto = Object.getPrototypeOf(proto);
            }
        }

        return result;
    }

    //#endregion

}

//#region Initializer

(function(global) {
    /* jshint sub:true */
    global.HTMLDocument = global['HTMLDocument'] || global.Document;
    /* jshint sub:false */
})(typeof global === 'undefined' ? self : global);

//#endregion

export default ref => new Is(ref);
