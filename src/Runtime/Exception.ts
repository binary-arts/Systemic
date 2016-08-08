// export class Exception {

//     //#region Disposition

//     /**
//      * As a static (singleton) class, Exception defines a constructor that is not intended to be called.
//      * The constructor is explicitly defined so that attempts to initialize an Exception object will
//      * result in an exception.
//      */
//     private constructor() {
//         throw Exception.staticClassConstructorInvocation;
//     }

//     //#endregion

//     //#region Properties

//     /**
//      *
//      *
//      * @returns { !Error }
//      *      A JavaScript Error.
//      */
//     public static get abstractMemberInvocation(): Error {
//         return Exception.create('Cannot invoke an abstract member.', { stackFrameIndex: 1 });
//     }

//     /**
//      *
//      *
//      * @returns { !Error }
//      *      A JavaScript Error.
//      */
//     public static get staticClassConstructorInvocation(): Error {
//         return Exception.create('Cannot invoke the constructor function of a static class.', { stackFrameIndex: 1 });
//     }

//     //#endregion

//     //#region Methods

//     /**
//      * Initialzies a new JavaScript Error extended with an explicit message property, user-augmented
//      * properties, an inner error, an error classification code, an objectified stack trace and a packed
//      * and serialized description which can be used in uncaught error handler methods.
//      *
//      * @param { ?String } message='Unspecified error.'
//      *      A description of the error.
//      * @param { ?Object } [options={ data: {}, innerError: new Error(), number: 0, stackFrameIndex: 0 }]
//      *      An object used to configure properties of the error. {pname_1} can include any combination
//      *      of the following: (1) data, an object that provides supplementary information relative
//      *      to the error; properties of the data property are copied directly to the error; (2) innerError,
//      *      an error that is the cause of this error with a default value of null; (3) number, a
//      *      number that classifies the error type with a default value of 0; and (4) stackFrameIndex,
//      *      a count of stack frames above the caller at which to initialize the objectified stack trace
//      *      at with a default value of 0.
//      * @returns { !Error }
//      *      A JavaScript Error.
//      */
//     public static create(message: string | undefined, options: any | undefined): Error {
//         //argument coercion
//         options = typeof options === 'object' ? options : <any>{};

//         let ex: Error = new Error();

//         //user-defined data
//         if (typeof options.data === 'object') for (const prop of options.data) (<any>ex)[prop] = options.data[prop];

//         //innerError
//         //TBI: escalate innerError to extended error if not already (default all values)
//         (<any>ex).innerError = options.innerError || null;

//         //number
//         (<any>ex).number = typeof options.number === 'number' ? options.number : 0;

//         //message
//         ex.message = typeof message === 'string' && message ? message : 'Unspecified error.';

//         //!!! tested on IE11... test on other user agents
//         let stackFrameIndex = Math.max(options.stackFrameIndex || 0, 0) + 1;

//         if (!ex.stack) {
//             stackFrameIndex++;

//             try { throw ex; }
//             catch (thownEx) { ex = thownEx; }
//         }

//         const frames: Array<string> = (<any>ex)
//             .stack
//             .split('\n');

//         const topFrame = frames[0];

//         while (stackFrameIndex-- > 0) frames.shift();

//         //trace
//         (<any>ex).trace = frames.map(frame => {
//             const result = {
//                 file: null,
//                 site: null,
//                 line: null,
//                 column: null
//             };

//             let parts = frame
//                 .trim()
//                 .replace('at ', '')
//                 .split('(');

//             if (parts.length === 2) {
//                 (<any>result).site = parts[0].trim();

//                 parts = parts[1].split(':');

//                 if (parts.length >= 3) {
//                     (<any>result).file = parts.slice(0, parts.length - 2).join('');

//                     let position: number;

//                     if (!isNaN(position = parseInt(parts[parts.length - 2]))) (<any>result).line = position;
//                     if (!isNaN(position = parseInt(parts[parts.length - 1]))) (<any>result).column = position;
//                 }
//             }

//             return result;
//         });

//         //stack
//         frames.unshift(topFrame);

//         try { ex.stack = frames.join('\n'); }
//         catch (innerEx) { /* swallow... ex.stack is readonly */ }

//         //description as serialized error
//         Reflect.deleteProperty(ex, 'description');
//         (<any>ex).description = JSON.stringify(ex, null, 2);

//         return ex;
//     }

//     /**
//      *
//      *
//      * @param { ?String } value='Unclassified script error.'
//      * @param { ?String } [url=null]
//      * @param { ?Number } [line=null]
//      * @param { ?Number } [column=null]
//      *
//      * @returns { Error }
//      *
//      */
//     public static deserialize(value?: string, url: string | null = null, line: number | null = null, column: number | null = null
//     ): Error {
//         if (typeof value !== 'string' || !value) value = 'Unclassified script error.';

//         const result: Error = new Error();

//         let prefix = 'Uncaught ';
//         if (value.indexOf(prefix) === 0) value = value.slice(prefix.length);

//         prefix = 'Error: ';
//         if (value.indexOf(prefix) === 0) value = value.slice(prefix.length);

//         try {
//             const literal = JSON.parse(value);

//             for (const prop of literal) (<any>result)[prop] = literal[prop];
//         }
//         catch (ex) {
//             result.message = value;
//         }

//         (<any>result).url = typeof url !== 'string' ? null : url;
//         (<any>result).line = isNaN(<number>line) ? null : line;
//         (<any>result).column = isNaN(<number>column) ? null : column;

//         Reflect.deleteProperty(result, 'description');

//         return result;
//     }

//     //#endregion

// }
