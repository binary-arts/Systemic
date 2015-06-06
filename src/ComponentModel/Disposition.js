import Exception from '../Runtime/Exception';

export default class {

    constructor() {
        throw Exception.create('Cannot invoke the constructor function of a static class.');
    }

    //#region Type

    //#region Properties

    static get Uninitialized() { return 0; }
    static get Initializing() { return 1; }
    static get Live() { return 2; }
    static get Disposing() { return 3; }
    static get Disposed() { return 4; }

    //#endregion

    //#endregion

}
