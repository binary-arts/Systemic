import Exception from '../Runtime/Exception';

export default class Debug {

    constructor() {
        throw Exception.create('Cannot invoke the constructor function of a static class.');
    }

    //#region Methods

    /**
     * Checks a condition; if the condition is false, logs a console warning with a specified message
     * at the caller's location in the stack.
     *
     * @static
     *
     * @param { * } [condition]
     *      A conditional expression to evaluate. If the expression is truthy, no warning is logged.
     * @param { String } [message='An assertion failed.']
     *      A message to describe the warning if condition is false.
     */
    assert(condition, message) {
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