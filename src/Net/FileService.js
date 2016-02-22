import as from '../Runtime/As';

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
     * @public @static @async
     *
     * @param { !String } path TODO
     * @param { ?Boolean } [throwOnFailure] TODO
     * 
     * @returns { Promise<?Object> } TODO
     */
    static async getObject(path, throwOnFailure) {
        let result = null;

        try {
            result = await fetch(path);

            if (result.ok) result = result.json();
            else {
                const status = as(result.status).aNumber;
                const text = as(result.statusText).aString;
                const url = as(result.url).aString;

                throw Exception.create(
                    `A FileService request ${url ? `at ${url} ` : ''}failed with status ${status} : "${text}".`,
                    { number: status }
                );
            }
        }
        catch(ex) {
            result = null;
            
            if (throwOnFailure) throw ex;
        }

        return result;
    }

    //#endregion

}