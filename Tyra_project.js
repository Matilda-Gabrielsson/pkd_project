"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.split_group_if_to_big = split_group_if_to_big;
exports.bfs_groups = bfs_groups;
exports.merge_bfs_groups = merge_bfs_groups;
exports.main_divide_into_groups = main_divide_into_groups;
var graphs_1 = require("../lib/graphs");
var PromptSync = require("prompt-sync");
var divide_if_too_many_1 = require("./divide_if_too_many");
var engla_project_1 = require("./engla_project");
/**
 * Recursively splits a group into smaller subgroups if it
 * exceeds the maximum group size. The function ensures that
 * all resulting groups are of size `max_group_size` or smaller.
 * @param group - An array of numbers representing the IDs of
 *                people in the group.
 * @param max_group_size - The maximum allowed size for each group.
 * @returns An array of arrays, where each inner array represents a
 *          subgroup of at most `max_group_size` members.
 */
function split_group_if_to_big(group, max_group_size) {
    var result = new Array();
    if (group.length <= max_group_size) {
        return [group];
    }
    var mid_first_half_group = Math.floor(group.length / 2);
    var first_half = group.slice(0, mid_first_half_group);
    var second_half = group.slice(mid_first_half_group);
    return __spreadArray(__spreadArray([], split_group_if_to_big(first_half, max_group_size), true), split_group_if_to_big(second_half, max_group_size), true);
}
/**
 * Groups the nodes of a given `pepole_graph` into connected components
 * using BFS - Breath First Search.
 * @param graph - A pepole_graph represneting pepole and there connections.
 * @returns An array of arrays where each inner array represnets represents a
 * BFS-discovered group of connected people.
 */
function bfs_groups(graph) {
    var groups = [];
    var visited = new Set();
    for (var person_id = 0; person_id < graph.size; person_id++) {
        if (!visited.has(person_id)) {
            var bfs_order = (0, graphs_1.lg_bfs_visit_order)(graph, person_id);
            var bfs_group = bfs_order[2];
            groups.push(bfs_group);
            bfs_group.forEach(function (person) { return visited.add(person); });
        }
    }
    return merge_bfs_groups(groups);
}
function merge_bfs_groups(pepole_groups) {
    var groups = [];
    var visited = new Set();
    for (var _i = 0, pepole_groups_1 = pepole_groups; _i < pepole_groups_1.length; _i++) {
        var current_group = pepole_groups_1[_i];
        var is_merged = false;
        var _loop_1 = function (i) {
            if (current_group.some(function (person) { return groups[i].includes(person); })) {
                groups[i] = Array.from(new Set(__spreadArray(__spreadArray([], groups[i], true), current_group, true))); // Slå ihop grupper
                is_merged = true;
                return "break";
            }
        };
        for (var i = 0; i < groups.length; i++) {
            var state_1 = _loop_1(i);
            if (state_1 === "break")
                break;
        }
        // Om ingen befintlig grupp hade en gemensam person, skapa en ny grupp
        if (!is_merged) {
            groups.push(__spreadArray([], current_group, true));
        }
    }
    return groups;
}
/**
 * export function bfs (pepole_array: number[][]): number[][]{
    const groups: number[][] = [];
    const visitied = new Set<number>();
    for (let group_id = 0; group_id < length.pepole_array; group_id++){
        const pepole_in_the_group = pepole_array[group_id]
        for (let person_id = 0; person_id < group_id.length; group_id++){
            if(!visitied.has(person_id))
                for()

        }
        
    }

}
 */
/**
 * @param graph - A pepole_graph represneting pepole and there connections.
 * @param num_groups - The desired number of groups.
 * @returns An array of arrays, where each inner array represents a group.
 *          The length of the outer array is equal to 'num_groups'.
 */
function main_divide_into_groups(graph, num_groups) {
    var BFS_groups = bfs_groups(graph);
    var max_group_size = Math.ceil(graph.size / num_groups);
    var result = [];
    for (var _i = 0, BFS_groups_1 = BFS_groups; _i < BFS_groups_1.length; _i++) {
        var group = BFS_groups_1[_i];
        var split_groups = split_group_if_to_big(group, max_group_size);
        result.push.apply(result, split_groups);
    }
    return result;
}
var exampleGraph = {
    adj: [
        [1, null], // Person 0 är vän med 1
        [0, null], // Person 1 är vän med 2
        [1, null], // Person 2 är vän med 3
        [4, null], // Person 3 är vän med 4
        [5, null], // Person 4 är vän med 5
        [4, null] // Person 5 är vän med 4 
    ],
    size: 6
};
console.log(bfs_groups(exampleGraph));
console.log(main_divide_into_groups(exampleGraph, 3));
console.log((0, graphs_1.lg_bfs_visit_order)(exampleGraph, 0));
console.log((0, graphs_1.lg_bfs_visit_order)(exampleGraph, 2));
console.log(merge_bfs_groups(bfs_groups(exampleGraph)));
function process_input() {
    var _a, _b;
    var option = "";
    var person_array = [];
    var name_to_id = {}; // Mappning av namn → ID
    var applied_names = new Set(); // De som själva ansökt
    var index = 0;
    var temp_applications = [];
    while (option !== "STOP") {
        var name_1 = ((_a = prompt("Your name: ")) === null || _a === void 0 ? void 0 : _a.trim()) || "";
        var friend = ((_b = prompt("Your friend's name: ")) === null || _b === void 0 ? void 0 : _b.trim()) || "";
        if (!name_1 || !friend) {
            console.log("Invalid input. Please enter both your name and your friend's name.");
            continue;
        }
        // Om personen inte redan ansökt, ge dem ett ID 0,1,2,3...
        if (!(name_1 in name_to_id)) {
            name_to_id[name_1] = index++;
            applied_names.add(name_1);
        }
        // Spara ansökan, men vänta med att ge vännen ett ID
        temp_applications.push({ name: name_1, friend_name: friend });
        console.log(" ");
        option = (prompt("Write STOP to quit or press ENTER to continue adding people: ") || "").trim().toUpperCase();
        console.log(" ");
    }
    // Tilldela friend_id i efterhand
    var next_available_id = index; // Börja på nästa lediga index för externa vänner
    for (var _i = 0, temp_applications_1 = temp_applications; _i < temp_applications_1.length; _i++) {
        var app = temp_applications_1[_i];
        var friend_id = void 0;
        if (app.friend_name in name_to_id) {
            friend_id = name_to_id[app.friend_name]; // Om vännen redan har ID, använd det
        }
        else {
            friend_id = next_available_id++; // Annars ge dem nästa lediga ID
            name_to_id[app.friend_name] = friend_id;
        }
        person_array.push({
            name: app.name,
            id: name_to_id[app.name], // Garanterat 0,1,2... n-1 för de som ansökt
            friend_name: app.friend_name,
            friend_id: friend_id
        });
    }
    console.log(person_array);
    return person_array;
}
function make_list_graph(arr) {
    var len = arr.length;
    var peoplegraph = { size: len, adj: Array(len).fill(null) };
    if (len === 0) {
        return peoplegraph;
    }
    var _loop_2 = function (i) {
        var person = arr[i];
        // Om vännen också har ansökt, skapa koppling
        if (arr.some(function (p) { return p.id === person.friend_id; })) {
            peoplegraph.adj[person.id] = [person.friend_id, null];
        }
        else {
            peoplegraph.adj[person.id] = null;
        }
    };
    for (var i = 0; i < len; i++) {
        _loop_2(i);
    }
    return peoplegraph;
}
var prompt = PromptSync({ sigint: true });
function main_loop() {
    console.log(" ");
    console.log("WELCOME TO GROUPSORT");
    console.log(" ");
    var num_groups_string = prompt("How many groups should there be? ");
    var num_groups = parseInt(num_groups_string, 10);
    if (num_groups === null || num_groups < 1) {
        num_groups_string = prompt("How many groups should there be? ");
        num_groups = parseInt(num_groups_string, 10);
    }
    var person_array = process_input();
    var group_graph = make_list_graph(person_array);
    console.log(group_graph);
    var BFS_groups = bfs_groups(group_graph);
    console.log(BFS_groups);
    var max_group_size = Math.ceil(group_graph.size / num_groups);
    var split_group_result = [];
    for (var _i = 0, BFS_groups_2 = BFS_groups; _i < BFS_groups_2.length; _i++) {
        var group = BFS_groups_2[_i];
        var split_groups = split_group_if_to_big(group, max_group_size);
        split_group_result.push.apply(split_group_result, split_groups);
    }
    console.log(split_group_result);
    var divided_groups = (0, divide_if_too_many_1.divide_if_too_many)(split_group_result, max_group_size, num_groups);
    console.log(divided_groups);
    (0, engla_project_1.display_groups)(divided_groups, person_array);
}
main_loop();
