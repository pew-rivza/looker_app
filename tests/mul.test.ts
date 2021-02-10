// const mul = require('./../src/mul');
import {mul} from "../src/mul";

test('mul 3 * N, N=2..5', () => {
    expect(mul(3, 2)).toBe(6);
    expect(mul(3, 3)).toBe(9);
    expect(mul(3, 4)).toBe(12);
    expect(mul(3, 5)).toBe(15);
});

test('mul 4 * N, N=2..5', () => {
    expect(mul(4, 2)).toBe(8);
    expect(mul(4, 3)).toBe(12);
    expect(mul(4, 4)).toBe(16);
    expect(mul(4, 5)).toBe(20);
});