"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.make_list_graph = make_list_graph;
var graphs_1 = require("./lib/graphs");
var list_1 = require("./lib/list");
/**
 * Makes a ListGraph from array of people
 * @param arr : array of type person
 */
function make_list_graph(arr) {
    var len = arr.length;
    var peoplegraph = (0, graphs_1.lg_new)(len);
    if (len === 0) {
        return peoplegraph;
    }
    else {
        for (var i = 0; i < len; i = i + 1) {
            if (has_applied(arr[i].friend_id, arr)) {
                peoplegraph.adj[arr[i].id] = (0, list_1.list)(arr[i].friend_id);
            }
            else {
                peoplegraph.adj[arr[i].id] = null;
            }
        }
    }
    return peoplegraph;
}
/**
 *
 * @param id the id of a person we want to know whether they have applied
 * @param arr
 */
function has_applied(person_id, arr) {
    var applied = false;
    if (person_id === null) {
        return applied;
    }
    for (var i = 0; i < arr.length; i = i + 1) {
        if (arr[i].id === person_id) {
            applied = true;
            break;
        }
    }
    return applied;
}
