
import { split_group_if_to_big } from "./Tyra_project";
/**
 * 
 * @param groups grupperna
 * @param number_of_groups antal grupper det får vara
 * @param max_group_size maxantal i en grupp
 * @returns rätt antal grupper där alltså folk har shiftats runt
 */
export function divide_if_too_many(groups: number[][], number_of_groups: number, max_group_size: number): number[][] {

    if(groups.length > number_of_groups) {
        const find_small = find_smallest(groups);
        const smallest_group = find_small.group; //the smallest group
        const smallest_group_index: number = find_small.index; //the index of the smallest group

        let groups_new = new Array<Array<number>>(groups.length-1); //gör att det blir en set size på nya arrayen så att den förkortas per körning
        
        //alternativt sätt att göra på
        //let groups_new: number[][] = [];
        /* 
        for (let i = 0; i < groups.length-1; i++) {
            if (i !== smallest_group_index) {
                groups_new.push(groups[i]);
            }
        } */
        //någonting går snett när den första gruppen är den minsta!!!!
        
        for(let i = 0; i < smallest_group_index; i = i + 1) {
            groups_new[i] = groups[i];
        }
        for(let i = smallest_group_index; i < groups_new.length; i = i + 1) { //put the groups in a new array shifting them back
            groups_new[i] = groups[i + 1];
        }

        let merged = false;
        for(let i = 0; i < groups_new.length; i = i + 1) {
            if (groups_new[i].length + smallest_group.length <= max_group_size) {
                //Om man kan lägga den minsta gruppen i en grupp utan att den blir för stor görs det
                //Tänker typ med grupper på en person känns det rimligt
                groups_new[i] = [...groups[i], ...smallest_group];
                merged = true;
                break;          
            }
        }

        if (merged === false) { 
            const new_max_size = Math.ceil(smallest_group.length/2);
            const split_groups = split_group_if_to_big(smallest_group, new_max_size);
            let new_group_array = [...groups_new, ...split_groups];
            groups_new = new_group_array;
        }

        return(divide_if_too_many(groups_new, number_of_groups, max_group_size));
    } else {
        return groups;
    }
}

/**
 * @param groups array av grupper
 * @returns ett par(obs inte par men ja) av ett index och en grupp, den första minsta gruppen av grupperna
 */
export function find_smallest(groups: number[][]) {
    let current_small = groups[0].length;
    let current_small_index: number = 0;

    for(let i = 1; groups[i] !== undefined; i = i + 1) {
        if (current_small > groups[i].length) {
            current_small = groups[i].length;
            current_small_index = i;
        }
    }
    return {index: current_small_index, group: groups[current_small_index]};
}

/*
//tester här för testfilen strular??
let grupper = [[1,2], [3,4,5], [8], [9]];
console.log(find_smallest(grupper));*/
/*
const grn = 4;
const mgs = 3;

const grps = [[1,2,3], [4,5], [6,7,8], [9], [10,11,12]];
console.log(divide_if_too_many(grps, grn, mgs));

const grps2 = [[1,2], [4,5], [6,7,8], [9], [10,11,12], [13]];
console.log(divide_if_too_many(grps2, grn, mgs));

const grps4 = [[1,2], [3,12], [4,5], [6,7], [8,9], [10,11]];
console.log(divide_if_too_many(grps4, grn, mgs));*/