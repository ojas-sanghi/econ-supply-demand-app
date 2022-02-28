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
  QuantityIncrease,
  QuantityDecrease,
  PriceIncrease,
  PriceDecrease,
  QuantityDecreasePriceUnsure,
  QuantityUnsurePriceDecrease,
  QuantityUnsurePrinceIncrease,
  QuantityIncreasePriceUnsure,
}

export enum ShiftChange {
  Increase,
  Decrease
}