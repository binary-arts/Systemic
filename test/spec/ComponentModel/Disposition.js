import Disposition from 'ComponentModel/Disposition';

describe('ComponentModel/Disposition', () => {

    describe('Properties:', () => {

        describe('Uninitialized', () => {

            it('Is a number with the value of 0.', () => {
                expect(Disposition.Uninitialized).toBe(0);
            });

        });

        describe('Initializing', () => {

            it('Is a number with the value of 0.', () => {
                expect(Disposition.Initializing).toBe(1);
            });

        });

        describe('Live', () => {

            it('Is a number with the value of 0.', () => {
                expect(Disposition.Live).toBe(2);
            });

        });

        describe('Disposing', () => {

            it('Is a number with the value of 0.', () => {
                expect(Disposition.Disposing).toBe(3);
            });

        });

        describe('Disposed', () => {

            it('Is a number with the value of 0.', () => {
                expect(Disposition.Disposed).toBe(4);
            });

        });

    });

});
