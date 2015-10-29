import enumerate from 'src/Runtime/Enumerate';

/* jshint ignore:start */
const global = typeof global === 'undefined' ? self : global;
/* jshint ignore:end */

describe('Runtime/Enumerate', () => {

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

        it('projects items according to a selector function.', () => {
            expect(e.select(selectors.toUpperCase).toArray()).toEqual(['HELLO', 'WORLD']);
        });

        it('can be chained.', () => {
            expect(e.select(selectors.toUpperCase).select(selectors.pad).toArray()).toEqual([' HELLO ', ' WORLD ']);
        });

        it('provides the correct arguments to the selector function.', () => {
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
            const op = function () {
                return e.select(() => this).toArray();
            };

            expect(op.bind(that)()).toEqual([that, that]);
        });

        it('provides a global (window) context to loose function selectors.', () => {
            expect(e.select(function () { return this; }).toArray()).toEqual([global, global]);
         });
    });

});
