import { lg_new, ListGraph, build_array } from "lib/graphs";
import { list, List, length } from "../lib/list";
import { process_input } from "./engla_project";
import { people_graph, person } from "./groupsort";
/*
export type PeopleListGraph = {
    adj: Array<List<person>>, // Lists may not be sorted
    size: number
}*/

export function plg_new(size: number): people_graph {
    return {connections: build_array(size, _ => null), number_of_people: size };
}

/**
 * 
 * @param lst : list of pairs of people, (the people paired with their preferred friend)
 * 
 */
export function make_list_graph(arr: Array<person>): people_graph {
    const len = arr.length;
    let peoplegraph = plg_new(len);

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
            peoplegraph.connections[i] = list(arr[i].id, arr[i].friend_id);
        }
    }
    return peoplegraph;

}


