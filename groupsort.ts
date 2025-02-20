import { ListGraph} from "../lib/graphs";
import { List } from "../lib/list";
import { ProbingHashtable } from "../lib/hashtables";

export type person = {
    id: number 
    friend_id: number
}; 

export type pepole_graph = {
    connections: Array<List<number>>
    number_of_pepole: number
}; 


export type group = {
    group: number
}; 

export type group_table = ProbingHashtable<group,person>;
