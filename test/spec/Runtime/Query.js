import query from 'src/Runtime/Query';

describe('Runtime/Query', () => {

    describe('The select method', () => {
        let items;
        let q;

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
            q = query(items);

            selectors.toUpperCase.calls.reset();
        });

        it('projects items according to a selector function.', () => {
            expect(q.select(selectors.toUpperCase).toArray()).toEqual(['HELLO', 'WORLD']);
        });

        it('can be chained.', () => {
            expect(q.select(selectors.toUpperCase).select(selectors.pad).toArray()).toEqual([' HELLO ', ' WORLD ']);
        });

        it('provides the correct arguments to the selector function.', () => {
            expect(q.select(selectors.formatArguments).toArray()).toEqual(['hello 1 true', 'world 2 true']);
        });

        it('does not execute its selector until a terminal operation is executed.', () => {
            expect(selectors.toUpperCase.calls.any()).toBe(false);

            q.select(selectors.toUpperCase);
            expect(selectors.toUpperCase.calls.any()).toBe(false);

            expect(q.toArray()).toEqual(['HELLO', 'WORLD']);
            expect(selectors.toUpperCase.calls.count()).toBe(2);

            items.unshift('howdy');
            expect(selectors.toUpperCase.calls.count()).toBe(2);

            expect(q.toArray()).toEqual(['HOWDY', 'HELLO', 'WORLD']);
            expect(selectors.toUpperCase.calls.count()).toBe(5);
        });

        xit('provides an outer this context to arrow function selectors.', () => { });

        xit('provides a null this context to loose function selectors.', () => { });
    });

});
