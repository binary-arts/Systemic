import is from './Runtime/Is';

import Debug from './Diagnostics/Debug';

export class Pair {

    constructor(first, second) {
        //init
        this.first = first;
        this.second = second;
    }

    //#region Properties

    /**
     * A dictionary that contains the collective state of this instance.
     *
     * @protected
     *
     * @returns { Object }
     */
    get _() {
        return this.__ || (this.__ = Object.create(null));
    }

    get first() {
        const result = this._.first;

        Debug.assert(!is(result).undefined);

        return result;
    }
    set first(value) {
        this._.first = is(value).undefined ? null : value;
    }

    get second() {
        const result = this._.second;

        Debug.assert(!is(result).undefined);

        return result;
    }
    set second(value) {
        this._.second = is(value).undefined ? null : value;
    }

    //#endregion

}

export class Triple extends Pair {

    constructor(first, second, third) {
        super(first, second);

        //init
        this.third = third;
    }

    //#region Properties

    get third() {
        const result = this._.third;

        Debug.assert(!is(result).undefined);

        return result;
    }
    set third(value) {
        this._.third = is(value).undefined ? null : value;
    }

    //#endregion

}

export class Quad extends Triple {

    constructor(first, second, third, fourth) {
        super(first, second, third);

        //init
        this.fourth = fourth;
    }

    //#region Properties

    get fourth() {
        const result = this._.fourth;

        Debug.assert(!is(result).undefined);

        return result;
    }
    set fourth(value) {
        this._.fourth = is(value).undefined ? null : value;
    }

    //#endregion

}
