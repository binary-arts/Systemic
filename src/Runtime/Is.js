/**
 * TODO
 */
class Is {

    constructor(ref) {
        this._ref = ref;
    }

    //#region Properties

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
        return this.anArray && !!this.ref.length;
    }

    get aNonEmptyString() {
        return this.aString && !!this.ref.trim();
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

    // get aWindow() {
    //     return this.a(Window);
    // }

    get defined() {
        return !this.undefined && !this.null && !this.nan;
    }

    get nan() {
        return this.a(NaN);
    }

    get null() {
        return this.a(null);
    }

    /**
     * @private
     */
    get ref() {
        return this._ref;
    }

    get undefined() {
        return this.a(undefined);
    }

    //#endregion

    //#region Methods

    a(T) {
        let result = false;
        const TRefName = /^\[object (.*)\]$/.exec(Object.prototype.toString.call(this.ref))[1];

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
                const windowedHTMLElement = (((this.ref || {}).ownerDocument || {}).defaultView || {}).HTMLElement;
                result = !!windowedHTMLElement && this.ref instanceof windowedHTMLElement;
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

            // case Window:
            //     result = TRefName === 'Window' || TRefName === 'global';
            //     break;

            case Object:
                result = TRefName === 'Object' || TRefName === 'Arguments';
                break;

            default:
                const TName = /^\[object (.*)\]$/.exec(Object.prototype.toString.call(T))[1];

                if (TName === 'Number' && isNaN(T))
                    result = TRefName === 'Number' && isNaN(this.ref);
                else
                    result = this.ref instanceof T;

                break;
        }

        return result;
    }

    anArrayOfLength(length) {
        return this.anArray && this.ref.length === length;
    }

    aTypeOf(T) {
        let result = false;

        if (typeof T === 'function' && !(result = (T === this.ref)) && !(result = T.isPrototypeOf(this.ref))) {
            let proto = this.ref;

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

(function(global) {
    /* jshint sub:true */
    global.HTMLDocument = global['HTMLDocument'] || global.Document;
    /* jshint sub:false */
})(typeof global === 'undefined' ? self : global);

export default ref => new Is(ref);
