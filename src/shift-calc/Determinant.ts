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

  constructor(shortName: string, longName: string, increaseBehavior: ShiftBehaviors, decreaseBehavior: ShiftBehaviors)
  {
    this.shortName = shortName;
    this.longName = longName;

    this.increaseBehavior = increaseBehavior;
    this.decreaseBehavior = decreaseBehavior;
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
  }

  addSubDeterminant(subShortName: string, subLongName: string, subIncreaseBehavior: ShiftBehaviors, subDecreaseBehavior: ShiftBehaviors)
  {
    let newSubDet = new SubDeterminant(subShortName, subLongName, subIncreaseBehavior, subDecreaseBehavior);
    this.subDeterminants.push(newSubDet);
  }
}