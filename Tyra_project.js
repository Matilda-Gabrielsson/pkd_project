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
