"use strict";
exports.__esModule = true;
exports.ShiftChange = exports.ShiftResults = exports.ShiftBehaviors = void 0;
var ShiftBehaviors;
(function (ShiftBehaviors) {
    ShiftBehaviors[ShiftBehaviors["SupplyIncrease"] = 0] = "SupplyIncrease";
    ShiftBehaviors[ShiftBehaviors["SupplyDecrease"] = 1] = "SupplyDecrease";
    ShiftBehaviors[ShiftBehaviors["DemandIncrease"] = 2] = "DemandIncrease";
    ShiftBehaviors[ShiftBehaviors["DemandDecrease"] = 3] = "DemandDecrease";
    ShiftBehaviors[ShiftBehaviors["DoubleDemandDecreaseSupplyDecrease"] = 4] = "DoubleDemandDecreaseSupplyDecrease";
    ShiftBehaviors[ShiftBehaviors["DoubleDemandDecreaseSupplyIncrease"] = 5] = "DoubleDemandDecreaseSupplyIncrease";
    ShiftBehaviors[ShiftBehaviors["DoubleDemandIncreaseSupplyDecrease"] = 6] = "DoubleDemandIncreaseSupplyDecrease";
    ShiftBehaviors[ShiftBehaviors["DoubleDemandIncreaseSupplyIncrease"] = 7] = "DoubleDemandIncreaseSupplyIncrease";
})(ShiftBehaviors = exports.ShiftBehaviors || (exports.ShiftBehaviors = {}));
var ShiftResults;
(function (ShiftResults) {
    ShiftResults[ShiftResults["QuantityIncrease"] = 0] = "QuantityIncrease";
    ShiftResults[ShiftResults["QuantityDecrease"] = 1] = "QuantityDecrease";
    ShiftResults[ShiftResults["PriceIncrease"] = 2] = "PriceIncrease";
    ShiftResults[ShiftResults["PriceDecrease"] = 3] = "PriceDecrease";
    ShiftResults[ShiftResults["QuantityDecreasePriceUnsure"] = 4] = "QuantityDecreasePriceUnsure";
    ShiftResults[ShiftResults["QuantityUnsurePriceDecrease"] = 5] = "QuantityUnsurePriceDecrease";
    ShiftResults[ShiftResults["QuantityUnsurePrinceIncrease"] = 6] = "QuantityUnsurePrinceIncrease";
    ShiftResults[ShiftResults["QuantityIncreasePriceUnsure"] = 7] = "QuantityIncreasePriceUnsure";
})(ShiftResults = exports.ShiftResults || (exports.ShiftResults = {}));
var ShiftChange;
(function (ShiftChange) {
    ShiftChange[ShiftChange["Increase"] = 0] = "Increase";
    ShiftChange[ShiftChange["Decrease"] = 1] = "Decrease";
})(ShiftChange = exports.ShiftChange || (exports.ShiftChange = {}));
