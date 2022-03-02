import {Determinant} from './Determinant';
import {ShiftBehaviors} from './ShiftEnums';


///////////////////////
// SUPPLY DETERMINANTS
///////////////////////

let supplyDeterminants: Determinant[];

let supplyDet1 = new Determinant("Resource price/availability", "Resource price/availability");
supplyDet1.addSubDeterminant("Factor Price", "Factor Price", ShiftBehaviors.SupplyDecrease, ShiftBehaviors.SupplyIncrease);
supplyDet1.addSubDeterminant("Quantity", "Quantity", ShiftBehaviors.SupplyIncrease, ShiftBehaviors.SupplyDecrease);

let supplyDet2 = new Determinant("Govt Actions", "Governent Actions");
supplyDet2.addSubDeterminant("Taxes", "Taxes", ShiftBehaviors.SupplyDecrease, ShiftBehaviors.SupplyIncrease);
supplyDet2.addSubDeterminant("Subsidies", "Subsidies", ShiftBehaviors.SupplyIncrease, ShiftBehaviors.SupplyDecrease);

let supplyDet3 = new Determinant("Productivity/Tech", "Productivity/Tech");
supplyDet3.addSubDeterminant("Productivity/Tech", "Productivity/Tech", ShiftBehaviors.SupplyIncrease, ShiftBehaviors.SupplyDecrease);
supplyDet3.addSubDeterminant("# input/output", "# of input per output", ShiftBehaviors.SupplyDecrease, ShiftBehaviors.SupplyIncrease);

let supplyDet4 = new Determinant("Number of Firms", "Number of Firms", ShiftBehaviors.SupplyIncrease, ShiftBehaviors.SupplyDecrease);

let supplyDet5 = new Determinant("Future price expectations", "Expectations for the future price of the good", ShiftBehaviors.SupplyDecrease, ShiftBehaviors.SupplyIncrease);

let supplyDet6 = new Determinant("Other goods", "Other goods from the same firm", ShiftBehaviors.SupplyDecrease, ShiftBehaviors.SupplyIncrease);

supplyDeterminants = [supplyDet1, supplyDet2, supplyDet3, supplyDet4, supplyDet5, supplyDet6];

console.log(supplyDeterminants);

///////////////////////
// DEMAND DETERMINANTS
///////////////////////

let demandDeterminants: Determinant[];

let demandDet1 = new Determinant("Price of related goods", "Price of related goods");
demandDet1.addSubDeterminant("Complementary", "Complementary Goods", ShiftBehaviors.DemandDecrease, ShiftBehaviors.DemandIncrease);
demandDet1.addSubDeterminant("Substitute", "Substitute Goods", ShiftBehaviors.DemandIncrease, ShiftBehaviors.DemandDecrease);

let demandDet2 = new Determinant("Income", "Income");
demandDet2.addSubDeterminant("Normal good", "Normal good", ShiftBehaviors.DemandIncrease, ShiftBehaviors.DemandDecrease);
demandDet2.addSubDeterminant("Inferior good", "Inferior good", ShiftBehaviors.DemandDecrease, ShiftBehaviors.DemandIncrease);

let demandDet3 = new Determinant("# of Consumers", "# of Consumers", ShiftBehaviors.DemandIncrease, ShiftBehaviors.DemandDecrease);

let demandDet4 = new Determinant("Future price expectations", "Expectations for the future price of the good", ShiftBehaviors.DemandIncrease, ShiftBehaviors.DemandDecrease);

let demandDet5 = new Determinant("Tastes/preferences", "Tastes/preferences in favor of the good", ShiftBehaviors.DemandIncrease, ShiftBehaviors.DemandDecrease);

demandDeterminants = [demandDet1, demandDet2, demandDet3, demandDet4, demandDet5];

console.log(demandDeterminants);