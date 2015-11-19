import is from './Runtime/Is';

/* jshint ignore:start */
import FileService from './Net/FileService';
/* jshint ignore:end */

/**
 * Projects locale-specific, externally declared, dynamically loaded language translations as well as
 * conventions for compare, parse and format operations.
 */
export default class Resource {

    //#region Type

    //#region Properties

    /**
     * Gets the collective state of the Resource class.
     *
     * @private
     * @static
     *
     * @returns { !Object }
     *      A dictionary containing the collective state of the Resource class.
     */
    static get _() {
        return Resource.__ || (Resource.__ = Object.create(null));
    }

    /**
     * Gets a list of memory-cached Resource objects indexed by locale.
     *
     * @private
     * @static
     *
     * @returns { !Map.<!String, !Resource> }
     *      A Map containing loaded Resource objects by locale. The Map returned by this property
     *      is empty to start and is intended to be populated by private APIs as locale-unique
     *      resources are requested. Because Resource objects are immutable, this property is essentially
     *      a memory-optimized backing store where, at most, only one Resource object per locale is ever
     *      constructed.
     */
    static get _cache() {
        return Resource._.cache || (Resource._.cache = new Map());
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
        return Resource._.graphCache || (Resource._.graphCache = new Map());
    }

    /**
     * Gets a Resource object that is locale-independent (invariant).
     *
     * @static
     *
     * @returns { !Resource }
     *      A Resource object that is locale-independent (invariant). The invariant locale is not associated
     *      with a language nor a region. Because Resource objects are immutable, the same instance is returned
     *      each time this property is called.
     */
    static get invariant() {
        return Resource.fromLocale('');
    }

    /**
     * Gets the root path where locale-specifc resource files will be loaded.
     *
     * @static
     *
     * @returns { !String }
     *      The starting point for locating locale-specific resource files. Locale- and resource-specific
     *      path parts are appended to the root path during resource file resolution. The root path is
     *      relative to the Resource class definition, and has a default value of ''.
     */
    static get rootPath() {
        return Resource._.rootPath || (Resource._.rootPath = '');
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
        Resource._.rootPath = `${(value && !value.endsWith('/')) ? `${value}/` : value}`;
    }

    //#region Methods

    /**
     * Gets a Resource object associated with the specified locale.
     *
     * @static
     *
     * @param { !String } locale
     *      A String that represents the translation, compare, parse and format conventions of the
     *      Resource object being requested. This can either be a region-specific locale (e.g. 'en-US')
     *      or a neutral locale (e.g. 'en').
     * @returns { !Resource }
     *      A Resource object associated with the specified locale. Because Resource objects are immutable,
     *      the same instance is returned for the same locale specified in subsequent invocations.
     */
    static fromLocale(locale) {
        //!!! not thread-safe
        if (!Resource._cache.has(locale))
            Resource._cache.set(locale, new Resource(locale));

        return Resource._cache.get(locale);
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

                    target[key] = (is(sourceValue).anObject && is(targetValue).anObject) ? Resource.merge(sourceValue, targetValue) : sourceValue;
                }

            });

        return target;
    }

    //#endregion

    //#endregion

    //#region Disposition

    /**
     * Initializes a new Resource object conforming to conventions specified by the provided locale.
     * This constructor is not intended to be called from client code; callers should use static property
     * and factory methods of the Resource type instead.
     *
     * @param { !String } locale
     *      A String that represents the translation, compare, parse and format conventions of the
     *      Resource object being constructed. This can either be a region-specific locale (e.g. 'en-US')
     *      or a neutral locale (e.g. 'en').
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
     * Gets the collective state of this Resource object.
     *
     * @private
     *
     * @returns { !Object }
     *      A dictionary containing the collective state of this Resource object.
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
     * Gets a value indicating whether this Resource object is locale-invariant.
     *
     * @returns { !Boolean }
     *      true if this Resource object is neither associated with a language nor a region; otherwise,
     *      false.
     */
    get isInvariant() {
        return this._.isInvariant || (this._.isInvariant = !(this.language || this.region));
    }

    /**
     * Gets a value indicating whether this Resource object is locale-neutral.
     *
     * @returns { !Boolean }
     *      true if this Resource object is associated with a language but not a region; otherwise,
     *      false.
     */
    get isNeutral() {
        return this._.isNeutral || (this._.isNeutral = (this.language && !this.region));
    }

    /**
     * Gets the language code associated with this Resource object.
     *
     * @returns { ?String }
     *      The language code (e.g. 'en') associated with this Resource object, or null if this Resource
     *      object's locale does not specify a language.
     */
    get language() {
        return this._.language;
    }

    /**
     * Gets the locale associated with this Resource object.
     *
     * @returns { !String }
     *      The locale associated with this Resource object, used to load locale-specific resource files
     *      declaring translation, compare, parse and format conventions. Locales are either region-specific
     *      (e.g. 'en-US'), neutral (e.g. 'en'), or invariant (e.g. '').
     */
    get locale() {
        return this._.locale;
    }

    /**
     * Gets the region code associated with this Resource object.
     *
     * @returns { ?String }
     *      The region code (e.g. 'US') associated with this Resource object, or null if this Resource
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
            const rootPath = Resource.rootPath;
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
                                    if (!Resource._graphCache.has(spec))
                                        Resource._graphCache.set(spec, await FileService.getObject(spec));

                                    return Resource._graphCache.get(spec);
                                }()
                                : null,
                            language
                                ? async() => {
                                    const spec = `${rootPath}res/${language}/${localPath}.json`;

                                    //!!! not thread-safe
                                    if (!Resource._graphCache.has(spec))
                                        Resource._graphCache.set(spec, await FileService.getObject(spec));

                                    return Resource._graphCache.get(spec);
                                }()
                                : null,
                            async() => {
                                const spec = `${rootPath}res/${localPath}.json`;

                                //!!! not thread-safe
                                if (!Resource._graphCache.has(spec))
                                    Resource._graphCache.set(spec, await FileService.getObject(spec));

                                return Resource._graphCache.get(spec);
                            }()
                        ])
                        .then(graphs => graphs.reduce((composite, graph) => Resource.merge(composite || {}, graph || {})))
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