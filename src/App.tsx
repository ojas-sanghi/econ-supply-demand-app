import React, { useState } from "react";
import "./App.css";
import "chart.js/auto";
import { Line } from "react-chartjs-2";
import faker from "@faker-js/faker";
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

const supplyDetOptions = supplyDeterminants.map((det) => ({
  value: det,
  label: det.shortName,
}));

const demandDetOptions = demandDeterminants.map((det) => ({
  value: det,
  label: det.shortName,
}));

function Chart() {
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Chart.js Line Chart",
      },
    },
  };

  const labels = ["January", "February", "March", "April", "May", "June", "July"];

  const data = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Dataset 2",
        data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return <Line data={data} options={chartOptions} />;
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
const SupplySubDeterminant = ({
  determinant,
  onChange,
  selectedSupplySubDeterminant,
}: {
  determinant: Determinant;
  onChange: (subDeterminantVal: SingleValue<{ value: SubDeterminant; label: string }>) => void;
  selectedSupplySubDeterminant: SubDeterminant;
}) => {
  if (determinant.subDeterminants.length === 0) {
    return (
      <Select
        isDisabled={true}
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
      options={subDetOptions}
      onChange={onChange}
      value={{ value: selectedSupplySubDeterminant, label: selectedSupplySubDeterminant.shortName }}
    />
  );
};

const DemandSubDeterminant = ({
  determinant,
  onChange,
  selectedDemandSubDeterminant,
}: {
  determinant: Determinant;
  onChange: (subDeterminantVal: SingleValue<{ value: SubDeterminant; label: string }>) => void;
  selectedDemandSubDeterminant: SubDeterminant;
}) => {
  if (determinant.subDeterminants.length === 0) {
    return (
      <Select
        isDisabled={true}
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
      options={subDetOptions}
      onChange={onChange}
      value={{ value: selectedDemandSubDeterminant, label: selectedDemandSubDeterminant.shortName }}
    />
  );
};

function DetChangeRadioButtons() {
  return (
    <FormControl>
      <RadioGroup row>
        <FormControlLabel value="ooo  " control={<Radio />} label="None" />
        <FormControlLabel value="female" control={<Radio />} label="Increase" />
        <FormControlLabel value="male" control={<Radio />} label="Decrease" />
      </RadioGroup>
    </FormControl>
  );
}

function App() {
  const [selectedSupplyDeterminant, setSelectedSupplyDeterminant] = useState(emptyDet);
  const [selectedDemandDeterminant, setSelectedDemandDeterminant] = useState(emptyDet);

  const [selectedSupplySubDeterminant, setSelectedSupplySubDeterminant] = useState(emptySubDet);
  const [selectedDemandSubDeterminant, setSelectedDemandSubDeterminant] = useState(emptySubDet);

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

  return (
    <Container maxWidth={false} disableGutters={true}>
      {TopBar()}

      <Grid container direction="row" justifyContent="center" alignItems="center">
        {/* Chart */}
        <Grid item xs={6}>
          {Chart()}
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
              <Select options={supplyDetOptions} onChange={(e) => handleSupplyDeterminantChange(e)} />
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
              <SupplySubDeterminant determinant={selectedSupplyDeterminant} onChange={handleSupplySubDeterminantChange} selectedSupplySubDeterminant={selectedSupplySubDeterminant} />
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
              {DetChangeRadioButtons()}
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
              <Select options={demandDetOptions} onChange={(e) => handleDemandDeterminantChange(e)} />
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
              <DemandSubDeterminant determinant={selectedDemandDeterminant} onChange={handleDemandSubDeterminantChange} selectedDemandSubDeterminant={selectedDemandSubDeterminant} />
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
              {DetChangeRadioButtons()}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
