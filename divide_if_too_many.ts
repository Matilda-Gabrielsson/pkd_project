
/**
 * 
 * @param groups 
 * @param number_of_groups 
 * @returns 
 */

export function divide_if_too_many(groups: number[][], number_of_groups: number, max_group_size: number): number[][] {

    if(groups.length > number_of_groups) {
        const find_small = find_smallest(groups);
        const smallest_group = find_small.group; //the smallest group
        const smallest_group_index: number = find_small.index; //the index of the smallest group
        const groups_new = []

        for(let i = smallest_group_index; i < groups.length; i = i + 1) { //put the groups in a new array shifting them back
            groups_new[i] = groups[i + 1];
        }

        for(let i = 0; i < groups_new.length; i = i + 1) {
            if (groups_new[i].length + smallest_group.length <= max_group_size) {
                groups_new[i] = [...groups[i], ...smallest_group];
                break;
            }   
        }
        return(divide_if_too_many(groups_new, number_of_groups, max_group_size));
    } else {
        return groups;
    }



}


export function find_smallest(groups: number[][]) {
    let current_small = groups[0].length;
    let current_small_index: number = 0;

    for(let i = 1; i <groups.length; i = i + 1) {
        if (current_small > groups[i].length) {
            current_small = groups[i].length;
            current_small_index = i;
        }
    }
    return {index: current_small_index, group: groups[current_small_index]};
}

/**
 * ifall man får in för många grupper, vilken borde man dela på? den minsta?
 * find the smallest group and divide it?
 * 
 * 
 */