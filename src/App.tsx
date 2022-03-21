import React, { Component, useState } from "react";
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
  styled,
  Paper,
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

  var selectedSupplySubDeterminant = emptySubDet;
  var selectedDemandSubDeterminant = emptySubDet;

  // Determinant Handlers
  function handleSupplyDeterminantChange(determinantVal: SingleValue<{ value: Determinant; label: string }>) {
    var det = determinantVal?.value;
    if (det === undefined) {
      throw new TypeError("Determinant change gave an undefined!");
    }
    setSelectedSupplyDeterminant(det);
  }
  function handleDemandDeterminantChange(determinantVal: SingleValue<{ value: Determinant; label: string }>) {
    var det = determinantVal?.value;
    if (det === undefined) {
      throw new TypeError("Determinant change gave an undefined!");
    }
    setSelectedDemandDeterminant(det);
  }

  // SubDeterminant Handlers
  function handleSupplySubDeterminantChange(subDeterminantVal: SingleValue<{ value: SubDeterminant; label: string }>) {
    if (subDeterminantVal)
      selectedSupplySubDeterminant = subDeterminantVal.value;
  }
  function handleDemandSubDeterminantChange(subDeterminantVal: SingleValue<{ value: SubDeterminant; label: string }>) {
    if (subDeterminantVal)
      selectedDemandSubDeterminant = subDeterminantVal.value;
  }

  // Both sub determinants
  const SupplySubDeterminant = ({ determinant }: { determinant: Determinant }) => {
    if (determinant.subDeterminants.length === 0) {
      return <Select isDisabled={true} placeholder="No sub-determinants" />;
    }
    var subDetOptions = determinant.subDeterminants.map((subDet) => ({
      value: subDet,
      label: subDet.shortName,
    }));
    return <Select options={subDetOptions} onChange={handleSupplySubDeterminantChange}/>;
  };
  const DemandSubDeterminant = ({ determinant }: { determinant: Determinant }) => {
    if (determinant.subDeterminants.length === 0) {
      return <Select isDisabled={true} placeholder="No sub-determinants" />;
    }

    var subDetOptions = determinant.subDeterminants.map((subDet) => ({
      value: subDet,
      label: subDet.shortName,
    }));

    return <Select options={subDetOptions} onChange={handleDemandSubDeterminantChange} />;
  };


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
          <Typography variant="h5" component="div" gutterBottom>
            Supply
          </Typography>

          {/* Demand Det Row */}
          <Grid container alignItems="center">
            <Grid item xs={3}>
              <Typography variant="subtitle1" gutterBottom component="div">
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
              <Typography variant="subtitle1" gutterBottom component="div">
                Select sub-determinant:
              </Typography>
            </Grid>

            <Grid item sx={{ flexGrow: 1 }}>
              <SupplySubDeterminant determinant={selectedSupplyDeterminant} />
            </Grid>
          </Grid>

          <br />

          {/* Supply Incerase/Decrease Row */}
          <Grid container alignItems="center">
            <Grid item xs={3}>
              <Typography variant="subtitle1" gutterBottom component="div">
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
          <Typography variant="h5" component="div" gutterBottom>
            Demand
          </Typography>

          {/* Demand Det Row */}
          <Grid container alignItems="center">
            <Grid item xs={3}>
              <Typography variant="subtitle1" gutterBottom component="div">
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
              <Typography variant="subtitle1" gutterBottom component="div">
                Select sub-determinant:
              </Typography>
            </Grid>

            <Grid item sx={{ flexGrow: 1 }}>
              <DemandSubDeterminant determinant={selectedDemandDeterminant} />
            </Grid>
          </Grid>

          <br />

          {/* Demand Incerase/Decrease Row */}
          <Grid container alignItems="center">
            <Grid item xs={3}>
              <Typography variant="subtitle1" gutterBottom component="div">
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
