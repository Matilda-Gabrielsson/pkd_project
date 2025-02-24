import { person } from "./groupsort";
import * as PromptSync from "prompt-sync";

const prompt: PromptSync.Prompt = PromptSync({ sigint: true });

/**
 * convert input data to an array of perople
 * */ 

export function process_input() {
    let option = ("Hello welcome to Groupsort!");
    console.log("");
    let index = 1;
    const person_array = [];
    while(option !== "STOP") {
        const name = prompt("Your name: ");
        const friend = prompt("Your frinds name: ");
        
     // om en person redan har tilldelats ett id av någon som önskat dem ska de få det istället
     // nån if sats?
        const person: person = {
            name: name!,
            id: index, // ändra till nåt smartare
            friend_name: friend!,
            friend_id: index + 1
        };

        index = index + 2;
        person_array.push(person); //sparas själva personen sen om man skulle leta efter all data?
        option = prompt("Write STOP when finished or press enter to continue")!;
        option.toUpperCase;
    }
    console.log(person_array);
}

process_input();