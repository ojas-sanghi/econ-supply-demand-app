import {ShiftBehaviors} from './ShiftEnums';
import {ShiftResults} from './ShiftEnums';
import {ShiftChange} from './ShiftEnums';

export class SubDeterminant
{
  shortName: string;
  longName: string;
  change: ShiftChange;

  behavior: ShiftBehaviors;
  result: ShiftResults;

  constructor(shortName: string, longName: string, change: ShiftChange, behavior: ShiftBehaviors, result: ShiftResults)
  {
    this.shortName = shortName;
    this.longName = longName;
    this.change = change;
    this.behavior = behavior;
    this.result = result;
  }

}

export class Determinant
{
  shortName: string;
  longName: string;
  
  subDeterminants: SubDeterminant[];
  
  change: ShiftChange | undefined;
  behavior: ShiftBehaviors | undefined;
  result: ShiftResults | undefined;

  constructor(shortName: string, longName: string, subDeterminants: SubDeterminant[], change?: ShiftChange, behavior?: ShiftBehaviors, result?: ShiftResults)
  {
    this.shortName = shortName;
    this.longName = longName;
    this.subDeterminants = subDeterminants;
    this.change = change;
    this.behavior = behavior;
    this.result = result;
  }
}