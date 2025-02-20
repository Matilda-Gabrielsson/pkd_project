import { ListGraph } from "../lib/graphs";

export type person = {
    id: number 
    friend_id: number
}; 

export type pepole_graph = {
    connections: Array<List<number>>
    number_of_pepole: number
}; 

