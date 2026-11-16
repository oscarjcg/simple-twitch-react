import { updateObject } from './utility';

describe('updateObject', () => {
    it('merges the new properties over the old ones', () => {
        expect(updateObject({ a: 1, b: 2 }, { b: 3, c: 4 })).toEqual({ a: 1, b: 3, c: 4 });
    });

    it('returns a new object and leaves the original untouched', () => {
        const old = { a: 1 };
        const result = updateObject(old, { a: 2 });
        expect(result).not.toBe(old);
        expect(old).toEqual({ a: 1 });
    });
});
