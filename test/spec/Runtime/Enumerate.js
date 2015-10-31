import is from 'src/Runtime/Is';

import enumerate from 'src/Runtime/Enumerate';

/* jshint ignore:start */
const global = typeof global === 'undefined' ? self : global;
/* jshint ignore:end */

describe('Runtime/Enumerate:', () => {

    describe('The all method', () => {
        let items;
        let e;

        const predicates = {
            hasArguments: (item, index, context) => is(item).aString && is(index).aNumber && is(context).defined,
            isLowerCase: item => item.toLowerCase() === item,
            isUpperCase: item => item.toUpperCase() === item
        };

        beforeAll(() => {
            spyOn(predicates, 'isUpperCase').and.callThrough();
        });

        beforeEach(() => {
            items = ['hello', 'world'];
            e = enumerate(items);

            predicates.isUpperCase.calls.reset();
        });

        it('returns false when at least one item does not satisfy the predicate.', () => {
            expect(e.all(predicates.isUpperCase)).toBe(false);
        });

        it('returns true when all items satisfy the predicate.', () => {
            expect(e.all(predicates.isLowerCase)).toBe(true);
        });

        it('returns true when there are no items.', () => {
            expect(enumerate([]).all(predicates.isLowerCase)).toBe(true);
        });

        it('returns true when the predicate is not defined.', () => {
            expect(e.all()).toBe(true);
        });

        it('returns true when the predicate is null.', () => {
            expect(e.all(null)).toBe(true);
        });

        it('stops enumerating when the first item that does not satisfy the predicate is reached.', () => {
            expect(predicates.isUpperCase.calls.any()).toBe(false);

            expect(e.all(predicates.isUpperCase)).toBe(false);
            expect(predicates.isUpperCase.calls.count()).toBe(1);
        });

        it('can receive a chain.', () => {
            expect(e.select(item => item).all(predicates.isLowerCase)).toBe(true);
        });

        it('provides the correct arguments to the predicate.', () => {
            expect(e.all(predicates.hasArguments)).toBe(true);
        });

        it('provides a closed-over context to arrow function predicates.', () => {
            const that = {};
            const op = function () { return e.all(() => this === that); };

            expect(op.bind(that)()).toEqual(true);
        });

        it('provides a global (window) context to loose function predicates.', () => {
            expect(e.all(function () { return this === global; })).toBe(true);
         });
    });

    describe('The any method', () => {
        let items;
        let e;

        const predicates = {
            hasArguments: (item, index, context) => is(item).aString && is(index).aNumber && is(context).defined,
            isLowerCase: item => item.toLowerCase() === item,
            isUpperCase: item => item.toUpperCase() === item,
            startsWithHell: item => item.startsWith('hell')
        };

        beforeAll(() => {
            spyOn(predicates, 'isLowerCase').and.callThrough();
        });

        beforeEach(() => {
            items = ['hello', 'world'];
            e = enumerate(items);

            predicates.isLowerCase.calls.reset();
        });

        it('returns false when no item satisfies the predicate.', () => {
            expect(e.any(predicates.isUpperCase)).toBe(false);
        });

        it('returns true when any item satisfy the predicate.', () => {
            expect(e.any(predicates.startsWithHell)).toBe(true);
        });

        it('returns false when there are no items and the predicate is not defined.', () => {
            expect(enumerate([]).any()).toBe(false);
        });

        it('returns false when there are no items and the predicate is null.', () => {
            expect(enumerate([]).any(null)).toBe(false);
        });

        it('returns true when there is at least one item and the predicate is not defined.', () => {
            expect(e.any()).toBe(true);
        });

        it('returns true when there is at least one item and the predicate is null.', () => {
            expect(e.any(null)).toBe(true);
        });

        it('stops enumerating when the first item that satisfies the predicate is reached.', () => {
            expect(predicates.isLowerCase.calls.any()).toBe(false);

            expect(e.any(predicates.isLowerCase)).toBe(true);
            expect(predicates.isLowerCase.calls.count()).toBe(1);
        });

        it('can receive a chain.', () => {
            expect(e.select(item => item).any(predicates.isUpperCase)).toBe(false);
        });

        it('provides the correct arguments to the predicate.', () => {
            expect(e.any(predicates.hasArguments)).toBe(true);
        });

        it('provides a closed-over context to arrow function predicates.', () => {
            const that = {};
            const op = function () { return e.any(() => this === that); };

            expect(op.bind(that)()).toEqual(true);
        });

        it('provides a global (window) context to loose function predicates.', () => {
            expect(e.any(function () { return this === global; })).toBe(true);
         });
    });

    describe('The select method', () => {
        let items;
        let e;

        const selectors = {
            formatArguments: (item, index, context) => `${item} ${index + 1} ${context === items}`,
            pad: item => ` ${item} `,
            toUpperCase: item => item.toUpperCase()
        };

        beforeAll(() => {
            spyOn(selectors, 'toUpperCase').and.callThrough();
        });

        beforeEach(() => {
            items = ['hello', 'world'];
            e = enumerate(items);

            selectors.toUpperCase.calls.reset();
        });

        it('projects items according to the selector.', () => {
            expect(e.select(selectors.toUpperCase).toArray()).toEqual(['HELLO', 'WORLD']);
        });

        it('can be chained.', () => {
            expect(e.select(selectors.toUpperCase).select(selectors.pad).toArray()).toEqual([' HELLO ', ' WORLD ']);
        });

        it('provides the correct arguments to the selector.', () => {
            expect(e.select(selectors.formatArguments).toArray()).toEqual(['hello 1 true', 'world 2 true']);
        });

        it('does not execute its selector until a terminal operation is executed.', () => {
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

        it('provides a closed-over context to arrow function selectors.', () => {
            const that = {};
            const op = function () { return e.select(() => this).toArray(); };

            expect(op.bind(that)()).toEqual([that, that]);
        });

        it('provides a global (window) context to loose function selectors.', () => {
            expect(e.select(function () { return this; }).toArray()).toEqual([global, global]);
         });
    });

    describe('The where method', () => {
        let items;
        let e;

        const predicates = {
            hasArguments: (item, index, context) => is(item).aString && is(index).aNumber && is(context).defined,
            isLowerCase: item => item.toLowerCase() === item,
            isUpperCase: item => item.toUpperCase() === item
        };

        beforeEach(() => {
            items = ['hello', 'WORLD'];
            e = enumerate(items);
        });

        it('filters items according to the predicate.', () => {
            expect(e.where(predicates.isUpperCase).toArray()).toEqual(['WORLD']);
        });

        it('returns an empty array when no items match the predicate.', () => {
            expect(e.where(() => false).toArray()).toEqual([]);
        });

        it('returns a copy of the original array when the predicate is not provided.', () => {
            const expectation = expect(e.where().toArray());

            expectation.toEqual(items);
            expectation.not.toBe(items);
        });

        it('can be chained.', () => {
            expect(e.where(predicates.isLowerCase).where(predicates.isUpperCase).toArray()).toEqual([]);
        });

        it('provides the correct arguments to the predicate.', () => {
            expect(e.where(predicates.hasArguments).toArray()).toEqual(['hello', 'WORLD']);
        });

        it('provides a closed-over context to arrow function predicates.', () => {
            const that = {};
            const op = function () { return e.where(() => this === that).toArray(); };

            expect(op.bind(that)()).toEqual(['hello', 'WORLD']);
        });

        it('provides a global (window) context to loose function predicates.', () => {
            expect(e.where(function () { return this === global; }).toArray()).toEqual(['hello', 'WORLD']);
         });
    });

});
