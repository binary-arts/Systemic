import is from './Is';

/* jshint ignore:start */
import FileService from '../Net/FileService';
/* jshint ignore:end */

/**
 * Projects locale-specific, externally declared, dynamically loaded language translations as well as
 * conventions for compare, parse and format operations.
 */
class Res {

    //#region Type

    //#region Properties

    /**
     * Gets the collective state of the Res class.
     *
     * @private
     * @static
     *
     * @returns { !Object }
     *      A dictionary containing the collective state of the Res class.
     */
    static get _() {
        return Res.__ || (Res.__ = Object.create(null));
    }

    /**
     * Gets a list of memory-cached Res objects indexed by locale.
     *
     * @private
     * @static
     *
     * @returns { !Map.<!String, !Res> }
     *      A Map containing loaded Res objects by locale. The Map returned by this property
     *      is empty to start and is intended to be populated by private APIs as locale-unique
     *      resources are requested. Because Res objects are immutable, this property is essentially
     *      a memory-optimized backing store where, at most, only one Res object per locale is ever
     *      constructed.
     */
    static get _cache() {
        return Res._.cache || (Res._.cache = new Map());
    }

    /**
     * Gets the default locale associated with the Res class.
     *
     * @static
     *
     * @returns { !String }
     *      The default locale associated with the Res class, which controls translate, compare, parse
     *      and format operations. Locales are either region-specific (e.g. 'en-US'), neutral (e.g. 'en'),
     *      or invariant (e.g. ''). The default value of this property is the invariant locale.
     */
    static get defaultLocale() {
        return Res._.defaultLocale || (Res._.defaultLocale = '');
    }
    /**
     * Sets the default locale associated with the Res class.
     *
     * @static
     *
     * @param { !String } value
     *      The default locale associated with the Res class, which controls translate, compare, parse
     *      and format operations. Locales are either region-specific (e.g. 'en-US'), neutral (e.g. 'en'),
     *      or invariant (e.g. '').
     */
    static set defaultLocale(value) {
        Res._.defaultLocale = value;
    }

    /**
     * Gets a list of memory-cached graphs indexed by file path.
     *
     * @private
     * @static
     *
     * @returns { !Map.<!String, ?Object> }
     *      A Map containing loaded graphs (anonymous objects) by file path. The Map returned by this
     *      property is empty to start and is intended to be populated by private APIs as unique-by-file
     *      graphs are resolved and loaded. Because the graphs are immutable, this property is essentially
     *      a memory-optimized backing store where, at most, only one graph per filed path is ever resolved.
     */
    static get _graphCache() {
        return Res._.graphCache || (Res._.graphCache = new Map());
    }

    /**
     * Gets the root path where locale-specifc resource files will be loaded.
     *
     * @static
     *
     * @returns { !String }
     *      The starting point for locating locale-specific resource files. Locale- and resource-specific
     *      path parts are appended to the root path during resource file resolution. The root path is
     *      relative to the Res class, and has a default value of ''.
     */
    static get rootPath() {
        return Res._.rootPath || (Res._.rootPath = '');
    }
    /**
     * Sets the root path where locale-specifc resource files will be loaded.
     *
     * @static
     *
     * @param { !String } value
     *      The starting point for locating locale-specific resource files. Applications which locate
     *      resource files according to a specific runtime/project structure should set this property
     *      so files can be properly resolved.
     */
    static set rootPath(value) {
        Res._.rootPath = `${(value && !value.endsWith('/')) ? `${value}/` : value}`;
    }

    //#region Methods

    /**
     * Gets a Res object associated with the specified locale.
     *
     * @static
     *
     * @param { !String } locale
     *      A String that represents the translation, compare, parse and format conventions of the
     *      Res object being requested. This can either be a region-specific locale (e.g. 'en-US'),
     *      a neutral locale (e.g. 'en'), or the invariant locale (e.g. '').
     * @returns { !Res }
     *      A Res object associated with the specified locale. Because Res objects are immutable,
     *      the same instance is returned for the same locale specified in subsequent invocations.
     */
    static fromLocale(locale) {
        //!!! not thread-safe
        if (!Res._cache.has(locale))
            Res._cache.set(locale, new Res(locale));

        return Res._cache.get(locale);
    }

    /**
     * TODO
     *
     * @static
     *
     * @param { !Object } source
     *      TODO
     * @param { !Object } target
     *      TODO
     * @returns { !Object }
     *      TODO
     */
    static merge(source, target) {
        target = Object.assign({}, target);

        Reflect
            .ownKeys(source)
            .forEach(key => {
                const descriptor = Reflect.getOwnPropertyDescriptor(source, key);

                if (is(descriptor).defined && descriptor.enumerable) {
                    const sourceValue = source[key];
                    const targetValue = target[key];

                    target[key] = (is(sourceValue).anObject && is(targetValue).anObject) ? Res.merge(sourceValue, targetValue) : sourceValue;
                }

            });

        return target;
    }

    //#endregion

    //#endregion

    //#region Disposition

    /**
     * Initializes a new Res object conforming to the conventions specified by the provided locale.
     * This constructor is not intended to be called from client code; callers should use static property
     * and factory methods of the Res type instead.
     *
     * @param { !String } locale
     *      A String that represents the translation, compare, parse and format conventions of the
     *      Res object being constructed. This can either be a region-specific locale (e.g. 'en-US'),
     *      a neutral locale (e.g. 'en'), or the invariant locale (e.g. '').
     */
    constructor(locale) {
        const parts = locale.split('-');

        this._.language = parts.length ? (parts[0] || null) : null;
        this._.region = (this._.language && parts.length > 1) ? (parts[1] || null) : null;
        this._.locale = locale;
    }

    //#endregion

    //#region Properties

    /**
     * Gets the collective state of this Res object.
     *
     * @private
     *
     * @returns { !Object }
     *      A dictionary containing the collective state of this Res object.
     */
    get _() {
        return this.__ || (this.__ = Object.create(null));
    }

    /**
     * Gets a list of memory-cached composite graphs indexed by root and local path.
     *
     * @private
     *
     * @returns { !Map.<!String, !Object> }
     *      A Map containing loaded composite graphs (anonymous objects) by root and local path. The
     *      Map returned by this property is empty to start and is intended to be populated by private
     *      APIs as spec-driven resource paths are resolved and merged into composite graphs. Because
     *      the composite graphs are immutable, this property is essentially a memory-optimized backing
     *      store where, at most, only one composite graph per root and local path is ever resolved
     *      and merged.
     */
    get _cache() {
        return this._.cache || (this._.cache = new Map());
    }

    /**
     * Gets a value indicating whether this Res object is locale-invariant.
     *
     * @returns { !Boolean }
     *      true if this Res object is neither associated with a language nor a region; otherwise,
     *      false.
     */
    get isInvariant() {
        return this._.isInvariant || (this._.isInvariant = !(this.language || this.region));
    }

    /**
     * Gets a value indicating whether this Res object is locale-neutral.
     *
     * @returns { !Boolean }
     *      true if this Res object is associated with a language but not a region; otherwise,
     *      false.
     */
    get isNeutral() {
        return this._.isNeutral || (this._.isNeutral = (this.language && !this.region));
    }

    /**
     * Gets the language code associated with this Res object.
     *
     * @returns { ?String }
     *      The language code (e.g. 'en') associated with this Res object, or null if this Res
     *      object's locale does not specify a language.
     */
    get language() {
        return this._.language;
    }

    /**
     * Gets the locale associated with this Res object.
     *
     * @returns { !String }
     *      The locale associated with this Res object, used to load locale-specific resource files
     *      declaring translation, compare, parse and format conventions. Locales are either region-specific
     *      (e.g. 'en-US'), neutral (e.g. 'en'), or invariant (e.g. '').
     */
    get locale() {
        return this._.locale;
    }

    /**
     * Gets the region code associated with this Res object.
     *
     * @returns { ?String }
     *      The region code (e.g. 'US') associated with this Res object, or null if this Res
     *      object's locale does not specify a region.
     */
    get region() {
        return this._.region;
    }

    //#endregion

    //#region Methods

    /**
     * TODO
     *
     * @param { !String } spec
     *      TODO
     * @returns { !Promise.<*> }
     *      TODO
     */
    /* jshint ignore:start */
    get(spec) {
        return async() => {
            let result;

            //!!! memory barrier thread safety
            const rootPath = Res.rootPath;
            const language = this.language;
            const region = this.region;

            const index = spec.indexOf('.');
            const localPath = (index >= 0) ? spec.substr(0, index) : spec;
            const val = (index >= 0) ? spec.substr(index + 1) : null;

            if (localPath) {
                const key = [rootPath, localPath].join(':');

                //!!! not thread-safe
                if (!this._cache.has(key)) {
                    this._cache.set(key, await Promise
                        .all([
                            (language && region)
                                ? async() => {
                                    const spec = `${rootPath}res/${language}/${region}/${localPath}.json`;

                                    //!!! not thread-safe
                                    if (!Res._graphCache.has(spec))
                                        Res._graphCache.set(spec, await FileService.getObject(spec));

                                    return Res._graphCache.get(spec);
                                }()
                                : null,
                            language
                                ? async() => {
                                    const spec = `${rootPath}res/${language}/${localPath}.json`;

                                    //!!! not thread-safe
                                    if (!Res._graphCache.has(spec))
                                        Res._graphCache.set(spec, await FileService.getObject(spec));

                                    return Res._graphCache.get(spec);
                                }()
                                : null,
                            async() => {
                                const spec = `${rootPath}res/${localPath}.json`;

                                //!!! not thread-safe
                                if (!Res._graphCache.has(spec))
                                    Res._graphCache.set(spec, await FileService.getObject(spec));

                                return Res._graphCache.get(spec);
                            }()
                        ])
                        .then(graphs => graphs.reduce((composite, graph) => Res.merge(composite || {}, graph || {})))
                    );
                }

                result = this._cache.get(key);

                if (val) {
                    const parts = val.split('.');

                    if (!parts.every(part => !!part))
                        result = undefined;
                    else
                        parts.forEach(part => {
                            if (is(result).defined)
                                result = result[part];
                        });
                }
            }

            return result;
        }();
    }
    /* jshint ignore:end */

    //#endregion
}

/**
 * Provides convenience operations for working with Res objects at runtime.
 *
 * @param { !String } locale
 *      TODO
 * @returns { Res }
 *      TODO
 */
const res = locale => Res.fromLocale(locale);

Object.defineProperties(res, {
    defaultLocale: {
        get: Reflect.getOwnPropertyDescriptor(Res, 'defaultLocale').get,
        set: Reflect.getOwnPropertyDescriptor(Res, 'defaultLocale').set,
        configurable: false
    },

    get: {
        value: spec => res(res.defaultLocale).get(spec),
        configurable: false
    },

    rootPath: {
        get: Reflect.getOwnPropertyDescriptor(Res, 'rootPath').get,
        set: Reflect.getOwnPropertyDescriptor(Res, 'rootPath').set,
        configurable: false
    },

    merge: {
        value: Reflect.getOwnPropertyDescriptor(Res, 'merge').value,
        configurable: false
    }
});

export default res;