import { person } from "./groupsort";
import * as PromptSync from "prompt-sync";

const prompt: PromptSync.Prompt = PromptSync({ sigint: true });

/**
 * Ask multiple users that want to apply for Group Sort for their name and a friend 
 * every person that applies is given a id. Convert the input data to a person 
 * @returns Array<person> to store every application and their wished friend
 * */ 

export function process_input(): Array<person> {
    let option = ("");
    let f_index = 1;
    let index = 0;
    const person_array = [];

    while(option !== "STOP") {
        const name = prompt("Your name: ");
        const friend = prompt("Your friends name: ");
        let save_index = index;
        let save_f_index = f_index;
        let double_apply: boolean = false;

        //om en person anmäler sig igen
        for(let i = 0; person_array[i] !== undefined; i = i + 1) {
            if(person_array[i].name === name) {
                console.log("You have already applied for GroupSort")
                double_apply = true;
                
            }
        } 
        if(double_apply === false) {
            // om en person redan har tilldelats ett id av någon som önskat dem ska de få det istället
            for(let i = 0; person_array[i] !== undefined; i = i + 1) {
                if(person_array[i].friend_name === name) {
                    index = person_array[i].friend_id!;
                    save_index = save_index - 2;
                }
            }
            // om en person man önkar redan finns som "huvud person" ska vännen få sitt tidigare id
            for(let i = 0; person_array[i] !== undefined; i = i + 1) {
                if(person_array[i].name === friend) {
                    f_index = person_array[i].id;
                    save_f_index = save_f_index - 2;
                }
            }
            // om en persons vän redan är någon anans vän
            for(let i = 0; person_array[i] !== undefined; i = i + 1) {
                if(person_array[i].friend_name === friend) {
                    f_index = person_array[i].friend_id!;
                    save_f_index = save_f_index - 2;
                }
            }
 
            const person: person = {
                name: name!,
                id: index, 
                friend_name: friend!,
                friend_id: f_index 
            };
           
            index = save_index;
            f_index = save_f_index;
            index = index + 2;
            f_index = f_index + 2;

            person_array.push(person);
        }

        console.log(" ")
        option = prompt("Write STOP to quit or press ENTER to continue adding people: ")!;
        console.log(" ")
        const big_option = option.toUpperCase();
        option = big_option;
    }

    console.log(person_array);
    return person_array;
}

/**
 * Convert an array to visual list of names that are stored by id and sorted by array index. 
 * @param group_arr the final groups as an array
 * @param person_array the array of persons
 * @returns display groups and names of members. 
 */

export function display_groups(group_arr : Array<Array<number>>, person_array : Array<person>) {
    for(let i = 0; group_arr[i] !== undefined; i = i + 1) {
        console.log(`GROUP ${[i + 1]}`); 
        for(let j = 0; group_arr[i][j] !== undefined; j = j + 1) {
            
            for(let k = 0; person_array[k] !== undefined; k = k + 1) {
                if(group_arr[i][j] === person_array[k].id) {
                    console.log(person_array[k].name);
                }
            }
        }
        console.log(" ");
    }
}
