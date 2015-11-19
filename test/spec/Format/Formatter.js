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
            invariant = await Formatter.invariant;

            [en, fr] = await Promise.all([
                Formatter.fromLocale('en'),
                Formatter.fromLocale('fr')
            ]);

            [enUS, frFR] = await Promise.all([
                Formatter.fromLocale('en-US'),
                Formatter.fromLocale('fr-FR')
            ]);

            resume();
        }();
    });
    /*jshint ignore:end */

    afterAll(() => {
        res.rootPath = rootPath;
    });

    describe('index', () => {
        it('returns a Map containing the expected key and value types', () => {
            expect(Formatter.index).toEqual(jasmine.any(Map));

            for (const [key, value] of Formatter.index) {
                expect(key).toEqual(jasmine.any(String));
                expect(value).toEqual(jasmine.any(Formatter));
            }
        });
    });

    describe('invariant', () => {
        let anotherInvariant;

        /*jshint ignore:start */
        beforeAll(resume => {
            async() => {
                anotherInvariant = await Formatter.invariant;

                resume();
            }();
        });
        /*jshint ignore:end */

        it('returns a Formatter object with the correct language, locale, and region', () => {
            expect(invariant).toEqual(jasmine.any(Formatter));
            expect(invariant.language).toBeNull();
            expect(invariant.locale).toBe('');
            expect(invariant.region).toBeNull();
        });

        it('returns a Formatter object with an empty object culture', () => {
            expect(invariant._culture).toEqual({ });
        });

        it('returns the same Formatter object for each invocation', () => {
            expect(invariant).toBe(anotherInvariant);
        });
    });

    describe('invariantCulture', () => {
        it('throws an abstract member error', () => {
            let error;
            let culture;

            try { culture = Formatter.invariantCulture; }
            catch (ex) { error = ex; }

            expect(error).toEqual(jasmine.objectContaining({ message: Exception.abstractMemberInvocation.message }));
        });
    });

    describe('priorityTypes', () => {
        it('returns an Array of expected types', () => {
            expect(Formatter.priorityTypes).toEqual([]);
        });

        it('returns the same Array on subsequent invocations', () => {
            expect(Formatter.priorityTypes).toBe(Formatter.priorityTypes);
        });
    });

    describe('fromLocale', () => {
        let index;
        let anotherEnUS;
        let anotherFrFR;

        /*jshint ignore:start */
        beforeAll(resume => {
            index = Formatter.index;

            spyOn(index, "has").and.callThrough();
            spyOn(index, "get").and.callThrough();
            spyOn(index, "set").and.callThrough();

            async() => {
                [anotherEnUS, anotherFrFR] = await Promise.all([
                    Formatter.fromLocale('en-US'),
                    Formatter.fromLocale('fr-FR')
                ]);

                resume();
            }();
        });
        /*jshint ignore:end */

        afterAll(() => {
            index.has.calls.reset();
            index.get.calls.reset();
            index.set.calls.reset();
        });

        it('caches Formatter objects by type and locale', () => {
            expect(index.has.calls.count()).toBe(2);
            expect(index.get.calls.count()).toBe(2);
            expect(index.set.calls.count()).toBe(0);

            expect(enUS).toBe(anotherEnUS);
            expect(frFR).toBe(anotherFrFR);
        });

        describe('with an invalid locale', () => { });

        describe('with the "en" locale', () => {
            it('returns a Formatter object with the correct language, locale, and region', () => {
                expect(en.language).toBe('en');
                expect(en.locale).toBe('en');
                expect(en.region).toBeNull();
            });
        });

        describe('with the "en-US" locale', () => {
            it('returns a Formatter object with the correct language, locale, and region', () => {
                expect(enUS.language).toBe('en');
                expect(enUS.locale).toBe('en-US');
                expect(enUS.region).toBe('US');
            });
        });

        describe('with the "fr" locale', () => {
            it('returns a Formatter object with the correct language, locale, and region', () => {
                expect(fr.language).toBe('fr');
                expect(fr.locale).toBe('fr');
                expect(fr.region).toBeNull();
            });
        });

        describe('with the "fr-FR" locale', () => {
            it('returns a Formatter object with the correct language, locale, and region', () => {
                expect(frFR.language).toBe('fr');
                expect(frFR.locale).toBe('fr-FR');
                expect(frFR.region).toBe('FR');
            });
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
        it('returns an empty object for invariant, neutral and region-specific Formatter objects', () => {
            expect(invariant.culture).toEqual({ });
            expect(en.culture).toEqual({ });
            expect(enUS.culture).toEqual({ });
            expect(fr.culture).toEqual({ });
            expect(frFR.culture).toEqual({ });
        });
    });

    describe('initialized', () => { });

    describe('language', () => {
        it('returns the expected value for invariant, neutral and region-specific Formatter objects', () => {
            expect(invariant.language).toBeNull();
            expect(en.language).toBe('en');
            expect(enUS.language).toBe('en');
            expect(fr.language).toBe('fr');
            expect(frFR.language).toBe('fr');
        });
    });

    describe('locale', () => {
        it('returns the expected value for invariant, neutral and region-specific Formatter objects', () => {
            expect(invariant.locale).toBe('');
            expect(en.locale).toBe('en');
            expect(enUS.locale).toBe('en-US');
            expect(fr.locale).toBe('fr');
            expect(frFR.locale).toBe('fr-FR');
        });
    });

    describe('region', () => {
        it('returns the expected value for invariant, neutral and region-specific Formatter objects', () => {
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
