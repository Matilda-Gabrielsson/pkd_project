"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var matilda_project_1 = require("./matilda_project");
var divide_if_too_many_1 = require("./divide_if_too_many");
var engla_project_1 = require("./engla_project");
var Tyra_project_1 = require("./Tyra_project");
var PromptSync = require("prompt-sync");
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
    var person_array = (0, engla_project_1.process_input)();
    var group_graph = (0, matilda_project_1.make_list_graph)(person_array);
    console.log(group_graph);
    var BFS_groups = (0, Tyra_project_1.bfs_groups)(group_graph);
    console.log(BFS_groups);
    var max_group_size = Math.ceil(group_graph.size / num_groups);
    var split_group_result = [];
    for (var _i = 0, BFS_groups_1 = BFS_groups; _i < BFS_groups_1.length; _i++) {
        var group = BFS_groups_1[_i];
        var split_groups = (0, Tyra_project_1.split_group_if_to_big)(group, max_group_size);
        split_group_result.push.apply(split_group_result, split_groups);
    }
    console.log(split_group_result);
    var divided_groups = (0, divide_if_too_many_1.divide_if_too_many)(split_group_result, max_group_size, num_groups);
    console.log(divided_groups);
    (0, engla_project_1.display_groups)(divided_groups, person_array);
}
main_loop();
