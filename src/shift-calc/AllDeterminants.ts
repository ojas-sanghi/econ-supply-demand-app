import {Determinant} from './Determinant';
import {SubDeterminant} from './Determinant';
import {ShiftBehaviors} from './ShiftEnums';
import {ShiftChange} from './ShiftEnums';

let s1 = new SubDeterminant("Factor Price", "Factor Price", ShiftChange.Increase, ShiftBehaviors.SupplyDecrease);
let s2 = new SubDeterminant("Factor Price", "Factor Price", ShiftChange.Decrease, ShiftBehaviors.SupplyIncrease);
let s3 = new SubDeterminant("Quantity", "Quantity", ShiftChange.Decrease, ShiftBehaviors.SupplyDecrease);
let s4 = new SubDeterminant("Quantity", "Quantity", ShiftChange.Increase, ShiftBehaviors.SupplyIncrease);
let d1 = new Determinant("Resource price/availability", "Resource price/availability", [s1, s2, s3, s4]);

console.log(d1);