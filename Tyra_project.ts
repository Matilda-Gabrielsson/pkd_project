import { ListGraph, lg_bfs_visit_order} from "../lib/graphs";
import { List } from "../lib/list";
import { ph_empty, ProbingHashtable } from "../lib/hashtables";
import { empty, dequeue, enqueue, is_empty, head, Prio_Queue} from "./lib/prio_queue";
import { Queue } from "../lib/queue_array";

import * as PromptSync from "prompt-sync";
import { divide_if_too_many } from "./divide_if_too_many";
import { display_groups } from "./engla_project";

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
    return merge_bfs_groups(groups);
}


export function merge_bfs_groups(pepole_groups: number[][]): number[][] {
    const groups: number[][] = []; 
    const visited = new Set<number>();

    for (const current_group of pepole_groups) {
        let is_merged = false;

        for (let i = 0; i < groups.length; i++) {
            if (current_group.some(person => groups[i].includes(person))) {
                groups[i] = Array.from(new Set([...groups[i], ...current_group])); // Slå ihop grupper
                is_merged = true;
                break; // När vi slår ihop, kan vi gå vidare till nästa grupp
            }
        }

        // Om ingen befintlig grupp hade en gemensam person, skapa en ny grupp
        if (!is_merged) {
            groups.push([...current_group]);
        }
    }

    return groups;
}

/**
 * export function bfs (pepole_array: number[][]): number[][]{
    const groups: number[][] = []; 
    const visitied = new Set<number>();
    for (let group_id = 0; group_id < length.pepole_array; group_id++){
        const pepole_in_the_group = pepole_array[group_id] 
        for (let person_id = 0; person_id < group_id.length; group_id++){
            if(!visitied.has(person_id))
                for()

        }
        
    }

}
 */



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
        [1, null],               // Person 2 är vän med 3
        [4, null],               // Person 3 är vän med 4
        [5, null],               // Person 4 är vän med 5
        [4, null]                // Person 5 är vän med 4 
    ],
    size: 6
};

console.log(bfs_groups(exampleGraph));
console.log(main_divide_into_groups(exampleGraph, 3));
console.log(lg_bfs_visit_order(exampleGraph, 0));
console.log(lg_bfs_visit_order(exampleGraph, 2));

console.log(merge_bfs_groups(bfs_groups(exampleGraph)));






function process_input() {
    let option: string = "";
    let person_array: { name: string, id: number, friend_name: string, friend_id: number }[] = [];
    let name_to_id: Record<string, number> = {}; // Mappning av namn → ID
    let applied_names = new Set<string>(); // De som själva ansökt
    let index = 0;

    let temp_applications: { name: string; friend_name: string }[] = [];

    while (option !== "STOP") {
        let name_1 = prompt("Your name: ")?.trim() || "";
        let friend = prompt("Your friend's name: ")?.trim() || "";

        if (!name_1 || !friend) {
            console.log("Invalid input. Please enter both your name and your friend's name.");
            continue;
        }

        // Om personen inte redan ansökt, ge dem ett ID 0,1,2,3...
        if (!(name_1 in name_to_id)) {
            name_to_id[name_1] = index++;
            applied_names.add(name_1);
        }

        // Spara ansökan, men vänta med att ge vännen ett ID
        temp_applications.push({ name: name_1, friend_name: friend });

        console.log(" ");
        option = (prompt("Write STOP to quit or press ENTER to continue adding people: ") || "").trim().toUpperCase();
        console.log(" ");
    }

    // Tilldela friend_id i efterhand
    let next_available_id = index; // Börja på nästa lediga index för externa vänner
    for (let app of temp_applications) {
        let friend_id: number;

        if (app.friend_name in name_to_id) {
            friend_id = name_to_id[app.friend_name]; // Om vännen redan har ID, använd det
        } else {
            friend_id = next_available_id++; // Annars ge dem nästa lediga ID
            name_to_id[app.friend_name] = friend_id;
        }

        person_array.push({
            name: app.name,
            id: name_to_id[app.name], // Garanterat 0,1,2... n-1 för de som ansökt
            friend_name: app.friend_name,
            friend_id: friend_id
        });
    }

    console.log(person_array);
    return person_array;
}


function make_list_graph(arr: { name: string; id: number; friend_name: string; friend_id: number }[]) {
    let len = arr.length;
    let peoplegraph = { size: len, adj: Array(len).fill(null) };

    if (len === 0) {
        return peoplegraph;
    }

    for (let i = 0; i < len; i++) {
        let person = arr[i];

        // Om vännen också har ansökt, skapa koppling
        if (arr.some(p => p.id === person.friend_id)) {
            peoplegraph.adj[person.id] = [person.friend_id, null];
        } else {
            peoplegraph.adj[person.id] = null;
        }
    }

    return peoplegraph;
}







const prompt: PromptSync.Prompt = PromptSync({ sigint: true });


function main_loop() {
    console.log(" ")
    console.log("WELCOME TO GROUPSORT")
    console.log(" ")

    let num_groups_string = prompt("How many groups should there be? ");
    let num_groups = parseInt(num_groups_string!, 10);

    if(num_groups === null || num_groups < 1) {
        num_groups_string = prompt("How many groups should there be? ");
        num_groups = parseInt(num_groups_string!, 10);
    }

    const person_array = process_input();

    const group_graph = make_list_graph(person_array);
    console.log(group_graph);

    const BFS_groups = bfs_groups(group_graph); 
    console.log(BFS_groups);

    const max_group_size: number = Math.ceil(group_graph.size / num_groups); 
    const split_group_result: number[][] = []; 

    for (let group of BFS_groups) {
        const split_groups = split_group_if_to_big(group, max_group_size); 
        split_group_result.push(...split_groups);
    }
    console.log(split_group_result);

    const divided_groups = divide_if_too_many(split_group_result, max_group_size, num_groups);
    console.log(divided_groups);

    display_groups(divided_groups, person_array);

}

main_loop();