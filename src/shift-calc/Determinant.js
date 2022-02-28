"use strict";
exports.__esModule = true;
exports.Determinant = exports.SubDeterminant = void 0;
var SubDeterminant = /** @class */ (function () {
    function SubDeterminant(shortName, longName, change, behavior, result) {
        this.shortName = shortName;
        this.longName = longName;
        this.change = change;
        this.behavior = behavior;
        this.result = result;
    }
    return SubDeterminant;
}());
exports.SubDeterminant = SubDeterminant;
var Determinant = /** @class */ (function () {
    function Determinant(shortName, longName, subDeterminants, change, behavior, result) {
        this.shortName = shortName;
        this.longName = longName;
        this.subDeterminants = subDeterminants;
        this.change = change;
        this.behavior = behavior;
        this.result = result;
    }
    return Determinant;
}());
exports.Determinant = Determinant;
