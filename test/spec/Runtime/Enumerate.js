import is from 'src/Runtime/Is';

import enumerate from 'src/Runtime/Enumerate';

/* jshint ignore:start */
const global = typeof global === 'undefined' ? self : global;
/* jshint ignore:end */

describe('Runtime.Enumerate', () => {
    let items;
    let e;

    const predicates = {
        hasArguments: (item, index, context) => is(item).aString && is(index).aNumber && is(context).defined,
        isLowerCase: item => item.toLowerCase() === item,
        isUpperCase: item => item.toUpperCase() === item,
        startsWithHell: item => item.startsWith('hell')
    };

    const selectors = {
        formatArguments: (item, index, context) => `${item} ${index + 1} ${context === items}`,
        pad: item => ` ${item} `,
        toUpperCase: item => item.toUpperCase()
    };

    beforeAll(() => {
        spyOn(predicates, 'isLowerCase').and.callThrough();
        spyOn(predicates, 'isUpperCase').and.callThrough();
        spyOn(predicates, 'startsWithHell').and.callThrough();
        spyOn(selectors, 'toUpperCase').and.callThrough();
    });

    beforeEach(() => {
        items = ['hello', 'world'];
        e = enumerate(items);

        predicates.isLowerCase.calls.reset();
        predicates.isUpperCase.calls.reset();
        predicates.startsWithHell.calls.reset();
        selectors.toUpperCase.calls.reset();
    });

    describe('all()', () => {
        it('returns false when at least one item does not satisfy the predicate', () => {
            expect(e.all(predicates.isUpperCase)).toBe(false);
        });

        it('returns true when all items satisfy the predicate', () => {
            expect(e.all(predicates.isLowerCase)).toBe(true);
        });

        it('returns true when there are no items', () => {
            expect(enumerate([]).all(predicates.isLowerCase)).toBe(true);
        });

        it('returns true when the predicate is missing', () => {
            expect(e.all()).toBe(true);
        });

        it('returns true when the predicate is null', () => {
            expect(e.all(null)).toBe(true);
        });

        it('stops enumerating when the first item not satisfying the predicate is reached', () => {
            expect(predicates.isUpperCase.calls.any()).toBe(false);

            expect(e.all(predicates.isUpperCase)).toBe(false);
            expect(predicates.isUpperCase.calls.count()).toBe(1);
        });

        it('can receive a chain', () => {
            expect(e.select(item => item).all(predicates.isLowerCase)).toBe(true);
        });

        it('provides the correct arguments to the predicate', () => {
            expect(e.all(predicates.hasArguments)).toBe(true);
        });

        it('provides a closed-over context to an arrow function predicate', () => {
            const that = {};
            const op = function () { return e.all(() => this === that); };

            expect(op.bind(that)()).toEqual(true);
        });

        it('provides a global (window) context to a loose function predicate', () => {
            expect(e.all(function () { return this === global; })).toBe(true);
         });
    });

    describe('any()', () => {
        it('returns false when no item satisfies the predicate', () => {
            expect(e.any(predicates.isUpperCase)).toBe(false);
        });

        it('returns true when any item satisfies the predicate', () => {
            expect(e.any(predicates.startsWithHell)).toBe(true);
        });

        it('returns false when there are no items and the predicate is missing', () => {
            expect(enumerate([]).any()).toBe(false);
        });

        it('returns false when there are no items and the predicate is null', () => {
            expect(enumerate([]).any(null)).toBe(false);
        });

        it('returns true when there is at least one item and the predicate is missing', () => {
            expect(e.any()).toBe(true);
        });

        it('returns true when there is at least one item and the predicate is null', () => {
            expect(e.any(null)).toBe(true);
        });

        it('stops enumerating when the first item satisfying predicate is reached', () => {
            expect(predicates.isLowerCase.calls.any()).toBe(false);

            expect(e.any(predicates.isLowerCase)).toBe(true);
            expect(predicates.isLowerCase.calls.count()).toBe(1);
        });

        it('can receive a chain', () => {
            expect(e.select(item => item).any(predicates.isUpperCase)).toBe(false);
        });

        it('provides the correct arguments to the predicate', () => {
            expect(e.any(predicates.hasArguments)).toBe(true);
        });

        it('provides a closed-over context to an arrow function predicate', () => {
            const that = {};
            const op = function () { return e.any(() => this === that); };

            expect(op.bind(that)()).toEqual(true);
        });

        it('provides a global (window) context to a loose function predicate', () => {
            expect(e.any(function () { return this === global; })).toBe(true);
         });
    });

    describe('select()', () => {
        it('projects items according to the selector', () => {
            expect(e.select(selectors.toUpperCase).toArray()).toEqual(['HELLO', 'WORLD']);
        });

        it('can be chained', () => {
            expect(e.select(selectors.toUpperCase).select(selectors.pad).toArray()).toEqual([' HELLO ', ' WORLD ']);
        });

        it('provides the correct arguments to the selector', () => {
            expect(e.select(selectors.formatArguments).toArray()).toEqual(['hello 1 true', 'world 2 true']);
        });

        it('does not execute its selector until a terminal operation is executed', () => {
            expect(selectors.toUpperCase.calls.any()).toBe(false);

            e.select(selectors.toUpperCase);
            expect(selectors.toUpperCase.calls.any()).toBe(false);

            expect(e.toArray()).toEqual(['HELLO', 'WORLD']);
            expect(selectors.toUpperCase.calls.count()).toBe(2);

            items.unshift('howdy');
            expect(selectors.toUpperCase.calls.count()).toBe(2);

            expect(e.toArray()).toEqual(['HOWDY', 'HELLO', 'WORLD']);
            expect(selectors.toUpperCase.calls.count()).toBe(5);
        });

        it('provides a closed-over context to an arrow function selector', () => {
            const that = {};
            const op = function () { return e.select(() => this).toArray(); };

            expect(op.bind(that)()).toEqual([that, that]);
        });

        it('provides a global (window) context to a loose function selector', () => {
            expect(e.select(function () { return this; }).toArray()).toEqual([global, global]);
         });
    });

    describe('where()', () => {
        it('filters items according to the predicate', () => {
            expect(e.where(predicates.startsWithHell).toArray()).toEqual(['hello']);
        });

        it('returns an empty array when no items match the predicate', () => {
            expect(e.where(() => false).toArray()).toEqual([]);
        });

        it('returns a copy of the original array when the predicate is missing', () => {
            const expectation = expect(e.where().toArray());

            expectation.toEqual(items);
            expectation.not.toBe(items);
        });

        it('can be chained', () => {
            expect(e.where(predicates.isLowerCase).where(predicates.isUpperCase).toArray()).toEqual([]);
        });

        it('provides the correct arguments to the predicate', () => {
            expect(e.where(predicates.hasArguments).toArray()).toEqual(items);
        });

        it('does not execute its predicate until a terminal operation is executed', () => {
            expect(predicates.startsWithHell.calls.any()).toBe(false);

            e.where(predicates.startsWithHell);
            expect(predicates.startsWithHell.calls.any()).toBe(false);

            expect(e.toArray()).toEqual(['hello']);
            expect(predicates.startsWithHell.calls.count()).toBe(2);

            items.unshift('hellsinki');
            expect(predicates.startsWithHell.calls.count()).toBe(2);

            expect(e.toArray()).toEqual(['hellsinki', 'hello']);
            expect(predicates.startsWithHell.calls.count()).toBe(5);
        });

        it('provides a closed-over context to an arrow function predicate', () => {
            const that = {};
            const op = function () { return e.where(() => this === that).toArray(); };

            expect(op.bind(that)()).toEqual(items);
        });

        it('provides a global (window) context to a loose function predicate', () => {
            expect(e.where(function () { return this === global; }).toArray()).toEqual(items);
         });
    });
});
