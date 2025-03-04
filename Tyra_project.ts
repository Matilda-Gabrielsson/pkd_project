import { ListGraph, lg_bfs_visit_order} from "../lib/graphs";
import { List } from "../lib/list";
import { ph_empty, ProbingHashtable } from "../lib/hashtables";
import { empty, dequeue, enqueue, is_empty, head, Prio_Queue} from "../prio_queue";
import { Queue } from "../lib/queue_array";


/**
 * A graph in edge lists representation is
 *     an array of lists of target node ids.
 * @param adj - An array where each index represents a person (node), 
 *              and the value is a List of IDs representing they whish 
 *              to connect with. 
 * @param size - the number of pepole (nodes) in the graph 
 * @invariant The length of the outer array is size.
 * @invariant Every target node id is a non-negative number less than size.
 * @invariant None of the target node ids appears twice in the same list.
 */
export type pepole_graph = {
    adj: Array<List<number>>; 
    size: number; 
}; 

/**
 * Recursively splits a group into smaller subgroups if it
 * exceeds the maximum group size. The function ensures that 
 * all resulting groups are of size `max_group_size` or smaller.
 * @param group - An array of numbers representing the IDs of 
 *                people in the group.
 * @param max_group_size - The maximum allowed size for each group.
 * @returns An array of arrays, where each inner array represents a 
 *          subgroup of at most `max_group_size` members.
 */

export function split_group_if_to_big (group: number[], max_group_size: number): number[][]{
    const result: number[][] = new Array(); 
    if (group.length <= max_group_size) {
        return [group]; 
    }
    const mid_first_half_group = Math.floor(group.length / 2); 
    const first_half = group.slice(0, mid_first_half_group); 
    const second_half =group.slice(mid_first_half_group); 

    return [...split_group_if_to_big(first_half, max_group_size), 
            ...split_group_if_to_big(second_half, max_group_size)]; 
}

/**
 * Groups the nodes of a given `pepole_graph` into connected components
 * using BFS - Breath First Search. 
 * @param graph - A pepole_graph represneting pepole and there connections. 
 * @returns An array of arrays where each inner array represnets represents a 
 * BFS-discovered group of connected people.
 */
 
export function bfs_groups(graph: ListGraph): number[][] {
    const groups: number[][] = []; 
    const visited = new Set<number>(); 
    for (let person_id = 0; person_id < graph.size; person_id++) {
        if (!visited.has(person_id)) {
            const bfs_order = lg_bfs_visit_order(graph, person_id);
            const bfs_group = bfs_order[2];  
            groups.push(bfs_group);
            bfs_group.forEach(person => visited.add(person));
        }
    }
    return groups;
}

/**
 * @param graph - A pepole_graph represneting pepole and there connections. 
 * @param num_groups - The desired number of groups.
 * @returns An array of arrays, where each inner array represents a group.
 *          The length of the outer array is equal to 'num_groups'. 
 */
export function main_divide_into_groups(graph: pepole_graph, num_groups: number): number[][] {
    const BFS_groups = bfs_groups(graph); 
    const max_group_size: number = Math.ceil(graph.size / num_groups); 
    const result: number[][] = []; 

    for (let group of BFS_groups) {
        const split_groups = split_group_if_to_big(group, max_group_size); 
        result.push(...split_groups);
    }
    return result; 
}


const exampleGraph: ListGraph = {
    adj: [
        [1, null],               // Person 0 är vän med 1
        [0, null],               // Person 1 är vän med 2
        [3, null],               // Person 2 är vän med 3
        [4, null],               // Person 3 är vän med 4
        [5, null],               // Person 4 är vän med 5
        [4, null]                // Person 5 är vän med 4 
    ],
    size: 6
};

const numGroups = 3;
console.log(bfs_groups(exampleGraph));

console.log(split_group_if_to_big([1,2,3,4,5], 3));
