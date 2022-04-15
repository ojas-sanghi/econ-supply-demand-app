import {Determinant, SubDeterminant} from './Determinant';
import {ShiftBehaviors, ShiftChange, ShiftResults} from './ShiftEnums';


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

///////////////////////
// EMPTY STUFF FOR USE IN APP.TSX
///////////////////////

let emptyDet = new Determinant("", "");
let emptySubDet = new SubDeterminant("", "", ShiftBehaviors.DemandDecrease, ShiftBehaviors.DemandIncrease);

////////////////////////////////////

export function getBehaviorGivenShifts(supplyDet: Determinant, supplySubDet: SubDeterminant, demandDet: Determinant, demandSubDet: SubDeterminant, supplyChange: ShiftChange, demandChange: ShiftChange): ShiftBehaviors | undefined
{
  var isSupplyChange = false;
  var isDemandChange = false;

  var supplyBehavior: ShiftBehaviors | undefined;
  var demandBehavior: ShiftBehaviors | undefined;

  if (supplyDet.shortName != "" && supplyChange != ShiftChange.None)
  {
    isSupplyChange = true;
    if (supplyDet.subDeterminants.length == 0)
    {
      if (supplyChange == ShiftChange.Increase)
      {
        supplyBehavior = supplyDet.increaseBehavior;
      }
      else if (supplyChange == ShiftChange.Decrease)
      {
        supplyBehavior = supplyDet.decreaseBehavior;
      }
      else
      {
        isSupplyChange = false;
      }
    }
    else
    {
      if (supplySubDet.shortName == "") isSupplyChange = false;
      if (supplyChange == ShiftChange.Increase)
      {
        supplyBehavior = supplySubDet.increaseBehavior;
      }
      else if (supplyChange == ShiftChange.Decrease)
      {
        console.log("should be here");
        console.log(ShiftBehaviors[supplySubDet.decreaseBehavior]);
        supplyBehavior = supplySubDet.decreaseBehavior;
      }
      else
      {
        isSupplyChange = false;
      }
    }
  }
  else
  {
    isSupplyChange = false;
  }

  if (demandDet.shortName != ""  && demandChange != ShiftChange.None)
  {
    isDemandChange = true;
    if (demandDet.subDeterminants.length == 0)
    {
      if (demandChange == ShiftChange.Increase)
      {
        demandBehavior = demandDet.increaseBehavior;
      }
      else if (demandChange == ShiftChange.Decrease)
      {
        demandBehavior = demandDet.decreaseBehavior;
      }
      else
      {
        isDemandChange = false;
        demandBehavior = undefined;
      }
    }
    else
    {
      if (demandSubDet.shortName == "") isDemandChange = false;
      if (demandChange == ShiftChange.Increase)
      {
        demandBehavior = demandSubDet.increaseBehavior;
      }
      else if (demandChange == ShiftChange.Decrease)
      {
        demandBehavior = demandSubDet.decreaseBehavior;
      }
      else
      {
        isDemandChange = false;
        demandBehavior = undefined;
      }
    }
  }
  else
  {
    isDemandChange = false;
  }

  if (isSupplyChange && !isDemandChange)
  {
    return supplyBehavior;
  }
  else if (!isSupplyChange && isDemandChange)
  {
    return demandBehavior;
  }
  else
  {
    if (supplyBehavior == ShiftBehaviors.SupplyIncrease && demandBehavior == ShiftBehaviors.DemandIncrease)
    {
      return ShiftBehaviors.DoubleDemandIncreaseSupplyIncrease;
    }
    if (supplyBehavior == ShiftBehaviors.SupplyIncrease && demandBehavior == ShiftBehaviors.DemandDecrease)
    {
      return ShiftBehaviors.DoubleDemandDecreaseSupplyIncrease;
    }

    if (supplyBehavior == ShiftBehaviors.SupplyDecrease && demandBehavior == ShiftBehaviors.DemandIncrease)
    {
      return ShiftBehaviors.DoubleDemandIncreaseSupplyDecrease;
    }
    if (supplyBehavior == ShiftBehaviors.SupplyDecrease && demandBehavior == ShiftBehaviors.DemandDecrease)
    {
      return ShiftBehaviors.DoubleDemandDecreaseSupplyDecrease;
    }
  }

  return undefined;
}


export function getResultsGivenBehavior(behavior: ShiftBehaviors): ShiftResults[] | string {
  switch (behavior) {
    // PUp, QDown
    case ShiftBehaviors.SupplyDecrease:
      return [ShiftResults.PriceIncrease, ShiftResults.QuantityDecrease];
      // PDown, QUp
    case ShiftBehaviors.SupplyIncrease:
      return [ShiftResults.PriceDecrease, ShiftResults.QuantityIncrease];
      // PDown, QDown
    case ShiftBehaviors.DemandDecrease:
      return [ShiftResults.PriceDecrease, ShiftResults.QuantityDecrease];
      // PUp, QUp
    case ShiftBehaviors.DemandIncrease:
      return [ShiftResults.PriceIncrease, ShiftResults.QuantityIncrease];

      // P?, QDown
    case ShiftBehaviors.DoubleDemandDecreaseSupplyDecrease:
      return [ShiftResults.PriceUnsure, ShiftResults.QuantityDecrease];
      // PDown, Q?
    case ShiftBehaviors.DoubleDemandDecreaseSupplyIncrease:
      return [ShiftResults.PriceDecrease, ShiftResults.QuantityUnsure];
      // PUp, Q?
    case ShiftBehaviors.DoubleDemandIncreaseSupplyDecrease:
      return [ShiftResults.PriceIncrease, ShiftResults.QuantityUnsure];
      // P?, QUp
    case ShiftBehaviors.DoubleDemandIncreaseSupplyIncrease:
      return [ShiftResults.PriceUnsure, ShiftResults.QuantityIncrease];
    
    default:
      return "None";
  }
}

export {supplyDeterminants, demandDeterminants, emptyDet, emptySubDet};