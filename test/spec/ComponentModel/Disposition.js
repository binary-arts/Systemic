import Disposition from 'src/ComponentModel/Disposition';

describe('ComponentModel.Disposition', () => {

    describe('Uninitialized', () => {
        it('is the numeric value 0', () => {
            expect(Disposition.Uninitialized).toBe(0);
        });
    });

    describe('Initializing', () => {
        it('is the numeric value 1', () => {
            expect(Disposition.Initializing).toBe(1);
        });
    });

    describe('Live', () => {
        it('is the numeric value 2', () => {
            expect(Disposition.Live).toBe(2);
        });
    });

    describe('Disposing', () => {
        it('is the numeric value 3', () => {
            expect(Disposition.Disposing).toBe(3);
        });
    });

    describe('Disposed', () => {
        it('is the numeric value 4', () => {
            expect(Disposition.Disposed).toBe(4);
        });
    });

});
