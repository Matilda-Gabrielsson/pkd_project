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
exports.divide_if_too_many = divide_if_too_many;
exports.find_smallest = find_smallest;
var Tyra_project_1 = require("./Tyra_project");
/**
 *
 * @param groups grupperna
 * @param number_of_groups antal grupper det får vara
 * @param max_group_size maxantal i en grupp
 * @returns rätt antal grupper där alltså folk har shiftats runt
 */
function divide_if_too_many(groups, number_of_groups, max_group_size) {
    if (groups.length > number_of_groups) {
        var find_small = find_smallest(groups);
        var smallest_group = find_small.group; //the smallest group
        var smallest_group_index = find_small.index; //the index of the smallest group
        var groups_new = new Array(groups.length - 1); //gör att det blir en set size på nya arrayen så att den förkortas per körning
        //alternativt sätt att göra på
        //let groups_new: number[][] = [];
        /*
        for (let i = 0; i < groups.length-1; i++) {
            if (i !== smallest_group_index) {
                groups_new.push(groups[i]);
            }
        }
        */
        for (var i = 0; i < smallest_group_index; i = i + 1) {
            groups_new[i] = groups[i];
        }
        for (var i = smallest_group_index; i < groups_new.length; i = i + 1) { //put the groups in a new array shifting them back
            groups_new[i] = groups[i + 1];
        }
        var merged = false;
        for (var i = 0; i < groups_new.length; i = i + 1) {
            if (groups_new[i].length + smallest_group.length <= max_group_size) {
                //Om man kan lägga den minsta gruppen i en grupp utan att den blir för stor görs det
                //Tänker typ med grupper på en person känns det rimligt
                groups_new[i] = __spreadArray(__spreadArray([], groups[i], true), smallest_group, true);
                merged = true;
                break;
            }
        }
        if (merged === false) {
            var new_max_size = Math.ceil(smallest_group.length / 2);
            var split_groups = (0, Tyra_project_1.split_group_if_to_big)(smallest_group, new_max_size);
            var new_group_array = __spreadArray(__spreadArray([], groups_new, true), split_groups, true);
            groups_new = new_group_array;
        }
        return (divide_if_too_many(groups_new, number_of_groups, max_group_size));
    }
    else {
        return groups;
    }
}
/**
 * @param groups array av grupper
 * @returns ett par(obs inte par men ja) av ett index och en grupp, den första minsta gruppen av grupperna
 */
function find_smallest(groups) {
    var current_small = groups[0].length;
    var current_small_index = 0;
    for (var i = 1; groups[i] !== undefined; i = i + 1) {
        if (current_small > groups[i].length) {
            current_small = groups[i].length;
            current_small_index = i;
        }
    }
    return { index: current_small_index, group: groups[current_small_index] };
}
/*
//tester här för testfilen strular??
let grupper = [[1,2], [3,4,5], [8], [9]];
console.log(find_smallest(grupper));*/
var grn = 4;
var mgs = 3;
/*
const grps = [[1,2,3], [4,5], [6,7,8], [9], [10,11,12]];
console.log(divide_if_too_many(grps, grn, mgs));

const grps2 = [[1,2], [4,5], [6,7,8], [9], [10,11,12], [13]];
console.log(divide_if_too_many(grps2, grn, mgs));*/
var grps4 = [[1, 2], [3, 12], [4, 5], [6, 7], [8, 9], [10, 11]];
console.log(divide_if_too_many(grps4, grn, mgs));
