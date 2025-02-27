import { lg_new, ListGraph, build_array } from "./lib/graphs";
import { list, List, length } from "./lib/list";
import { process_input } from "./engla_project";
import { people_graph, person } from "./groupsort";

/**
 * 
 * @param arr : array of type person
 * 
 */
export function make_list_graph(arr: Array<person>): ListGraph {
    const len = arr.length;
    let peoplegraph = lg_new(len);

    if (len === 0) {
        return peoplegraph;
    } else {
        for (let i = 0; i < len; i = i + 1) {
            /**
             * behövs det något sätt att veta om ens vän redan är inlagd? Kommer det att skapas hm. 
             * ska noderna vara id's? isf, förstår denna funktion att den ska peka rätt?
             * Ska noderna inte vara id's utan ett index krävs någon sök-algoritm för att veta om ens vän redan finns med för att peka
             * på rätt index. 
             */
            peoplegraph.adj[i] = list(arr[i].id, arr[i].friend_id);
        }
    }
    return peoplegraph;

}


