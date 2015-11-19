import res from 'src/Runtime/Res';

import Exception from 'src/Runtime/Exception';
import Formatter from 'src/Format/Formatter';

describe('Format.Formatter', () => {
    let rootPath;
    let invariant;
    let en;
    let enUS;
    let fr;
    let frFR;

    /*jshint ignore:start */
    beforeAll(resume => {
        //!!! TODO -> use jasmine spys to mock an accessor property
        rootPath = res.rootPath;
        res.rootPath = 'base/test';

        async() => {
            invariant = new Formatter('');
            await invariant._initialized;

            en = new Formatter('en');
            fr = new Formatter('fr');

            await Promise.all([
                en._initialized,
                fr._initialized
            ]);

            enUS = new Formatter('en-US');
            frFR = new Formatter('fr-FR');

            await Promise.all([
                enUS._initialized,
                frFR._initialized
            ]);

            resume();
        }();
    });
    /*jshint ignore:end */

    afterAll(() => {
        res.rootPath = rootPath;
    });

    describe('invariant', () => {
        it('throws an abstract member error', () => {
            let error;
            let invariant;

            try { invariant = Formatter.invariant; }
            catch (ex) { error = ex; }

            expect(error).toEqual(jasmine.objectContaining({ message: Exception.abstractMemberInvocation.message }));
        });
    });

    describe('_invariantCulture', () => {
        it('returns an empty object', () => {
            expect(Formatter._invariantCulture).toEqual({ });
        });

        it('returns the same value on subsequent invocations', () => {
            expect(Formatter._invariantCulture).toBe(Formatter._invariantCulture);
        });
    });

    describe('_priorityTypes', () => {
        it('throws an abstract member error', () => {
            let error;
            let priorityTypes;

            try { priorityTypes = Formatter._priorityTypes; }
            catch (ex) { error = ex; }

            expect(error).toEqual(jasmine.objectContaining({ message: Exception.abstractMemberInvocation.message }));
        });
    });

    describe('fromLocale', () => {
        it('throws an abstract member error', () => {
            let error;

            try { Formatter.fromLocale(''); }
            catch (ex) { error = ex; }

            expect(error).toEqual(jasmine.objectContaining({ message: Exception.abstractMemberInvocation.message }));
        });
    });

    describe('zeroPad()', () => {
        it('returns a string prefixed with "0" characters and of minLength length', () => {
            expect(Formatter.zeroPad(12345, 10)).toBe('0000012345');
        });

        it('returns an unprefixed string if ref length is equal to minLength', () => {
            expect(Formatter.zeroPad(12345, 5)).toBe('12345');
        });

        it('returns an unprefixed, untruncated string if ref length is greater than minLength', () => {
            expect(Formatter.zeroPad(12345, 3)).toBe('12345');
        });

        it('treats a null ref as a zero-length string', () => {
            expect(Formatter.zeroPad(null, 4)).toBe('0000');
        });

        it('treats a missing ref as a zero-length string', () => {
            expect(Formatter.zeroPad(undefined, 4)).toBe('0000');
        });

        it('treats minLength as 0 if the provided value is negative', () => {
            expect(Formatter.zeroPad(12345, -10)).toBe('12345');
        });
    });

    describe('_culture', () => {
        it('returns the correct value for invariant, neutral and region-specific objects', () => {
            expect(invariant._culture).toBe(Formatter._invariantCulture);
            expect(en._culture).toBe(Formatter._invariantCulture);
            expect(enUS._culture).toBe(Formatter._invariantCulture);
            expect(fr._culture).toBe(Formatter._invariantCulture);
            expect(frFR._culture).toBe(Formatter._invariantCulture);
        });
    });

    describe('_initialized', () => { });

    describe('language', () => {
        it('returns the correct value for invariant, neutral and region-specific objects', () => {
            expect(invariant.language).toBeNull();
            expect(en.language).toBe('en');
            expect(enUS.language).toBe('en');
            expect(fr.language).toBe('fr');
            expect(frFR.language).toBe('fr');
        });
    });

    describe('locale', () => {
        it('returns the correct value for invariant, neutral and region-specific objects', () => {
            expect(invariant.locale).toBe('');
            expect(en.locale).toBe('en');
            expect(enUS.locale).toBe('en-US');
            expect(fr.locale).toBe('fr');
            expect(frFR.locale).toBe('fr-FR');
        });
    });

    describe('region', () => {
        it('returns the correct value for invariant, neutral and region-specific objects', () => {
            expect(invariant.region).toBeNull();
            expect(en.region).toBeNull();
            expect(enUS.region).toBe('US');
            expect(fr.region).toBeNull();
            expect(frFR.region).toBe('FR');
        });
    });

    describe('format()', () => {
        it('throws an abstract member error', () => {
            let error;

            try { invariant.format(); }
            catch (ex) { error = ex; }

            expect(error).toEqual(jasmine.objectContaining({ message: Exception.abstractMemberInvocation.message }));
        });
    });

});
