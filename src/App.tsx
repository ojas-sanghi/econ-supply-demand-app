import React, { useState } from "react";
import "./App.css";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Legend, ReferenceLine } from "recharts";
import {
  Box,
  Container,
  AppBar,
  Toolbar,
  Typography,
  Grid,
  Divider,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
} from "@mui/material";
import { red, green, blue } from "@mui/material/colors";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import Select, { SingleValue } from "react-select";
import { Determinant, SubDeterminant } from "./shift-calc/Determinant";
import {
  supplyDeterminants,
  demandDeterminants,
  emptySubDet,
  emptyDet,
  getBehaviorGivenShifts,
  getResultsGivenBehavior,
} from "./shift-calc/AllDeterminants";
import { ShiftChange, ShiftBehaviors, ShiftResults } from "./shift-calc/ShiftEnums";

const supplyDetOptions = supplyDeterminants.map((det) => ({
  value: det,
  label: det.shortName,
}));

const demandDetOptions = demandDeterminants.map((det) => ({
  value: det,
  label: det.shortName,
}));

var shiftBehavior: ShiftBehaviors | undefined;

const supplyIncreaseLine = (
  <>
    <ReferenceLine
      stroke="black"
      strokeDasharray="8"
      strokeWidth={2}
      segment={[
        { x: 2.5, y: 0 },
        { x: 2.5, y: 375 },
      ]}
    />
    <ReferenceLine
      stroke="black"
      strokeDasharray="8"
      strokeWidth={2}
      segment={[
        { x: 0, y: 375 },
        { x: 2.5, y: 375 },
      ]}
    />

    <Line
      connectNulls
      name="supply 2"
      type="monotone"
      dataKey="supplyIncrease"
      stroke="#750000"
      dot={false}
      activeDot={false}
      strokeWidth={5}
    />
  </>
);
const supplyDecreaseLine = (
  <>
    <ReferenceLine
      stroke="black"
      strokeDasharray="8"
      strokeWidth={2}
      segment={[
        { x: 1.5, y: 0 },
        { x: 1.5, y: 625 },
      ]}
    />
    <ReferenceLine
      stroke="black"
      strokeDasharray="8"
      strokeWidth={2}
      segment={[
        { x: 0, y: 625 },
        { x: 1.5, y: 625 },
      ]}
    />

    <Line
      connectNulls
      name="supply 2"
      type="monotone"
      dataKey="supplyDecrease"
      stroke="#750000"
      dot={false}
      activeDot={false}
      strokeWidth={5}
    />
  </>
);
const demandIncreaseLine = (
  <>
    <ReferenceLine
      stroke="black"
      strokeDasharray="8"
      strokeWidth={2}
      segment={[
        { x: 2.5, y: 0 },
        { x: 2.5, y: 625 },
      ]}
    />
    <ReferenceLine
      stroke="black"
      strokeDasharray="8"
      strokeWidth={2}
      segment={[
        { x: 0, y: 625 },
        { x: 2.5, y: 625 },
      ]}
    />

    <Line
      connectNulls
      name="demand 2"
      type="monotone"
      dataKey="demandIncrease"
      stroke="#000080"
      dot={false}
      activeDot={false}
      strokeWidth={5}
    />
  </>
);
const demandDecreaseLine = (
  <>
    <ReferenceLine
      stroke="black"
      strokeDasharray="8"
      strokeWidth={2}
      segment={[
        { x: 1.5, y: 0 },
        { x: 1.5, y: 375 },
      ]}
    />
    <ReferenceLine
      stroke="black"
      strokeDasharray="8"
      strokeWidth={2}
      segment={[
        { x: 0, y: 375 },
        { x: 1.5, y: 375 },
      ]}
    />

    <Line
      connectNulls
      name="demand 2"
      type="monotone"
      dataKey="demandDecrease"
      stroke="#000080"
      dot={false}
      activeDot={false}
      strokeWidth={5}
    />
  </>
);

const doubleDemandDecreaseSupplyDecreaseLine = (
  <>
    <ReferenceLine
      stroke="black"
      strokeDasharray="8"
      strokeWidth={2}
      segment={[
        { x: 1, y: 0 },
        { x: 1, y: 500 },
      ]}
    />
    <ReferenceLine
      stroke="black"
      strokeDasharray="8"
      strokeWidth={2}
      segment={[
        { x: 0, y: 500 },
        { x: 1, y: 500 },
      ]}
    />

    <Line
      connectNulls
      name="supply 2"
      type="monotone"
      dataKey="doubleDemandDecreaseSupplyDecreaseSupply"
      stroke="#BB0000"
      dot={false}
      activeDot={false}
      strokeWidth={5}
    />
    <Line
      connectNulls
      name="demand 2"
      type="monotone"
      dataKey="doubleDemandDecreaseSupplyDecreaseDemand"
      stroke="#000080"
      dot={false}
      activeDot={false}
      strokeWidth={5}
    />
  </>
);
const doubleDemandDecreaseSupplyIncreaseLine = (
  <>
    <ReferenceLine
      stroke="black"
      strokeDasharray="8"
      strokeWidth={2}
      segment={[
        { x: 2, y: 0 },
        { x: 2, y: 250 },
      ]}
    />
    <ReferenceLine
      stroke="black"
      strokeDasharray="8"
      strokeWidth={2}
      segment={[
        { x: 0, y: 250 },
        { x: 2, y: 250 },
      ]}
    />

    <Line
      connectNulls
      name="supply 2"
      type="monotone"
      dataKey="doubleDemandDecreaseSupplyIncreaseSupply"
      stroke="#BB0000"
      dot={false}
      activeDot={false}
      strokeWidth={5}
    />
    <Line
      connectNulls
      name="demand 2"
      type="monotone"
      dataKey="doubleDemandDecreaseSupplyIncreaseDemand"
      stroke="#000080"
      dot={false}
      activeDot={false}
      strokeWidth={5}
    />
  </>
);
const doubleDemandIncreaseSupplyDecreaseLine = (
  <>
    <ReferenceLine
      stroke="black"
      strokeDasharray="8"
      strokeWidth={2}
      segment={[
        { x: 2, y: 0 },
        { x: 2, y: 750 },
      ]}
    />
    <ReferenceLine
      stroke="black"
      strokeDasharray="8"
      strokeWidth={2}
      segment={[
        { x: 0, y: 750 },
        { x: 2, y: 750 },
      ]}
    />
    <Line
      connectNulls
      name="supply 2"
      type="monotone"
      dataKey="doubleDemandIncreaseSupplyDecreaseSupply"
      stroke="#BB0000"
      dot={false}
      activeDot={false}
      strokeWidth={5}
    />
    <Line
      connectNulls
      name="demand 2"
      type="monotone"
      dataKey="doubleDemandIncreaseSupplyDecreaseDemand"
      stroke="#000080"
      dot={false}
      activeDot={false}
      strokeWidth={5}
    />
  </>
);
const doubleDemandIncreaseSupplyIncreaseLine = (
  <>
    <ReferenceLine
      stroke="black"
      strokeDasharray="8"
      strokeWidth={2}
      segment={[
        { x: 2, y: 500 },
        { x: 3.022, y: 500 },
      ]}
    />
    <ReferenceLine
      stroke="black"
      strokeDasharray="8"
      strokeWidth={2}
      segment={[
        { x: 3.022, y: 0 },
        { x: 3.022, y: 500 },
      ]}
    />
    <Line
      connectNulls
      name="supply 2"
      type="monotone"
      dataKey="doubleDemandIncreaseSupplyIncreaseSupply"
      stroke="#BB0000"
      dot={false}
      activeDot={false}
      strokeWidth={5}
    />
    <Line
      connectNulls
      name="demand 2"
      type="monotone"
      dataKey="doubleDemandIncreaseSupplyIncreaseDemand"
      stroke="#000080"
      dot={false}
      activeDot={false}
      strokeWidth={5}
    />
  </>
);

function Graph() {
  const defaultData = [
    {
      x: 0,
      supply: 0,
      demand: 1000,
      supplyDecrease: 250,
      demandDecrease: 750,

      doubleDemandDecreaseSupplyDecreaseDemand: 750,
      doubleDemandDecreaseSupplyDecreaseSupply: 250,

      doubleDemandDecreaseSupplyIncreaseDemand: 750,

      doubleDemandIncreaseSupplyDecreaseSupply: 250,
    },
    {
      x: 1,
      demandIncrease: 1000,
      supplyIncrease: 0,

      doubleDemandDecreaseSupplyDecreaseSupply: 500,

      doubleDemandDecreaseSupplyIncreaseSupply: 0,

      doubleDemandIncreaseSupplyDecreaseDemand: 1000,

      doubleDemandIncreaseSupplyIncreaseDemand: 1000,

      doubleDemandIncreaseSupplyIncreaseSupply: 0,
    },
    {
      x: 2,

      doubleDemandDecreaseSupplyIncreaseSupply: 250,
      doubleDemandDecreaseSupplyIncreaseDemand: 250,

      doubleDemandIncreaseSupplyDecreaseDemand: 750,

      doubleDemandIncreaseSupplyIncreaseDemand: 750,
    },
    {
      x: 3,
      supplyDecrease: 1000,
      demandDecrease: 0,

      doubleDemandDecreaseSupplyDecreaseDemand: 0,
      doubleDemandDecreaseSupplyDecreaseSupply: 1000,

      doubleDemandDecreaseSupplyIncreaseDemand: 0,

      doubleDemandIncreaseSupplyDecreaseSupply: 1000,
    },
    {
      x: 4,
      supply: 1000,
      demand: 0,
    },
    {
      x: 5,
      demandIncrease: 0,
      supplyIncrease: 1000,

      doubleDemandDecreaseSupplyIncreaseSupply: 1000,

      doubleDemandIncreaseSupplyIncreaseSupply: 1000,

      doubleDemandIncreaseSupplyDecreaseDemand: 50,
      doubleDemandIncreaseSupplyIncreaseDemand: 50,
    },
  ];

  return (
    <ResponsiveContainer width="90%" aspect={1.5}>
      <LineChart width={500} height={400} data={defaultData}>
        <XAxis
          dataKey="x"
          allowDecimals={false}
          allowDataOverflow={true}
          domain={[0, 4]}
          type="number"
          tickCount={5}
          tick={false}
          label={{ value: "Quantity Q", position: "insideCenter", offset: 0 }}
        />

        <YAxis tick={false} label={{ value: "Price P", angle: -90, position: "insideCenter" }} />

        <Legend align="center" verticalAlign="top" iconType="rect" />

        <ReferenceLine
          stroke="black"
          strokeDasharray="4"
          segment={[
            { x: 2, y: 0 },
            { x: 2, y: 500 },
          ]}
        />
        <ReferenceLine
          stroke="black"
          strokeDasharray="4"
          segment={[
            { x: 0, y: 500 },
            { x: 2, y: 500 },
          ]}
        />
        <Line
          connectNulls
          type="monotone"
          dataKey="supply"
          stroke="#ff6384"
          dot={false}
          activeDot={false}
          strokeWidth={5}
        />
        <Line
          connectNulls
          type="monotone"
          dataKey="demand"
          stroke="#35a2eb"
          dot={false}
          activeDot={false}
          strokeWidth={5}
        />

        {shiftBehavior == ShiftBehaviors.SupplyIncrease && <> {supplyIncreaseLine} </>}
        {shiftBehavior == ShiftBehaviors.SupplyDecrease && <> {supplyDecreaseLine} </>}
        {shiftBehavior == ShiftBehaviors.DemandIncrease && <> {demandIncreaseLine} </>}
        {shiftBehavior == ShiftBehaviors.DemandDecrease && <> {demandDecreaseLine} </>}

        {shiftBehavior == ShiftBehaviors.DoubleDemandDecreaseSupplyDecrease && (
          <> {doubleDemandDecreaseSupplyDecreaseLine} </>
        )}
        {shiftBehavior == ShiftBehaviors.DoubleDemandDecreaseSupplyIncrease && (
          <> {doubleDemandDecreaseSupplyIncreaseLine} </>
        )}
        {shiftBehavior == ShiftBehaviors.DoubleDemandIncreaseSupplyDecrease && (
          <> {doubleDemandIncreaseSupplyDecreaseLine} </>
        )}
        {shiftBehavior == ShiftBehaviors.DoubleDemandIncreaseSupplyIncrease && (
          <> {doubleDemandIncreaseSupplyIncreaseLine} </>
        )}
      </LineChart>
    </ResponsiveContainer>
  );
}

function TopBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Econ Supply and Demand App
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

// Both sub determinants
const SubDeterminantSelect = ({
  determinant,
  onChange,
  selectedSubDeterminant,
}: {
  determinant: Determinant;
  onChange: (subDeterminantVal: SingleValue<{ value: SubDeterminant; label: string }>) => void;
  selectedSubDeterminant: SubDeterminant;
}) => {
  if (determinant.subDeterminants.length === 0) {
    return (
      <Select
        isDisabled={true}
        isSearchable={false}
        placeholder="No sub-determinants"
        value={{ value: emptySubDet, label: "No sub-determinants" }}
      />
    );
  }

  var subDetOptions = determinant.subDeterminants.map((subDet) => ({
    value: subDet,
    label: subDet.shortName,
  }));

  return (
    <Select
      isSearchable={false}
      options={subDetOptions}
      onChange={onChange}
      value={{ value: selectedSubDeterminant, label: selectedSubDeterminant.shortName }}
    />
  );
};

const DetChangeRadioButtons = ({
  onChange,
}: {
  onChange: (behavior: React.SyntheticEvent<Element, Event>) => void;
}) => {
  return (
    <FormControl>
      <RadioGroup row>
        <FormControlLabel value={ShiftChange.None} control={<Radio />} label="None" onChange={onChange} />
        <FormControlLabel value={ShiftChange.Decrease} control={<Radio />} label="Decrease" onChange={onChange} />
        <FormControlLabel value={ShiftChange.Increase} control={<Radio />} label="Increase" onChange={onChange} />
      </RadioGroup>
    </FormControl>
  );
};

function getPrettyShiftBehavior(shift: ShiftBehaviors | undefined) {
  switch (shift) {
    case ShiftBehaviors.SupplyIncrease:
      return (
        <>
          <p style={{ display: "inline" }}> Supply </p>
          <p style={{ color: "green", display: "inline" }}> Increase </p>
        </>
      );
    case ShiftBehaviors.SupplyDecrease:
      return (
        <>
          <p style={{ display: "inline" }}> Supply </p>
          <p style={{ color: "red", display: "inline" }}> Decrease </p>
        </>
      );
    case ShiftBehaviors.DemandIncrease:
      return (
        <>
          <p style={{ display: "inline" }}> Demand </p>
          <p style={{ color: "green", display: "inline" }}> Increase </p>
        </>
      );
    case ShiftBehaviors.DemandDecrease:
      return (
        <>
          <p style={{ display: "inline" }}> Demand </p>
          <p style={{ color: "red", display: "inline" }}> Decrease </p>
        </>
      );
    case ShiftBehaviors.DoubleDemandDecreaseSupplyDecrease:
      return (
        <>
          <p style={{ display: "inline" }}> Supply </p>
          <p style={{ color: "red", display: "inline" }}> Decrease, </p>
          <p style={{ display: "inline" }}> Demand </p>
          <p style={{ color: "red", display: "inline" }}> Decrease </p>
        </>
      );
    case ShiftBehaviors.DoubleDemandDecreaseSupplyIncrease:
      return (
        <>
          <p style={{ display: "inline" }}> Supply </p>
          <p style={{ color: "green", display: "inline" }}> Increase, </p>
          <p style={{ display: "inline" }}> Demand </p>
          <p style={{ color: "red", display: "inline" }}> Decrease </p>
        </>
      );
    case ShiftBehaviors.DoubleDemandIncreaseSupplyDecrease:
      return (
        <>
          <p style={{ display: "inline" }}> Supply </p>
          <p style={{ color: "red", display: "inline" }}> Decrease, </p>
          <p style={{ display: "inline" }}> Demand </p>
          <p style={{ color: "green", display: "inline" }}> Increase </p>
        </>
      );
    case ShiftBehaviors.DoubleDemandIncreaseSupplyIncrease:
      return (
        <>
          <p style={{ display: "inline" }}> Supply </p>
          <p style={{ color: "green", display: "inline" }}> Increase, </p>
          <p style={{ display: "inline" }}> Demand </p>
          <p style={{ color: "green", display: "inline" }}> Increase </p>
        </>
      );
    default:
      return "None";
  }
}

function getPriceResultIcon(shift: ShiftBehaviors | undefined) {
  if (shift == undefined) return "None";

  var result = getResultsGivenBehavior(shift);
  var realResult = result[0];
  if (realResult == ShiftResults.PriceIncrease) {
    return <ArrowUpwardIcon sx={{ color: green[500], fontSize: 30 }} />;
  } else if (realResult == ShiftResults.PriceDecrease) {
    return <ArrowDownwardIcon sx={{ color: red[500], fontSize: 30 }} />;
  } else if (realResult == ShiftResults.PriceUnsure) {
    return <QuestionMarkIcon sx={{ color: blue[500], fontSize: 30 }} />;
  }

  return "No change";
}

function getQuantityResultIcon(shift: ShiftBehaviors | undefined) {
  if (shift == undefined) return "None";

  var result = getResultsGivenBehavior(shift);
  var realResult = result[1];

  if (realResult == ShiftResults.QuantityIncrease) {
    return <ArrowUpwardIcon sx={{ color: green[500], fontSize: 30 }} />;
  } else if (realResult == ShiftResults.QuantityDecrease) {
    return <ArrowDownwardIcon sx={{ color: red[500], fontSize: 30 }} />;
  } else if (realResult == ShiftResults.QuantityUnsure) {
    return <QuestionMarkIcon sx={{ color: blue[500], fontSize: 30 }} />;
  }

  return "No change";
}

function App() {
  const [selectedSupplyDeterminant, setSelectedSupplyDeterminant] = useState(emptyDet);
  const [selectedDemandDeterminant, setSelectedDemandDeterminant] = useState(emptyDet);

  const [selectedSupplySubDeterminant, setSelectedSupplySubDeterminant] = useState(emptySubDet);
  const [selectedDemandSubDeterminant, setSelectedDemandSubDeterminant] = useState(emptySubDet);

  const [supplyRadioChange, setSupplyRadioChange] = useState(ShiftChange.None);
  const [demandRadioChange, setDemandRadioChange] = useState(ShiftChange.None);

  shiftBehavior = getBehaviorGivenShifts(
    selectedSupplyDeterminant,
    selectedSupplySubDeterminant,
    selectedDemandDeterminant,
    selectedDemandSubDeterminant,
    supplyRadioChange,
    demandRadioChange
  );
  if (shiftBehavior != undefined) {
    console.log(ShiftBehaviors[shiftBehavior]);
  }

  // Determinant Handlers
  function handleSupplyDeterminantChange(determinantVal: SingleValue<{ value: Determinant; label: string }>) {
    var det = determinantVal?.value;
    if (det === undefined) {
      throw new TypeError("Determinant change gave an undefined!");
    }
    setSelectedSupplyDeterminant(det);
    setSelectedSupplySubDeterminant(emptySubDet);
  }
  function handleDemandDeterminantChange(determinantVal: SingleValue<{ value: Determinant; label: string }>) {
    var det = determinantVal?.value;
    if (det === undefined) {
      throw new TypeError("Determinant change gave an undefined!");
    }
    setSelectedDemandDeterminant(det);
    setSelectedDemandSubDeterminant(emptySubDet);
  }

  // Sub determinant handlers
  function handleSupplySubDeterminantChange(subDeterminantVal: SingleValue<{ value: SubDeterminant; label: string }>) {
    if (subDeterminantVal) setSelectedSupplySubDeterminant(subDeterminantVal.value);
  }
  function handleDemandSubDeterminantChange(subDeterminantVal: SingleValue<{ value: SubDeterminant; label: string }>) {
    if (subDeterminantVal) setSelectedDemandSubDeterminant(subDeterminantVal.value);
  }

  // Radio button handlers
  function handleSupplyRadioChange(change: any) {
    setSupplyRadioChange(change.target.value);
  }
  function handleDemandRadioChange(change: any) {
    setDemandRadioChange(change.target.value);
  }

  return (
    <Container maxWidth={false} disableGutters={true}>
      {TopBar()}

      <Grid container direction="row" justifyContent="center" alignItems="center">
        {/* Chart */}
        <Grid item xs={6}>
          <Graph />
          <br />
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="h6" align="right">
                Type of Shift:
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6" align="left">
                {getPrettyShiftBehavior(shiftBehavior)}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6" align="right">
                Price Change:
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6" align="left">
                {getPriceResultIcon(shiftBehavior)}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6" align="right">
                Quantity Change:
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6" align="left">
                {getQuantityResultIcon(shiftBehavior)}
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        {/* Supply & Demand Column */}
        <Grid item xs={6}>
          {/* SUPPLY STUFF */}
          <Typography variant="h5" component="div">
            Supply
          </Typography>

          {/* Demand Det Row */}
          <Grid container alignItems="center">
            <Grid item xs={3}>
              <Typography variant="subtitle1" component="div">
                Select determinant:
              </Typography>
            </Grid>

            <Grid item sx={{ flexGrow: 1 }}>
              <Select
                isSearchable={false}
                options={supplyDetOptions}
                onChange={(e) => handleSupplyDeterminantChange(e)}
              />
            </Grid>
          </Grid>

          <br />

          {/* Supply Sub-Det Row */}
          <Grid container alignItems="center">
            <Grid item xs={3}>
              <Typography variant="subtitle1" component="div">
                Select sub-determinant:
              </Typography>
            </Grid>

            <Grid item sx={{ flexGrow: 1 }}>
              <SubDeterminantSelect
                determinant={selectedSupplyDeterminant}
                onChange={handleSupplySubDeterminantChange}
                selectedSubDeterminant={selectedSupplySubDeterminant}
              />
            </Grid>
          </Grid>

          <br />

          {/* Supply Incerase/Decrease Row */}
          <Grid container alignItems="center">
            <Grid item xs={3}>
              <Typography variant="subtitle1" component="div">
                Select change:
              </Typography>
            </Grid>

            <Grid item sx={{ flexGrow: 1 }}>
              <DetChangeRadioButtons onChange={(e) => handleSupplyRadioChange(e)} />
            </Grid>
          </Grid>

          {/* DIVIDER */}

          <br />
          <Divider />

          {/* DEMAND STUFF */}
          <Typography variant="h5" component="div">
            Demand
          </Typography>

          {/* Demand Det Row */}
          <Grid container alignItems="center">
            <Grid item xs={3}>
              <Typography variant="subtitle1" component="div">
                Select determinant:
              </Typography>
            </Grid>

            <Grid item sx={{ flexGrow: 1 }}>
              <Select
                isSearchable={false}
                options={demandDetOptions}
                onChange={(e) => handleDemandDeterminantChange(e)}
              />
            </Grid>
          </Grid>

          <br />

          {/* Demand Sub-Det Row */}
          <Grid container alignItems="center">
            <Grid item xs={3}>
              <Typography variant="subtitle1" component="div">
                Select sub-determinant:
              </Typography>
            </Grid>

            <Grid item sx={{ flexGrow: 1 }}>
              <SubDeterminantSelect
                determinant={selectedDemandDeterminant}
                onChange={handleDemandSubDeterminantChange}
                selectedSubDeterminant={selectedDemandSubDeterminant}
              />
            </Grid>
          </Grid>

          <br />

          {/* Demand Incerase/Decrease Row */}
          <Grid container alignItems="center">
            <Grid item xs={3}>
              <Typography variant="subtitle1" component="div">
                Select change:
              </Typography>
            </Grid>

            <Grid item sx={{ flexGrow: 1 }}>
              <DetChangeRadioButtons onChange={(e): void => handleDemandRadioChange(e)} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
