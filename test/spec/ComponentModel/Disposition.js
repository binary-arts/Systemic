import Disposition from 'src/ComponentModel/Disposition';
import Exception from 'src/Runtime/Exception';

describe('ComponentModel.Disposition', () => {

    describe('Constructor', () => {
        it('throws an static class invocation error', () => {
            let error;

            try { new Disposition(); }
            catch (ex) { error = ex; }

            expect(error).toEqual(jasmine.objectContaining({ message: Exception.staticClassConstructorInvocation.message }));
        });
    });

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
