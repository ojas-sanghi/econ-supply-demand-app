import {Determinant} from './Determinant';
import {SubDeterminant} from './Determinant';
import {ShiftBehaviors} from './ShiftEnums';
import {ShiftResults} from './ShiftEnums';
import {ShiftChange} from './ShiftEnums';

let s1 = new SubDeterminant("Factor Price", "Factor Price", ShiftChange.Increase, ShiftBehaviors.SupplyDecrease, ShiftResults.PriceIncrease);
let s2 = new SubDeterminant("Factor Price", "Factor Price", ShiftChange.Decrease, ShiftBehaviors.SupplyIncrease, ShiftResults.PriceDecrease);
let s3 = new SubDeterminant("Quantity", "Quantity", ShiftChange.Decrease, ShiftBehaviors.SupplyDecrease, ShiftResults.PriceIncrease);
let s4 = new SubDeterminant("Quantity", "Quantity", ShiftChange.Increase, ShiftBehaviors.SupplyIncrease, ShiftResults.PriceDecrease);
// TODO: if i export the d1 and access it from another file, can i also access the s1, s2, 3,s4 etc?
let d1 = new Determinant("Resource price/availability", "Resource price/availability", [s1, s2, s3, s4]);

console.log(d1);