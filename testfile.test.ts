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

const grps3 = [[1,2,3], [4,5], [6,7,8], [9], [10,11,12], [13]]; //dock detta exemplet orimligt för så många får inte vara anmälda!!
const engrps3 = [[1,2,3], [4,5,9], [6,7,8], [10,11,12]];

const ngrps3 = divide_if_too_many(grps3, grn, mgs);

test('vad händer när grupperna är för stora?', () => {
    expect(engrps3).toStrictEqual(ngrps3);

}); // då skippar den en grupp eftersom det är så den är byggd HOPPSAN

const grps4 = [[1,2], [3,12], [4,5], [6,7], [8,9], [10,11]];
const engrps4 = [[1,2,3]];
const ngrps4 = divide_if_too_many(grps4, grn, mgs);

test('vad händer om alla grupper är lika stora?', () => {
    expect(engrps4).toStrictEqual(ngrps4);
});
//den tar isåfall BORT en grupp i taget tills det är rätt mängs grupper, frågan är vilka input som egentligen blir relevanta för dethär?
//alltså: Kommer den behöva hantera inputs där grupperna blir som i testet ovan. 