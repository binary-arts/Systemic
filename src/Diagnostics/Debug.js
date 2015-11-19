import Exception from '../Runtime/Exception';

/**
 * TODO
 */
export default class Debug {

    //#region Disposition

    /**
     * As a static (singleton) class, Debug defines a constructor that is not intended to be called.
     * The constructor is explicitly defined so that attempts to initialize a Debug object will result
     * in an exception.
     */
    constructor() {
        throw Exception.staticClassConstructorInvocation;
    }

    //#endregion

    //#region Methods

    /**
     * Checks a condition; if the condition is false, logs a console warning with a specified message
     * at the caller's location in the stack.
     *
     * @static
     *
     * @param { * } [condition]
     *      A conditional expression to evaluate. If the expression is truthy, no warning is logged.
     * @param { ?String } [message='An assertion failed.']
     *      A message to describe the warning if condition is false.
     */
    static assert(condition, message) {

        if (!condition) {
            let warning = Exception.create('An assertion failed' + ((typeof message === 'string' && message) ? ': ' + message : '.'), { stackFrameIndex: 1 }).stack;

            if (warning.indexOf('Error: ') === 0) warning = warning.substring(7);

            /* global console */
            if (console.assert) console.assert(false, warning);
            else console.warn(warning);
            /* global -console */
        }
    }

    //#endregion

}