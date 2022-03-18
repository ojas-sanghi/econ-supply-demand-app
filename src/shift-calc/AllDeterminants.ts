import {Determinant} from './Determinant';
import {ShiftBehaviors} from './ShiftEnums';


///////////////////////
// SUPPLY DETERMINANTS
///////////////////////

let supplyDeterminants: Determinant[];

let supplyDetR = new Determinant("Resource price/availability", "Resource price/availability");
supplyDetR.addSubDeterminant("Factor Price", "Factor Price", ShiftBehaviors.SupplyDecrease, ShiftBehaviors.SupplyIncrease);
supplyDetR.addSubDeterminant("Quantity", "Quantity", ShiftBehaviors.SupplyIncrease, ShiftBehaviors.SupplyDecrease);

let supplyDetA = new Determinant("Govt Actions", "Government Actions");
supplyDetA.addSubDeterminant("Taxes", "Taxes", ShiftBehaviors.SupplyDecrease, ShiftBehaviors.SupplyIncrease);
supplyDetA.addSubDeterminant("Subsidies", "Subsidies", ShiftBehaviors.SupplyIncrease, ShiftBehaviors.SupplyDecrease);

let supplyDetP = new Determinant("Productivity/Tech", "Productivity/Tech");
supplyDetP.addSubDeterminant("Productivity/Tech", "Productivity/Tech", ShiftBehaviors.SupplyIncrease, ShiftBehaviors.SupplyDecrease);
supplyDetP.addSubDeterminant("# input/output", "# of input per output", ShiftBehaviors.SupplyDecrease, ShiftBehaviors.SupplyIncrease);

let supplyDetN = new Determinant("Number of Firms", "Number of Firms", ShiftBehaviors.SupplyIncrease, ShiftBehaviors.SupplyDecrease);

let supplyDetE = new Determinant("Future price expectations", "Expectations for the future price of the good", ShiftBehaviors.SupplyDecrease, ShiftBehaviors.SupplyIncrease);

let supplyDetO = new Determinant("Other goods", "Other goods from the same firm", ShiftBehaviors.SupplyDecrease, ShiftBehaviors.SupplyIncrease);

supplyDeterminants = [supplyDetR, supplyDetA, supplyDetP, supplyDetN, supplyDetE, supplyDetO];

///////////////////////
// DEMAND DETERMINANTS
///////////////////////

let demandDeterminants: Determinant[];

let demandDetP = new Determinant("Price of related goods", "Price of related goods");
demandDetP.addSubDeterminant("Complementary", "Complementary Goods", ShiftBehaviors.DemandDecrease, ShiftBehaviors.DemandIncrease);
demandDetP.addSubDeterminant("Substitute", "Substitute Goods", ShiftBehaviors.DemandIncrease, ShiftBehaviors.DemandDecrease);

let demandDetI = new Determinant("Income", "Income");
demandDetI.addSubDeterminant("Normal good", "Normal good", ShiftBehaviors.DemandIncrease, ShiftBehaviors.DemandDecrease);
demandDetI.addSubDeterminant("Inferior good", "Inferior good", ShiftBehaviors.DemandDecrease, ShiftBehaviors.DemandIncrease);

let demandDetN = new Determinant("# of Consumers", "# of Consumers", ShiftBehaviors.DemandIncrease, ShiftBehaviors.DemandDecrease);

let demandDetE = new Determinant("Future price expectations", "Expectations for the future price of the good", ShiftBehaviors.DemandIncrease, ShiftBehaviors.DemandDecrease);

let demandDetO = new Determinant("Tastes/preferences", "Tastes/preferences in favor of the good", ShiftBehaviors.DemandIncrease, ShiftBehaviors.DemandDecrease);

demandDeterminants = [demandDetP, demandDetI, demandDetN, demandDetE, demandDetO];

export {supplyDeterminants, demandDeterminants};