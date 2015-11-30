import 'jquery';

import as from '../Runtime/As';
import is from '../Runtime/Is';

import Exception from '../Runtime/Exception';

/**
 * TODO
 * 
 * @public @static @sealed
 */
export default class FileService {

    //#region Dispositon

    /**
     * As a static (singleton) class, FileService defines a constructor that is not intended to be
     * called. The constructor is explicitly defined so that attempts to initialize a FileService
     * object will result in an exception.
     */
    constructor() {
        throw Exception.staticClassConstructorInvocation;
    }

    //#endregion

    //#region Methods

    /**
     * TODO
     *
     * @public @static
     *
     * @param { !String } path TODO
     * @param { ?Boolean } [throwOnFailure] TODO
     * 
     * @returns { Promise<?Object> } TODO
     */
    static getObject(path, throwOnFailure) {
        return new Promise(continueWith => {
            $.getJSON(path).always(function() {
                const failed = is(arguments[2]).aString;
                const result = failed ? null : arguments[0];

                if (failed && throwOnFailure) {
                    const request = this; //eslint-disable-line no-invalid-this
                    const response = arguments[0];

                    const httpStatus = as(response.status).aNumber;
                    const httpMessage = as(response.statusText).aString;

                    let description;

                    switch (arguments[1]) {
                        case 'timeout':
                            description = 'timed out.';
                            break;

                        case 'abort':
                            description = 'was aborted.';
                            break;

                        case 'parsererror':
                            description = 'failed because the response was invalid or corrupt and could not be parsed.';
                            break;

                        default:
                            description = `failed with status ${httpStatus} : "${description || httpMessage}".`;
                            break;
                    }

                    throw Exception.create(
                        'FileServiceError',
                        httpStatus,
                        httpMessage,
                        ['A', request.type, 'file service request', request.url ? 'at' : '', request.url, description]
                            .filter(item => !!item)
                            .join(' ')
                    );
                }

                continueWith(result);
            });
        });
    }

    //#endregion

}