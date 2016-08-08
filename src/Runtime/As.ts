// //TBI support injectable converters over "as" members on types (see format for injectable formatters)

// import is from './Is';

// /**
//  * TODO
//  * 
//  * @private @sealed
//  */
// class As {

//     //#region Disposition

//     /**
//      * TODO
//      * 
//      * @param { * } ref TODO
//      */
//     constructor(ref) {
//         this._ref = ref;
//     }

//     //#endregion

//     //#region Properties

//     /**
//      * TODO
//      * 
//      * @public
//      * 
//      * @returns { !Boolean } TODO
//      */
//     get aBoolean() {
//         return this.a(Boolean);
//     }

//     /**
//      * TODO
//      * 
//      * @public
//      * 
//      * @returns { !Boolean } TODO
//      */
//     get aDate() {
//         return this.a(Date);
//     }

//     /**
//      * TODO
//      * 
//      * @public
//      * 
//      * @returns { !Boolean } TODO
//      */
//     get aFunction() {
//         return this.a(Function);
//     }

//     /**
//      * TODO
//      * 
//      * @public
//      * 
//      * @returns { !Boolean } TODO
//      */
//     get anArray() {
//         return this.a(Array);
//     }

//     /**
//      * TODO
//      * 
//      * @public
//      * 
//      * @returns { !Boolean } TODO
//      */
//     get anElement() {
//         return this.a(HTMLElement);
//     }

//     /**
//      * TODO
//      * 
//      * @public
//      * 
//      * @returns { !Boolean } TODO
//      */
//     get anError() {
//         return this.a(Error);
//     }

//     /**
//      * TODO
//      * 
//      * @public
//      * 
//      * @returns { !Boolean } TODO
//      */
//     get anObject() {
//         return this.a(Object);
//     }

//     /**
//      * TODO
//      * 
//      * @public
//      * 
//      * @returns { !Boolean } TODO
//      */
//     get aNumber() {
//         return this.a(Number);
//     }

//     /**
//      * TODO
//      * 
//      * @public
//      * 
//      * @returns { !Boolean } TODO
//      */
//     get aRegExp() {
//         return this.a(RegExp);
//     }

//     /**
//      * TODO
//      * 
//      * @public
//      * 
//      * @returns { !Boolean } TODO
//      */
//     get aString() {
//         return this.a(String);
//     }

//     /**
//      * TODO
//      * 
//      * @public
//      * 
//      * @returns { !Boolean } TODO
//      */
//     get nan() {
//         return this.a(NaN);
//     }

//     /**
//      * TODO
//      * 
//      * @public
//      * 
//      * @returns { !Boolean } TODO
//      */
//     get null() {
//         return this.a(null);
//     }

//     /**
//      * TODO
//      * 
//      * @private
//      * 
//      * @returns { * } TODO
//      */
//     get ref() {
//         return this._ref;
//     }

//     /**
//      * TODO
//      * 
//      * @private
//      * 
//      * @returns { !Object } TODO
//      */
//     get refIs() {
//         return this._refIs || (this._refIs = is(this.ref));
//     }

//     /**
//      * TODO
//      * 
//      * @public
//      * 
//      * @returns { !Boolean } TODO
//      */
//     get undefined() {
//         return this.a(undefined);
//     }

//     //#endregion

//     //#region Methods

//     /**
//      * TODO
//      * 
//      * @public
//      * 
//      * @param { ?T } [type] TODO
//      * 
//      * @returns { !Boolean } TODO
//      */
//     a(type) {
//         //TODO: _to(ref, type) => _as(ref, type) || default(ref);

//         const typeIs = is(type);
//         const typeIsUndefined = typeIs.undefined;
//         const typeIsNull = typeIs.null;
//         const typeIsNaN = typeIs.nan;

//         let result = null;

//         if (typeIsUndefined || typeIsNull || typeIsNaN) result = type;
//         else if (this.refIs.a(type)) result = this.ref;
//         else if (!this.refIs.undefined && !this.refIs.null) {
//             const as = this.ref.hasOwnProperty('as') ? this.ref.as : null;

//             if (is(as).aFunction) result = Reflect.apply(as, this.ref, [type]);
//             else if (typeIs.aTypeOf(Array)) result = Array.of(this.ref);
//             else if (typeIs.aTypeOf(String)) {
//                 const toString = this.ref.hasOwnProperty('toString') ? this.ref.toString : null;

//                 if (is(toString).aFunction) result = Reflect.apply(toString, this.ref);
//                 else result = JSON.stringify(this.ref);
//             }
//         }

//         return result;
//     }

//     //#endregion

// }

// export default ref => new As(ref);