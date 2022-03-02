import {Determinant} from './Determinant';
import {SubDeterminant} from './Determinant';
import {ShiftBehaviors} from './ShiftEnums';
import {ShiftChange} from './ShiftEnums';

let sd1s1 = new SubDeterminant("Factor Price", "Factor Price", ShiftBehaviors.SupplyDecrease, ShiftBehaviors.SupplyIncrease);
let sd1s2 = new SubDeterminant("Quantity", "Quantity", ShiftBehaviors.SupplyIncrease, ShiftBehaviors.SupplyDecrease);
let sd1 = new Determinant("Resource price/availability", "Resource price/availability", [sd1s1, sd1s2]);

let sd2s1 = new SubDeterminant("Taxes", "Taxes", ShiftBehaviors.SupplyDecrease, ShiftBehaviors.SupplyIncrease);
let sd2s2 = new SubDeterminant("Subsidies", "Subsidies", ShiftBehaviors.SupplyIncrease, ShiftBehaviors.SupplyDecrease);
let sd2 = new Determinant("Govt Actions", "Governent Actions", [sd2s1, sd2s2]);

let sd3s1 = new SubDeterminant("Productivity/Tech", "Productivity/Tech", ShiftBehaviors.SupplyIncrease, ShiftBehaviors.SupplyDecrease);
let sd3s2 = new SubDeterminant("# input/output", "# of input per output", ShiftBehaviors.SupplyDecrease, ShiftBehaviors.SupplyIncrease);
let sd3 = new Determinant("Productivity/Tech", "Productivity/Tech", [sd3s1, sd3s2]);

let sd4 = new Determinant("Number of Firms", "Number of Firms", [], ShiftBehaviors.SupplyIncrease, ShiftBehaviors.SupplyDecrease)

console.log(sd1);