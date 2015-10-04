// 'use strict';
// 
// define(
//     [
//         './../Is',
//         './../As',
//         './../Contracts/Require',
// 
//         './../TypeEx/Error',
//         'jquery'
//     ],
//     function(Is, As, Require, Error) {
//         return Object.create(null, {
//             //#region Methods
// 
//             /*public static $.Promise<Object?>*/ getObject: {
//                 value: function(/*String*/ path, /*[Boolean]*/ throwOnFailure) {
//                     Require.aNotEmptyString(path);
// 
//                     return $
//                         .Deferred(function(task) {
//                             $.getJSON(path).always(function() {
//                                 Require.that(arguments.length == 3);
// 
//                                 var failed = Is.string(arguments[2]);
//                                 var result = failed ? null : arguments[0];
// 
//                                 if (failed && throwOnFailure) {
//                                     var request = this;
//                                     var response = arguments[0];
// 
//                                     var httpStatus = As.number(response.status);
//                                     var httpMessage = As.string(response.statusText);
// 
//                                     var description;
// 
//                                     switch (arguments[1]) {
//                                         case "timeout":
//                                             description = "timed out.";
//                                             break;
// 
//                                         case "abort":
//                                             description = "was aborted.";
//                                             break;
// 
//                                         case "parsererror":
//                                             description = "failed because the response was invalid or corrupt and could not be parsed.";
//                                             break;
// 
//                                         default:
//                                             description = "failed with status " + httpStatus + " : \"" + (description || httpMessage) + "\".";
//                                             break;
//                                     }
// 
//                                     throw Error.create(
//                                         "FileServiceError",
//                                         httpStatus,
//                                         httpMessage,
//                                         ["A", request.type, "file service request", request.url ? "at" : "", request.url, description]
//                                             .filter(function(item) { return !!item; })
//                                             .join(" ")
//                                     );
//                                 }
// 
//                                 task.resolve(result);
//                             });
//                         })
//                         .promise();
//                 }
//             }
// 
//             //#endregion
//         });
//     }
// );