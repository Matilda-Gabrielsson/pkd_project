import { ListGraph} from "../lib/graphs";
import { List } from "../lib/list";
import { ProbingHashtable } from "../lib/hashtables";

export type person = {
    name: string
    id: number 
    friend_name: string
    friend_id: number | null
}; 

export type people_graph = {
    connections: Array<List<number>>
    number_of_people: number
}; 


export type group = {
    group: number
}; 

export type group_table = ProbingHashtable<group,person>;
