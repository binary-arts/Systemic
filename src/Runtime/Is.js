/* global global */

/**
 * TODO
 *
 * @private @sealed
 */
class Is {

    /**
     * TODO
     *
     * @param { * } ref TODO
     */
    constructor(ref) {
        this._ref = ref;
    }

    //#region Properties

    /**
     * TODO
     *
     * @public
     *
     * @returns { !Boolean } TODO
     */
    get aBoolean() {
        return this.a(Boolean);
    }

    /**
     * TODO
     *
     * @public
     *
     * @returns { !Boolean } TODO
     */
    get aDate() {
        return this.a(Date);
    }

    /**
     * TODO
     *
     * @public
     *
     * @returns { !Boolean } TODO
     */
    get aDocument() {
        return this.a(HTMLDocument);
    }

    /**
     * TODO
     *
     * @public
     *
     * @returns { !Boolean } TODO
     */
    get aFunction() {
        return this.a(Function);
    }

    /**
     * TODO
     *
     * @public
     *
     * @returns { !Boolean } TODO
     */
    get anArray() {
        return this.a(Array);
    }

    /**
     * TODO
     *
     * @public
     *
     * @returns { !Boolean } TODO
     */
    get anElement() {
        return this.a(HTMLElement);
    }

    /**
     * TODO
     *
     * @public
     *
     * @returns { !Boolean } TODO
     */
    get anError() {
        return this.a(Error);
    }

    /**
     * TODO
     *
     * @public
     *
     * @returns { !Boolean } TODO
     */
    get anObject() {
        return this.a(Object);
    }

    /**
     * TODO
     *
     * @public
     *
     * @returns { !Boolean } TODO
     */
    get aNodeList() {
        return this.a(NodeList);
    }

    /**
     * TODO
     *
     * @public
     *
     * @returns { !Boolean } TODO
     */
    get aNonEmptyArray() {
        return this.anArray && !!this.ref.length;
    }

    /**
     * TODO
     *
     * @public
     *
     * @returns { !Boolean } TODO
     */
    get aNonEmptyString() {
        return this.aString && !!this.ref.trim();
    }

    /**
     * TODO
     *
     * @public
     *
     * @returns { !Boolean } TODO
     */
    get aNumber() {
        return this.a(Number);
    }

    /**
     * TODO
     * 
     * @public
     * 
     * @returns { !Boolean } TODO
     */
    get aRegExp() {
        return this.a(RegExp);
    }

    /**
     * TODO
     * 
     * @public
     * 
     * @returns { !Boolean } TODO
     */
    get aString() {
        return this.a(String);
    }

    /**
     * TODO
     * 
     * @public
     * 
     * @returns { !Boolean } TODO
     */
    // get aWindow() {
    //     return this.a(Window);
    // }

    /**
     * TODO
     * 
     * @public
     * 
     * @returns { !Boolean } TODO
     */
    get defined() {
        return !this.undefined && !this.null && !this.nan;
    }

    /**
     * TODO
     * 
     * @public
     * 
     * @returns { !Boolean } TODO
     */
    get nan() {
        return this.a(NaN);
    }

    /**
     * TODO
     * 
     * @public
     * 
     * @returns { !Boolean } TODO
     */
    get null() {
        return this.a(null);
    }

    /**
     * TODO
     * 
     * @private
     * 
     * @returns { * } TODO
     */
    get ref() {
        return this._ref;
    }

    /**
     * TODO
     * 
     * @public
     * 
     * @returns { !Boolean } TODO
     */
    get undefined() {
        return this.a(undefined);
    }

    //#endregion

    //#region Methods

    /**
     * TODO
     * 
     * @public
     * 
     * @param { ?T } [T] TODO
     * 
     * @returns { !Boolean } TODO
     */
    a(T) {
        let result = false;
        const TRefName = /^\[object (.*)\]$/.exec(Reflect.apply(Object.prototype.toString, this.ref))[1];

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

            // case Window:
            //     result = TRefName === 'Window' || TRefName === 'global';
            //     break;

            case Object:
                result = TRefName === 'Object' || TRefName === 'Arguments';
                break;

            default: {
                    const TName = /^\[object (.*)\]$/.exec(Reflect.apply(Object.prototype.toString, T))[1];
    
                    if (TName === 'Number' && isNaN(T)) result = TRefName === 'Number' && isNaN(this.ref);
                    else result = this.ref instanceof T;
                }
                break;
        }

        return result;
    }

    /**
     * TODO
     * 
     * @public
     * 
     * @param { !Number } length TODO
     * 
     * @returns { !Boolean } TODO
     */
    anArrayOfLength(length) {
        return this.anArray && this.ref.length === length;
    }

    /**
     * TODO
     * 
     * @public
     * 
     * @param { ?Function } [T] TODO
     * 
     * @returns { !Boolean } TODO
     */
    aTypeOf(T) {
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

(function(global) { global.HTMLDocument = global.HTMLDocument || global.Document; })(typeof global === 'undefined' ? self : global);

export default ref => new Is(ref);
