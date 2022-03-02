import {ShiftBehaviors} from './ShiftEnums';
import {ShiftResults} from './ShiftEnums';
import {ShiftChange} from './ShiftEnums';

export class SubDeterminant
{
  shortName: string;
  longName: string;
  change: ShiftChange;

  behavior: ShiftBehaviors;
  results: ShiftResults[];

  constructor(shortName: string, longName: string, change: ShiftChange, behavior: ShiftBehaviors)
  {
    this.shortName = shortName;
    this.longName = longName;
    this.change = change;
    this.behavior = behavior;
    let resultsOrUndefined = getResultsGivenBehavior(behavior);
    if (typeof(resultsOrUndefined) === 'undefined') {
      throw new Error('SubDeterminant constructor: results undefined');
    }
    this.results = resultsOrUndefined;
  }

}

export class Determinant
{
  shortName: string;
  longName: string;
  
  subDeterminants: SubDeterminant[];
  
  change: ShiftChange | undefined;
  behavior: ShiftBehaviors | undefined;
  results: ShiftResults[] | undefined;

  constructor(shortName: string, longName: string, subDeterminants: SubDeterminant[], change?: ShiftChange, behavior?: ShiftBehaviors)
  {
    this.shortName = shortName;
    this.longName = longName;
    this.subDeterminants = subDeterminants;
    this.change = change;
    this.behavior = behavior;
    this.results = getResultsGivenBehavior(behavior);
  }
}

function getResultsGivenBehavior(behavior: ShiftBehaviors | undefined): ShiftResults[] | undefined {
  switch (behavior) {
    case undefined:
      return undefined;
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