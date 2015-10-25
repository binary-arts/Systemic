//TBI: figure out how to get imports working at design-time
import Disposition from 'ComponentModel/Disposition';

describe('ComponentModel/Disposition', () => {

    describe('Properties:', () => {
        describe('Uninitialized', () => {
            it('Is the numeric value 0.', () => {
                expect(Disposition.Uninitialized).toBe(0);
            });
        });

        describe('Initializing', () => {
            it('Is the numeric value 1.', () => {
                expect(Disposition.Initializing).toBe(1);
            });
        });

        describe('Live', () => {
            it('Is the numeric value 2.', () => {
                expect(Disposition.Live).toBe(2);
            });
        });

        describe('Disposing', () => {
            it('Is the numeric value 3.', () => {
                expect(Disposition.Disposing).toBe(3);
            });
        });

        describe('Disposed', () => {
            it('Is the numeric value 4.', () => {
                expect(Disposition.Disposed).toBe(4);
            });
        });
    });

});
