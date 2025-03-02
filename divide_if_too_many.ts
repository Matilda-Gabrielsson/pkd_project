
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

        for(let i = 0; i < smallest_group_index; i = i + 1) {
            groups_new[i] = groups[i];
        }
        for(let i = smallest_group_index; i < groups_new.length; i = i + 1) { //put the groups in a new array shifting them back
            groups_new[i] = groups[i + 1];
        }

        for(let i = 0; i < groups_new.length; i = i + 1) {
            if (groups_new[i].length + smallest_group.length <= max_group_size) {
                //Om man kan lägga den minsta gruppen i en grupp utan att den blir för stor görs det
                //Tänker typ med grupper på en person känns det rimligt
                groups_new[i] = [...groups[i], ...smallest_group];
                break;
            }   
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

    for(let i = 1; i <groups.length; i = i + 1) {
        if (current_small > groups[i].length) {
            current_small = groups[i].length;
            current_small_index = i;
        }
    }
    return {index: current_small_index, group: groups[current_small_index]};
}
