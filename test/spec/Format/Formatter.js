import Exception from 'src/Runtime/Exception';
import Formatter from 'src/Format/Formatter';
import Resource from 'src/Resource';

describe('Format.Formatter', () => {
    let invariant;
    let en;
    let enUS;
    let fr;
    let frFR;

    let rootPath;

    beforeAll(() => {
        //!!! TODO -> use jasmine spys to mock an accessor property
        rootPath = Resource.rootPath;
        Resource.rootPath = 'base/test';

        invariant = new Formatter({ name: 'Invariant' }, '');
        en = new Formatter({ name: 'English' }, 'en');
        enUS = new Formatter({ name: 'English (United States)' }, 'en-US');
        fr = new Formatter({ name: 'French' }, 'fr');
        frFR = new Formatter({ name: 'French (France)' }, 'fr-FR');
    });

    afterAll(() => {
        Resource.rootPath = rootPath;
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
        let invariantCulture;
        let enCulture;
        let enUSCulture;
        let frCulture;
        let frFRCulture;

        /*jshint ignore:start */
        beforeAll(resume => {
            async() => {
                [invariantCulture, enCulture, enUSCulture, frCulture, frFRCulture] = await Promise.all([
                    invariant._culture,
                    en._culture,
                    enUS._culture,
                    fr._culture,
                    frFR._culture
                ]);

                resume();
            }();
        });
        /*jshint ignore:end */

        it('returns the correct value for invariant, neutral and region-specific objects', () => {
            expect(invariantCulture.name).toBe('Invariant');
            expect(enCulture.name).toBe('English');
            expect(enUSCulture.name).toBe('English (United States)');
            expect(frCulture.name).toBe('French');
            expect(frFRCulture.name).toBe('French (France)');
        });
    });

    describe('initialized', () => { });

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
