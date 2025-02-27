import { person } from "./groupsort";
import * as PromptSync from "prompt-sync";

const prompt: PromptSync.Prompt = PromptSync({ sigint: true });

/**
 * convert input data to an array of people
 * */ 

export function process_input(): Array<person> {
    let option = ("");
    let f_index = 2;
    let index = 1;
    const person_array = [];

    while(option !== "STOP") {
        const name = prompt("Your name: ");
        // om man inte vill lägga till någon?
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
                    index = person_array[i].friend_id;
                }
            }
            // om en person man önkar redan finns som "huvud person" ska vännen få sitt tidigare id
            for(let i = 0; person_array[i] !== undefined; i = i + 1) {
                if(person_array[i].name === friend) {
                    f_index = person_array[i].id;
                }
            }
            // om en persons vän redan är någon anans vän
            for(let i = 0; person_array[i] !== undefined; i = i + 1) {
                if(person_array[i].friend_name === friend) {
                    f_index = person_array[i].friend_id;
                }
            }
 
            const person: person = {
                name: name!,
                id: index, //ska få nåt annat om personen inte finns sen innan  
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
        option = prompt("Write STOP to finish or press ENTER to continue: ")!;
        console.log(" ")
        const big_option = option.toUpperCase();
        option = big_option;
    }

    console.log(person_array);
    return person_array;
}

process_input();