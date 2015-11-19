//TBI support injectable converters over "as" members on types (see format for injectable formatters)

import is from './Is';

import Debug from '../Diagnostics/Debug';

/**
 * TODO
 */
class As {

    //#region Disposition

    constructor(ref) {
        this._.ref = ref;
    }

    //#endregion

    //#region Properties

    /**
     * A dictionary that contains the collective state of an As instance.
     *
     * @private
     *
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

    get aNumber() {
        return this.a(Number);
    }

    get aRegExp() {
        return this.a(RegExp);
    }

    get aString() {
        return this.a(String);
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

    get _refIs() {
        return this._.refIs || (this._.refIs = is(this._ref));
    }

    get undefined() {
        return this.a(undefined);
    }

    //#endregion

    //#region Methods

    a(type) {
        //TODO: _to(ref, type) => _as(ref, type) || default(ref);

        const typeIs = is(type);
        const typeIsUndefined = typeIs.undefined;
        const typeIsNull = typeIs.null;
        const typeIsNaN = typeIs.nan;

        Debug.assert(typeIsUndefined || typeIsNull || typeIsNaN || typeIs.aFunction);

        let result = null;

        if (typeIsUndefined || typeIsNull || typeIsNaN)
            result = type;
        else if (this._refIs.a(type))
            result = this._ref;
        else if (!this._refIs.undefined && !this._refIs.null) {
            let as = this._ref.hasOwnProperty('as') ? this._ref.as : null;

            if (is(as).aFunction)
                result = as.call(this._ref, type);
            else if (typeIs.aTypeOf(Array))
                result = Array.of(this._ref);
            else if (typeIs.aTypeOf(String)) {
                const toString = this._ref.hasOwnProperty('toString') ? this._ref.toString : null;

                if (is(toString).aFunction)
                    result = toString.call(this._ref);
                else
                    result = JSON.stringify(this._ref, null, 4);
            }
        }

        return result;
    }

    //#endregion

}

export default ref => new As(ref);