import { ListGraph, lg_bfs_visit_order} from "../lib/graphs";
import { List } from "../lib/list";
import { ph_empty, ProbingHashtable } from "../lib/hashtables";
import { empty, dequeue, enqueue, is_empty, head, Prio_Queue} from "../prio_queue";
import { Queue } from "../lib/queue_array";



// List of indvide and requested friend, size: how many pepole

export type pepole_graph = {
    adj: Array<List<number>>; 
    size: number; 
}; 

export function empty_groups (num_groups: number): number[][]{
    return Array.from({length: num_groups}, () => []); 
}


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

export function add_person_to_group(groups: number[][], group_index: number, person_id: number): void {
    groups[group_index].push(person_id);
}

export function bfs(graph: pepole_graph, start_person: number, visited: Set<number>, groups: number[][],group_index:number): void {
    const bfs_order = lg_bfs_visit_order(graph, start_person) as unknown as Prio_Queue<number>;
    while (!is_empty(bfs_order)) {
        const current_person = head(bfs_order);
        dequeue(bfs_order);
        add_person_to_group(groups, group_index, current_person);
        visited.add(current_person); 
    }
}

export function main_divide_into_groups (graph: pepole_graph, num_groups: number): number[][]{
    const groups = empty_groups(num_groups); 
    const visited = new Set<number>; 
    let group_index = 0; 
    for (let person = 0; person < graph.size; person++){
        if(!visited.has(person)){
            bfs(graph, person, visited, groups, group_index);
            group_index = (group_index + 1) % num_groups;
        }
    }
    const max_group_size = Math.ceil(graph.size / num_groups);
    const result: number[][] = [];
    for (const group of groups) {
        const sub_groups = split_group_if_to_big(group, max_group_size);
        result.push(...sub_groups);
    }
    return result; 
}


const exampleGraph: ListGraph = {
    adj: [
        [1, null],               // Person 0 är vän med 1
        [2, null],               // Person 1 är vän med 2
        [3, null],               // Person 2 är vän med 3
        [4, null],               // Person 3 är vän med 4
        [5, null],               // Person 4 är vän med 5
        [4, null]                // Person 5 är vän med 4 
    ],
    size: 6
};

const numGroups = 3;
console.log(main_divide_into_groups(exampleGraph, numGroups));