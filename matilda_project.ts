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
        for (let i = 0; i < len; i = i + 1) { //ändra så att det börjar på 1 likt id's gör OM INTE annan idé
            peoplegraph.adj[arr[i].id] = list(arr[i].friend_id!);
        }
    }
    return peoplegraph;
}