/* jshint ignore:start */
import is from '../Runtime/Is';
/* jshint ignore:end */
import as from '../Runtime/As';
import res from '../Runtime/Res';

import Exception from '../Runtime/Exception';

/**
 * TODO
 *
 * @abstract
 */
export default class Formatter {
    //#region Type

    //#region Properties

    /**
     * TODO
     *
     * @static
     * @abstract
     *
     * @returns { Promise.<!Formatter> }
     *      TODO
     */
    static get invariant() {
        throw Exception.abstractMemberInvocation;
    }

    /**
     * Gets locale-independent (invariant) format conventions for the Formatter class.
     *
     * @protected
     * @static
     * @virtual
     *
     * @returns { !Object }
     *      An Object containing the the invariant format conventions for the Formatter class.
     *      Formatter objects will use these conventions during format operations unless language-
     *      or region-specific values are declared in one or more locale-aware configuration files.
     */
    static get _invariantCulture() {
        return Formatter.__invariantCulture || (Formatter.__invariantCulture = {});
    }

    /**
     * TODO
     *
     * @protected
     * @static
     * @abstract
     *
     * @returns { !Array.<!T> }
     *      TODO
     */
    static get _priorityTypes() {
        throw Exception.abstractMemberInvocation;
    }

    //#endregion

    //#region Methods

    /**
     * TODO
     *
     * @static
     * @abstract
     *
     * @param { !String } locale
     *      TODO
     * @returns { Promise.<!Formatter> }
     *      TODO
     */
    /* jshint ignore:start */
    static fromLocale(locale) {
        throw Exception.abstractMemberInvocation;
    }
    /* jshint ignore:end */

    /**
     * TODO
     *
     * @static
     *
     * @param { * } ref
     *      TODO
     * @param { !Number } minLength
     *      TODO
     * @returns { !String }
     *      TODO
     */
    static zeroPad(ref, minLength) {
        return `${new Array(Math.max(0, minLength)).fill('0').join('')}${ref = as(ref).aString || ''}`.substring(Math.min(ref.length, minLength));
    }

    //#endregion

    //#endergion

    //#region Disposition

    /**
     * TODO
     *
     * @protected
     *
     * @param { !Object } invariantCulture
     *      TODO
     * @param { !String } locale
     *      TODO
     */
    constructor(locale) {
        const TFormatter = this.constructor;
        const resource = res(locale);

        this._.language = resource.language;
        this._.locale = resource.locale;
        this._.region = resource.region;
        this._.culture = TFormatter._invariantCulture;

        /* jshint ignore:start */
        this._.initialized = async() => {
            if (!resource.isInvariant) {
                let name = TFormatter.name;

                if (name.endsWith('Formatter'))
                    name = name.substr(0, name.length - 9);

                if (is(name).aNonEmptyString)
                    this._.culture = await resource.get(name).then(culture => res.merge(culture, this._.culture));
            }
        }();
        /* jshint ignore:end */
    }

    //#endregion

    //#region Properties

    /**
     * Gets the collective state of this Formatter object.
     *
     * @protected
     *
     * @returns { !Object }
     *      A dictionary containing the collective state of this Formatter object.
     */
    get _() {
        return this.__ || (this.__ = Object.create(null));
    }

    /**
     * TODO
     *
     * @protected
     *
     * @returns { !Object }
     *      TODO
     */
    get _culture() {
        return this._.culture;
    }

    /**
     * Indicates whether this Formatter object is initialized.
     *
     * @protected
     *
     * @returns { !Promise.<void> }
     *      A Promise that resolves when this Formatter object is fully initialized. Consumers of this
     *      Formatter use this property to block until the Formatter is ready, but this is not required.
     *      APIs that depend on initialization will operate as if bound to the invariant culture until
     *      this Formatter object is fully initialized.
     */
    get _initialized() {
        return this._.initialized;
    }

    /**
     * Gets the language code associated with this Formatter object.
     *
     * @returns { ?String }
     *      The language code (e.g. 'en') associated with this Formatter object, or null if this Formatter
     *      object's locale does not specify a language.
     */
    get language() {
        return this._.language;
    }

    /**
     * Gets the locale associated with this Formatter object.
     *
     * @returns { !String }
     *      The locale associated with this Formatter object, used to execute translation, compare,
     *      parse and format operations. Locales are either region-specific (e.g. 'en-US'), neutral
     *      (e.g. 'en'), or invariant (e.g. '').
     */
    get locale() {
        return this._.locale;
    }

    /**
     * Gets the region code associated with this Formatter object.
     *
     * @returns { ?String }
     *      The region code (e.g. 'US') associated with this Formatter object, or null if this Formatter
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
     * @abstract
     *
     * @param { * } ref
     *      TODO
     * @param { !String } spec
     *      TODO
     * @returns { ?String }
     *      TODO
     */
    /* jshint ignore:start */
    format(ref, spec) {
        throw Exception.abstractMemberInvocation;
    }
    /* jshint ignore:end */

    //#endregion
}