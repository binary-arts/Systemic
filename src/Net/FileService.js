import 'jquery';

import as from '../Runtime/As';
import is from '../Runtime/Is';

import Exception from '../Runtime/Exception';

export default class FileService {

    //#region Dispositon

    constructor() {
        throw Exception.create('Cannot invoke the constructor function of a static class.');
    }

    //#endregion

    //#region Methods

    static getObject(path, throwOnFailure) {
        return $
            .Deferred(function(task) {
                $.getJSON(path).always(function() {
                    const failed = is(arguments[2]).aString;
                    const result = failed ? null : arguments[0];

                    if (failed && throwOnFailure) {
                        const request = this;
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
                                description = `failed with status ${httpStatus} : "${description || httpMessage}"`;
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

                    task.resolve(result);
                });
            })
            .promise();
    }

    //#endregion

}