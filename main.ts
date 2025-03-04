import { make_list_graph } from "./matilda_project";
import { divide_if_too_many } from "./divide_if_too_many";
import { process_input, display_groups } from "./engla_project";
import { split_group_if_to_big, bfs_groups } from "./Tyra_project";
import * as PromptSync from "prompt-sync";


const prompt: PromptSync.Prompt = PromptSync({ sigint: true });


function main_loop() {
    //Börjangrej
    const num_groups_string = prompt("How many groups should there be? ");
    const num_groups = parseInt(num_groups_string!, 10);

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