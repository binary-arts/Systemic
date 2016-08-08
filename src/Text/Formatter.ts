// import is from '../Runtime/Is';
// import as from '../Runtime/As';
// import res from '../Runtime/Res';

// import Debug from '../Diagnostics/Debug';
// import Exception from '../Runtime/Exception';

// /**
//  * TODO
//  *
//  * @public @abstract
//  */
// export default class Formatter {
//     //#region Type

//     //#region Properties

//     /**
//      * Gets a list of memory-cached Formatter objects indexed by locale and type name.
//      *
//      * @private @static
//      *
//      * @returns { !Map<!String, !Formatter> }
//      *      A Map containing DateFormatter objects by type name and locale. The Map returned by this
//      *      property is empty to start and is intended to be populated by private APIs as type- and
//      *      locale- unique Formatter objects are initialized. This property is a memory-optimized
//      *      store where only one Formatter object per type and locale is ever constructed.
//      */
//     static get index() {
//         return Formatter._index || (Formatter._index = new Map());
//     }

//     /**
//      * Asynchronously gets a locale-independent (invariant) Formatter object.
//      *
//      * @public @static @async
//      *
//      * @returns { !Promise<!DateFormatter> }
//      *      A Formatter object Promise that is locale-independent (invariant), not associated with
//      *      a language nor a region. The resultant Formatter object will not change its format conventions
//      *      over time which makes it a suitable candidate for canonized Date serialization. The same
//      *      Promise is returned for each Formatter type.
//      */
//     static get invariant() {
//         return this.fromLocale(''); //eslint-disable-line no-invalid-this
//     }

//     /**
//      * Gets locale-independent (invariant) format conventions for the Formatter class.
//      *
//      * @protected @static @abstract
//      */
//     static get invariantCulture() {
//         throw Exception.abstractMemberInvocation;
//     }

//     /**
//      * TODO
//      *
//      * @public @static @virtual
//      *
//      * @returns { !Array<!T> } TODO
//      */
//     static get priorityTypes() {
//         return Formatter._formatterPriorityTypes || (Formatter._formatterPriorityTypes = []);
//     }

//     //#endregion

//     //#region Methods

//     /**
//      * Asynchronously gets a Formatter object associated with the specified locale.
//      *
//      * @public @static @async
//      *
//      * @param { !String } locale
//      *      The locale to be associated with the returned Formatter object. The locale is used to locate
//      *      and apply language- and region- specific conventions during format operations. Locales are
//      *      region-specific (e.g. 'en-US'), neutral (e.g. 'en'), or invariant (e.g. '').
//      * @returns { !Promise<!DateFormatter> }
//      *      A Formatter object Promise. The resultant Formatter object is bound to the specified locale
//      *      and applies its conventions during format operations. The same Promise is returned for each
//      *      combination of Formatter type and locale.
//      */
//     static async fromLocale(locale) {
//         const TFormatter = this; //eslint-disable-line no-invalid-this
//         const key = `${TFormatter.name}:${locale}`;

//         //!!! not thread-safe
//         if (!Formatter.index.has(key)) Formatter.index.set(key, Reflect.construct(TFormatter, [locale]));

//         const result = Formatter.index.get(key);
//         await result.initialized;

//         return result;
//     }

//     /**
//      * TODO
//      *
//      * @protected @static @virtual
//      *
//      * @param { !Object } culture TODO
//      */
//     static validate(culture) {
//         Debug.assert(is(culture).anObject);
//     }

//     /**
//      * TODO
//      *
//      * @public @static
//      *
//      * @param { * } ref TODO
//      * @param { !Number } minLength TODO
//      * @returns { !String } TODO
//      */
//     static zeroPad(ref, minLength) {
//         return `${new Array(Math.max(0, minLength)).fill('0').join('')}${ref = as(ref).aString || ''}`.substring(Math.min(ref.length, minLength));
//     }

//     //#endregion

//     //#endergion

//     //#region Disposition

//     /**
//      * TODO
//      *
//      * @private
//      *
//      * @param { !String } locale TODO
//      */
//     constructor(locale) {
//         const TFormatter = this.constructor;

//         const resource = res(locale);

//         this._language = resource.language;
//         this._locale = resource.locale;
//         this._region = resource.region;
//         this._culture = TFormatter === Formatter ? {} : TFormatter.invariantCulture;

//         this._initialized = (async () => {
//             if (!resource.isInvariant) {
//                 const baseName = Formatter.name;
//                 let name = TFormatter.name;

//                 if (name.endsWith(baseName)) name = name.substr(0, name.length - baseName.length);
//                 if (is(name).aNonEmptyString) this._culture = await resource.get(name).then(culture => res.merge(culture, this._culture));
//             }

//             TFormatter.validate(this._culture);
//         })();
//     }

//     //#endregion

//     //#region Properties

//     /**
//      * TODO
//      *
//      * @protected
//      *
//      * @returns { !Object } TODO
//      */
//     get culture() {
//         return this._culture;
//     }

//     /**
//      * Indicates whether this Formatter object is initialized.
//      *
//      * @public
//      *
//      * @returns { !Promise.<void> }
//      *      A Promise that resolves when this Formatter object is fully initialized. Logic that references
//      *      this Formatter object can use this property to block until the Formatter objec is ready,
//      *      but this is not required. Formatters which are not fully initialized behave as if they
//      *      are bound to the invariant culture.
//      */
//     get initialized() {
//         return this._initialized;
//     }

//     /**
//      * Gets the language associated with this Formatter object.
//      *
//      * @public
//      *
//      * @returns { ?String }
//      *      The language (e.g. 'en') associated with this Formatter object, or null if this Formatter
//      *      object's locale does not specify a language.
//      */
//     get language() {
//         return this._language;
//     }

//     /**
//      * Gets the locale associated with this Formatter object.
//      *
//      * @public
//      *
//      * @returns { !String }
//      *      The locale associated with this Formatter object. The Formatter object applies locale-specific
//      *      conventions during format operations. Locales are region-specific (e.g. 'en-US'), neutral
//      *      (e.g. 'en'), or invariant (e.g. '').
//      */
//     get locale() {
//         return this._locale;
//     }

//     /**
//      * Gets the region associated with this Formatter object.
//      *
//      * @public
//      *
//      * @returns { ?String }
//      *      The region (e.g. 'US') associated with this Formatter object, or null if this Formatter
//      *      object's locale does not specify a region.
//      */
//     get region() {
//         return this._region;
//     }

//     //#endregion

//     //#region Methods

//     /**
//      * TODO
//      *
//      * @public @abstract
//      *
//      * @param { * } ref TODO
//      * @param { !String } spec TODO
//      */
//     format(ref, spec) { //eslint-disable-line no-unused-vars
//         throw Exception.abstractMemberInvocation;
//     }

//     //#endregion
// }
