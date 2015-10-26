import Disposition from 'src/ComponentModel/Disposition';

describe('ComponentModel/Disposition', () => {

    describe('The Uninitialized constant', () => {
        it('is the numeric value 0.', () => {
            expect(Disposition.Uninitialized).toBe(0);
        });
    });

    describe('The Initializing constant', () => {
        it('is the numeric value 1.', () => {
            expect(Disposition.Initializing).toBe(1);
        });
    });

    describe('The Live constant', () => {
        it('is the numeric value 2.', () => {
            expect(Disposition.Live).toBe(2);
        });
    });

    describe('The Disposing constant', () => {
        it('is the numeric value 3.', () => {
            expect(Disposition.Disposing).toBe(3);
        });
    });

    describe('The Disposed constant', () => {
        it('is the numeric value 4.', () => {
            expect(Disposition.Disposed).toBe(4);
        });
    });

});
