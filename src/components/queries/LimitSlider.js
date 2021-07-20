import React from 'react';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 250,
  },
}));

const marks = [
  {
    value: 10,
    label: 10,
  },
  {
    value: 20,
    label: 100,
  },
  {
    value: 30,
    label: "1k",
  },
  {
    value: 40,
    label: "10k",
  },
];

const getScaledValue = (x) => {
  if (x <= 10) {
    return x;
  } else if (x <= 20) {
    return (x - 10) * 10;
  } else if (x <= 30) {
    return (x - 20) * 100;
  } else {
    return (x - 30) * 1000;
  }
}

const getUnscaledValue = (x) => {
  if (x <= 10) {
    return x;
  } else if (x <= 100) {
    return (x / 10)  + 10;
  } else if (x <= 1000) {
    return (x / 100) + 20;
  } else {
    return (x / 1000) + 30;
  }
}

export default function LimitSlider({ value,  onChange, label }) {
  const classes = useStyles();
  
  const sliderValue = getUnscaledValue(value);

  const handleSliderChange = (event, newValue) => {
    onChange(getScaledValue(newValue));
  }

  return (
    <React.Fragment>
      <InputLabel id="limit-input-slider-label" htmlFor="limit-slider">Limit</InputLabel>
      <Slider
        className={classes.root}
        id="limit-slider"
        value={typeof sliderValue === 'number' ? sliderValue : 0}
        min={1}
        step={1}
        max={40}
        defaultValue={10}
        getAriaValueText={getScaledValue}
        valueLabelFormat={getScaledValue}
        valueLabelDisplay="auto"
        onChange={handleSliderChange}
        aria-labelledby="limit-input-slider-label"
        marks={marks}
      />
    </React.Fragment>
  )
}