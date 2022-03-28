import React, { SyntheticEvent, useState } from "react";
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
import { supplyDeterminants, demandDeterminants, emptySubDet, emptyDet } from "./shift-calc/AllDeterminants";
import { ShiftChange } from "./shift-calc/ShiftEnums";

const supplyDetOptions = supplyDeterminants.map((det) => ({
  value: det,
  label: det.shortName,
}));

const demandDetOptions = demandDeterminants.map((det) => ({
  value: det,
  label: det.shortName,
}));

function Graph() {
  const data = [
    {
      name: "Start",
      supply: 0,
      demand: 1000,
    },
    {
      name: "Equilibrium",
      supply: 500,
      demand: 500,
    },
    {
      name: "End",
      supply: 1000,
      demand: 0,
    },
  ];

  return (
    <ResponsiveContainer width="90%" aspect={1.5}>
      <LineChart 
        width={500}
        height={400}
        data={data}
      >
        {/* <CartesianGrid stroke="#f5f5f5" vertical={false}/> */}
        <XAxis dataKey="name" tick={false} label={{ value: "Quantity Q", position: "insideCenter", offset: 0 }} />
        <YAxis tick={false} label={{ value: "Price P", angle: -90, position: "insideCenter" }} />

        <Legend align='center' verticalAlign='top' iconType='rect' />

        <ReferenceLine stroke="black" strokeDasharray="4" segment={[{ x: 'Equilibrium', y: 0 }, { x: 'Equilibrium', y: 500 }]} />
        <ReferenceLine stroke="black" strokeDasharray="4" segment={[{ x: 'Start', y: 500 }, { x: 'Equilibrium', y: 500 }]} />
        <Line type="monotone" dataKey="supply" stroke="#ff6384" dot={false} activeDot={false} strokeWidth={5} />
        <Line type="monotone" dataKey="demand" stroke="#35a2eb" dot={false} activeDot={false} strokeWidth={5} />
        
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
        <FormControlLabel value={ShiftChange.Increase} control={<Radio />} label="Increase" onChange={onChange} />
        <FormControlLabel value={ShiftChange.Decrease} control={<Radio />} label="Decrease" onChange={onChange} />
      </RadioGroup>
    </FormControl>
  );
};

function App() {
  const [selectedSupplyDeterminant, setSelectedSupplyDeterminant] = useState(emptyDet);
  const [selectedDemandDeterminant, setSelectedDemandDeterminant] = useState(emptyDet);

  const [selectedSupplySubDeterminant, setSelectedSupplySubDeterminant] = useState(emptySubDet);
  const [selectedDemandSubDeterminant, setSelectedDemandSubDeterminant] = useState(emptySubDet);

  const [supplyRadioChange, setSupplyRadioChange] = useState("");
  const [demandRadioChange, setDemandRadioChange] = useState("");

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
