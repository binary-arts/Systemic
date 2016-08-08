// import { Exception } from '../Runtime/Exception';

// /**
//  * Provides a set of utilities that assist in code debugging.
//  */
// export class Debug {

//     //#region Disposition

//     /**
//      * As a static (singleton) class, Debug defines a constructor that is not intended to be called.
//      * The constructor is explicitly defined so that attempts to initialize a Debug object will result
//      * in an exception.
//      */
//     private constructor() {
//         throw Exception.staticClassConstructorInvocation;
//     }

//     //#endregion

//     //#region Methods

//     /**
//      * Checks a condition; if the condition is false, logs a console warning with a specified message
//      * at the caller's location in the stack.
//      *
//      * @param { * } [condition]
//      *      A conditional expression to evaluate. If the expression is truthy, no warning is logged.
//      * @param { ?String } [message='An assertion failed.']
//      *      A message to describe the warning if condition is false.
//      */
//     public static assert(condition: any, message: string | null = 'An assertion failed.'): void {
//         if (!condition) {
//             let warning = Exception.create(`An assertion failed${typeof message === 'string' && message ? `: ${message}` : null}.`, { stackFrameIndex: 1 }).stack;
//             const prefix = 'Error: ';

//             if (warning!.indexOf(prefix) === 0) warning = warning!.substring(prefix.length);

//             if (console.assert) console.assert(false, warning);
//             else console.warn(warning);
//         }
//     }

//     //#endregion

// }
