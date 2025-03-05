import { lg_new, ListGraph } from "./lib/graphs";
import { list } from "./lib/list";
import { person } from "./groupsort";

/**
 * Makes a ListGraph from array of people
 * @param arr : array of type person
 */
export function make_list_graph(arr: Array<person>): ListGraph {
    const len = arr.length;
    let peoplegraph = lg_new(len);

    if (len === 0) {
        return peoplegraph;
    } else {
        for (let i = 0; i < len; i = i + 1) { 
            if (has_applied(arr[i].friend_id, arr)) {
                peoplegraph.adj[arr[i].id] = list(arr[i].friend_id!);
            } else {
                peoplegraph.adj[arr[i].id] = null;
            }            
        }
    }
    return peoplegraph;
}

/**
 * 
 * @param id the id of a person we want to know whether they have applied
 * @param arr 
 */
function has_applied(person_id: number | null, arr: Array<person>) {
    let applied = false;
    if (person_id === null) {
        return applied;
    }
    for (let i = 0; i < arr.length; i = i + 1) {
        if (arr[i].id === person_id) {
            applied = true;
            break;
        }
    }
    return applied;
}