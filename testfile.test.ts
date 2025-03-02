import { find_smallest, divide_if_too_many } from "./divide_if_too_many";

let grupper = [[1,2], [3,4,5], [8], [9]];
//console.log(find_smallest(grupper));

test('hittar den minsta gruppen?', () => {
    expect(find_smallest(grupper)).toStrictEqual({group: [8], index: 2})
});

const grn = 4;
const mgs = 3;
const grps = [[1,2,3], [4,5], [6,7,8], [9], [10,11,12]];
const engrps = [[1,2,3], [4,5,9], [6,7,8], [10,11,12]];

const ngrps = divide_if_too_many(grps, grn, mgs);

test('funkar det eller nåååt', () => {
    expect(ngrps).toStrictEqual(engrps);
});

const grps2 = [[1,2], [4,5], [6,7,8], [9], [10,11,12], [13]];
const engrps2 = [[1,2,9], [4,5,13], [6,7,8], [10,11,12]];

const ngrps2 = divide_if_too_many(grps2, grn, mgs);

test('funkar det när den behöver köra ett varv till?', () => {
    expect(ngrps2).toStrictEqual(engrps2);
});