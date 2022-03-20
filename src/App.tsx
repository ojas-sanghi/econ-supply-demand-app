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

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
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
            Test Econ React-MUI App
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
  const [selectedDeterminant, setSelectedDeterminant] = useState(emptyDet);

  function handleDeterminantChange(determinantVal: SingleValue<{ value: Determinant; label: string }>) {
    var det = determinantVal?.value;

    if (det === undefined) {
      throw new TypeError("Determinant change gave an undefined!");
    }

    setSelectedDeterminant(det);
  }

  function handleSubDeterminantChange(subDeterminantVal: SingleValue<{ value: SubDeterminant; label: string }>) {
    console.log(subDeterminantVal);
  }

  const SubDeterminant = ({ determinant }: { determinant: Determinant }) => {
    if (determinant.subDeterminants.length === 0) {
      return <Select isDisabled={true} placeholder="No sub-determinants" />;
    }

    var subDetOptions = determinant.subDeterminants.map((subDet) => ({
      value: subDet,
      label: subDet.shortName,
    }));

    return <Select options={subDetOptions} onChange={handleSubDeterminantChange} />;
  };

  return (
    <Container maxWidth={false} disableGutters={true}>
      {TopBar()}

      <Grid container direction="row" justifyContent="center" alignItems="center">
        {/* Chart */}
        <Grid item xs={6}>
          {Chart()}
        </Grid>

        {/* SUPPLY STUFF */}
        <Grid item xs={6}>

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
              <Select options={supplyDetOptions} onChange={(e) => handleDeterminantChange(e)} />
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
              <SubDeterminant determinant={selectedDeterminant} />
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
          {/*  insert grid etc */}


        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
