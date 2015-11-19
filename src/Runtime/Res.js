import Exception from './Exception';
import Resource from '../Resource';

/**
 * Provides convenience operations for working with Resource objects at runtime.
 */
class Res {

    //#region Disposition

    /**
     * As a static (singleton) class, Res defines a constructor that is not intended to be called.
     * The constructor is explicitly defined so that attempts to initialize a Res object will result
     * in an exception.
     */
    constructor() {
        throw Exception.staticClassConstructorInvocation;
    }

    //#endregion

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
     * Gets the locale associated with the Res class.
     *
     * @static
     *
     * @returns { !String }
     *      The locale associated with the Res type, which controls translation, compare, parse and
     *      format operations. Locales are either region-specific (e.g. 'en-US'), neutral (e.g. 'en'),
     *      or invariant (e.g. ''). The default value of this property is the invariant ('') locale.
     */
    static get locale() {
        return Res._.locale || (Res._.locale = '');
    }
    /**
     * Sets the locale associated with the Res class.
     *
     * @static
     *
     * @param { !String } value
     *      The locale associated with the Res type, which controls translation, compare, parse and
     *      format operations. Locales are either region-specific (e.g. 'en-US'), neutral (e.g. 'en'),
     *      or invariant (e.g. '').
     */
    static set locale(value) {
        Res._.locale = value;
    }

    //#endregion

    //#region Methods

    /**
     * TODO
     *
     * @static
     *
     * @param { !String } spec
     *      TODO
     * @returns { !Promise.<*> }
     *      TODO
     */
    static get(spec) {
        return Resource.fromLocale(Res.locale).get(spec);
    }

    //#endregion

}

/**
 * TODO
 *
 * @param { !String } spec
 *      TODO
 * @returns { !Promise.<*> }
 *      TODO
 */
const res = spec => Res.get(spec);

Reflect.defineProperty(res, 'locale', {
    get: () => Res.locale,
    set: value => Res.locale = value,
    configurable: false
});

export default res;