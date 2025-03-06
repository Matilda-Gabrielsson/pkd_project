"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.process_input = process_input;
exports.display_groups = display_groups;
var PromptSync = require("prompt-sync");
var prompt = PromptSync({ sigint: true });
/**
 * Ask multiple users that want to apply for Group Sort for their name and a friend
 * every person that applies is given a id. Convert the input data to a person
 * @returns Array<person> to store every application and their wished friend
 * */
function process_input() {
    var option = ("");
    var f_index = 1;
    var index = 0;
    var person_array = [];
    while (option !== "STOP") {
        var name_1 = prompt("Your name: ");
        var friend = prompt("Your friends name: ");
        var save_index = index;
        var save_f_index = f_index;
        var double_apply = false;
        //om en person anmäler sig igen
        for (var i = 0; person_array[i] !== undefined; i = i + 1) {
            if (person_array[i].name === name_1) {
                console.log("You have already applied for GroupSort");
                double_apply = true;
            }
        }
        if (double_apply === false) {
            // om en person redan har tilldelats ett id av någon som önskat dem ska de få det istället
            for (var i = 0; person_array[i] !== undefined; i = i + 1) {
                if (person_array[i].friend_name === name_1) {
                    index = person_array[i].friend_id;
                    save_index = save_index - 2;
                }
            }
            // om en person man önkar redan finns som "huvud person" ska vännen få sitt tidigare id
            for (var i = 0; person_array[i] !== undefined; i = i + 1) {
                if (person_array[i].name === friend) {
                    f_index = person_array[i].id;
                    save_f_index = save_f_index - 2;
                }
            }
            // om en persons vän redan är någon anans vän
            for (var i = 0; person_array[i] !== undefined; i = i + 1) {
                if (person_array[i].friend_name === friend) {
                    f_index = person_array[i].friend_id;
                    save_f_index = save_f_index - 2;
                }
            }
            var person = {
                name: name_1,
                id: index,
                friend_name: friend,
                friend_id: f_index
            };
            index = save_index;
            f_index = save_f_index;
            index = index + 2;
            f_index = f_index + 2;
            person_array.push(person);
        }
        console.log(" ");
        option = prompt("Write STOP to quit or press ENTER to continue adding people: ");
        console.log(" ");
        var big_option = option.toUpperCase();
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
function display_groups(group_arr, person_array) {
    for (var i = 0; group_arr[i] !== undefined; i = i + 1) {
        console.log("GROUP ".concat([i + 1]));
        for (var j = 0; group_arr[i][j] !== undefined; j = j + 1) {
            for (var k = 0; person_array[k] !== undefined; k = k + 1) {
                if (group_arr[i][j] === person_array[k].id) {
                    console.log(person_array[k].name);
                }
            }
        }
        console.log(" ");
    }
}
