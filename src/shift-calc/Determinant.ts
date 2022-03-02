import {ShiftBehaviors} from './ShiftEnums';
import {ShiftResults} from './ShiftEnums';

export class SubDeterminant
{
  shortName: string;
  longName: string;

  // when this determinant is increased, what happens?
  increaseBehavior: ShiftBehaviors;
  // when this determinant is decreased, what happens?
  decreaseBehavior: ShiftBehaviors;
  increaseResults: ShiftResults[];
  decreaseResults: ShiftResults[];

  constructor(shortName: string, longName: string, increaseBehavior: ShiftBehaviors, decreaseBehavior: ShiftBehaviors)
  {
    this.shortName = shortName;
    this.longName = longName;

    this.increaseBehavior = increaseBehavior;
    this.decreaseBehavior = decreaseBehavior;
    this.increaseResults = getResultsGivenBehavior(this.increaseBehavior);
    this.decreaseResults = getResultsGivenBehavior(this.decreaseBehavior);
  }

}

export class Determinant
{
  shortName: string;
  longName: string;
  
  subDeterminants: SubDeterminant[];
  
  increaseBehavior: ShiftBehaviors | undefined;
  decreaseBehavior: ShiftBehaviors | undefined;
  increaseResults: ShiftResults[] | undefined;
  decreaseResults: ShiftResults[] | undefined;

  constructor(shortName: string, longName: string, increaseBehavior?: ShiftBehaviors, decreaseBehavior?: ShiftBehaviors)
  {
    this.shortName = shortName;
    this.longName = longName;
    this.subDeterminants = [];

    this.increaseBehavior = increaseBehavior;
    this.decreaseBehavior = decreaseBehavior;
    this.increaseResults = this.increaseBehavior == undefined ? undefined : getResultsGivenBehavior(this.increaseBehavior);
    this.decreaseResults = this.decreaseBehavior == undefined ? undefined : getResultsGivenBehavior(this.decreaseBehavior);
  }

  addSubDeterminant(subShortName: string, subLongName: string, subIncreaseBehavior: ShiftBehaviors, subDecreaseBehavior: ShiftBehaviors)
  {
    let newSubDet = new SubDeterminant(subShortName, subLongName, subIncreaseBehavior, subDecreaseBehavior);
    this.subDeterminants.push(newSubDet);
  }
}

function getResultsGivenBehavior(behavior: ShiftBehaviors): ShiftResults[] {
  switch (behavior) {
    case ShiftBehaviors.SupplyDecrease:
      // PUp, QDown
      return [ShiftResults.PriceIncrease, ShiftResults.QuantityDecrease];
    case ShiftBehaviors.SupplyIncrease:
      // PDown, QUp
      return [ShiftResults.PriceDecrease, ShiftResults.QuantityIncrease];
    case ShiftBehaviors.DemandDecrease:
      // PDown, QDown
      return [ShiftResults.PriceDecrease, ShiftResults.QuantityDecrease];
    case ShiftBehaviors.DemandIncrease:
      // PUp, QUp
      return [ShiftResults.PriceIncrease, ShiftResults.QuantityIncrease];
    case ShiftBehaviors.DoubleDemandDecreaseSupplyDecrease:
      // P?, QDown
      return [ShiftResults.PriceUnsure, ShiftResults.QuantityDecrease];
    case ShiftBehaviors.DoubleDemandDecreaseSupplyIncrease:
      // PDown, Q?
      return [ShiftResults.PriceDecrease, ShiftResults.QuantityUnsure];
    case ShiftBehaviors.DoubleDemandIncreaseSupplyDecrease:
      // PUp, Q?
      return [ShiftResults.PriceIncrease, ShiftResults.QuantityUnsure];
    case ShiftBehaviors.DoubleDemandIncreaseSupplyIncrease:
      // P?, QUp
      return [ShiftResults.PriceUnsure, ShiftResults.QuantityIncrease];
  }
}