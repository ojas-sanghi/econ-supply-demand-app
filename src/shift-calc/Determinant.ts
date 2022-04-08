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
  }
}