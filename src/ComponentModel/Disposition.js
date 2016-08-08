import Exception from '../Runtime/Exception';

/**
 * TODO
 *
 * @public @static @sealed
 */
export default class Disposition {

    //#region Disposition

    /**
     * As an Enum, Disposition defines a constructor that is not intended to be called. The constructor
     * is explicitly defined so that attempts to initialize a Disposition Enum will result in an exception.
     */
    constructor() {
        throw Exception.staticClassConstructorInvocation;
    }

    //#endregion

    //#region Properties

    static get Uninitialized() { return 0; }
    static get Initializing() { return 1; }
    static get Live() { return 2; }
    static get Disposing() { return 3; }
    static get Disposed() { return 4; }

    //#endregion

}
