import React, { useState } from "react";
import "./App.css";
import {
  LineChart ,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Legend,
  ReferenceLine,
} from "recharts";
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
import Select, { SingleValue } from "react-select";
import { Determinant, SubDeterminant } from "./shift-calc/Determinant";
import { supplyDeterminants, demandDeterminants, emptySubDet, emptyDet, getBehaviorGivenShifts } from "./shift-calc/AllDeterminants";
import { ShiftChange, ShiftBehaviors } from "./shift-calc/ShiftEnums";

const supplyDetOptions = supplyDeterminants.map((det) => ({
  value: det,
  label: det.shortName,
}));

const demandDetOptions = demandDeterminants.map((det) => ({
  value: det,
  label: det.shortName,
}));

var shiftBehavior: ShiftBehaviors | undefined;

// TODO:
// make sure single shifts work when one is set and the other is set to none
// draw reference lines
// display doubel shifts

const supplyIncreaseLine = <Line connectNulls type="monotone" dataKey="supplyIncrease" stroke="#35234b" dot={false} activeDot={false} strokeWidth={5} />
const supplyDecreaseLine = <Line connectNulls type="monotone" dataKey="supplyDecrease" stroke="#35234b" dot={false} activeDot={false} strokeWidth={5} />
const demandIncreaseLine = <Line connectNulls type="monotone" dataKey="demandIncrease" stroke="#35234b" dot={false} activeDot={false} strokeWidth={5} />
const demandDecreaseLine = <Line connectNulls type="monotone" dataKey="demandDecrease" stroke="#35234b" dot={false} activeDot={false} strokeWidth={5} />

function Graph() {
  const defaultData = [
    {
      x: 0,
      supply: 0,
      demand: 1000,
      supplyDecrease: 250,
      demandDecrease: 750,
    },
    {
      x: 1,
      demandIncrease: 1000,
      supplyIncrease: 0,
    },
    {
      x: 2,
    },
    {
      x: 3,
      supplyDecrease: 1000,
      demandDecrease: 0,
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
    }
  ];

  return (
    <ResponsiveContainer width="90%" aspect={1.5}>
      <LineChart 
        width={500}
        height={400}
        data={defaultData}
      >
        <XAxis dataKey="x" allowDecimals={false} allowDataOverflow={true} domain={[0, 4]} type="number" tickCount={5} tick={false} label={{ value: "Quantity Q", position: "insideCenter", offset: 0 }} />

        <YAxis tick={false} label={{ value: "Price P", angle: -90, position: "insideCenter" }} />

        <Legend align='center' verticalAlign='top' iconType='rect' />

        <ReferenceLine stroke="black" strokeDasharray="4" segment={[{ x: 2, y: 0 }, { x: 2, y: 500 }]} />
        <ReferenceLine stroke="black" strokeDasharray="4" segment={[{ x: 0, y: 500 }, { x: 2, y: 500 }]} />
        <Line connectNulls type="monotone" dataKey="supply" stroke="#ff6384" dot={false} activeDot={false} strokeWidth={5} />
        <Line connectNulls type="monotone" dataKey="demand" stroke="#35a2eb" dot={false} activeDot={false} strokeWidth={5} />

        {shiftBehavior == ShiftBehaviors.SupplyIncrease && (<> {supplyIncreaseLine} </>)}
        {shiftBehavior == ShiftBehaviors.SupplyDecrease && (<> {supplyDecreaseLine} </>)}
        {shiftBehavior == ShiftBehaviors.DemandIncrease && (<> {demandIncreaseLine} </>)}
        {shiftBehavior == ShiftBehaviors.DemandDecrease && (<> {demandDecreaseLine} </>)}

      </LineChart >

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

function App() {
  const [selectedSupplyDeterminant, setSelectedSupplyDeterminant] = useState(emptyDet);
  const [selectedDemandDeterminant, setSelectedDemandDeterminant] = useState(emptyDet);

  const [selectedSupplySubDeterminant, setSelectedSupplySubDeterminant] = useState(emptySubDet);
  const [selectedDemandSubDeterminant, setSelectedDemandSubDeterminant] = useState(emptySubDet);

  const [supplyRadioChange, setSupplyRadioChange] = useState(ShiftChange.None);
  const [demandRadioChange, setDemandRadioChange] = useState(ShiftChange.None);

  shiftBehavior = getBehaviorGivenShifts(selectedSupplyDeterminant, selectedSupplySubDeterminant, selectedDemandDeterminant, selectedDemandSubDeterminant, supplyRadioChange, demandRadioChange);
  console.log(shiftBehavior);
  if (shiftBehavior != undefined)
  {
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
