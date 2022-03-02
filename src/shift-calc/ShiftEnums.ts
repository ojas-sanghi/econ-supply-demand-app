export enum ShiftBehaviors {
  SupplyIncrease,
  SupplyDecrease,
  DemandIncrease,
  DemandDecrease,

  DoubleDemandDecreaseSupplyDecrease,
  DoubleDemandDecreaseSupplyIncrease,
  DoubleDemandIncreaseSupplyDecrease,
  DoubleDemandIncreaseSupplyIncrease,
}

export enum ShiftResults {
  QuantityUnsure,
  QuantityIncrease,
  QuantityDecrease,
  PriceUnsure,
  PriceIncrease,
  PriceDecrease,
}

export enum ShiftChange {
  Increase,
  Decrease
}