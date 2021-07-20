import React from 'react';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';

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
  const max = 10000;
  const maxUnscaled = 40;
  // const [value, setValue] = useState(10);

  const sliderValue = getUnscaledValue(value);

  const handleSliderChange = (event, newValue) => {
    // console.log('New value: ', newValue, ' Scaled: ', getScale(newValue));
    
    // setValue(newValue);
    onChange(getScaledValue(newValue));
  }

  // const handleInputChange = (event) => {
  //   const targetValue = getScaledValue(event.target.value);
  //   onChange(targetValue === '' ? 1 : Number(targetValue));
  // }

  // const handleBlur = () => {
  //   if (value < 1) {
  //     onChange(1);
  //   } else if (value > max) {
  //     onChange(max);
  //   }
  // }

  const getScale = (x) => {
    console.log('X: ', x, ' Value: ', value);

    // return 100 ** x;

    if (x <= 10) {
      return x * 10;
    } else if (x <= 100) {
      return x * 100;
    } else if (x <= 1000) {
      return x * 1000;
    } else {
      return 1000 ** x;
    }
  }

  // const getStep = (x) => {
  //   console.log('Step: ', x);

  //   if (x <= 100) {
  //     return x;
  //   } else if (x <= 1000) {
  //     return 100;
  //   } else {
  //     return 1000;
  //   }
  // }

  return (
    <div>
      <Typography id="limit-slider" gutterBottom>
        {label}
      </Typography>
      <Grid container spacing={3} alignItems="flex-start">
        <Grid item xs>
          <Slider
            value={typeof sliderValue === 'number' ? sliderValue : 0}
            min={1}
            step={1}
            max={40}
            defaultValue={10}
            getAriaValueText={getScaledValue}
            valueLabelFormat={getScaledValue}
            valueLabelDisplay="on"
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
            marks={marks}
          />
        </Grid>
        {/* <Grid item>
          <Input
            value={sliderValue}
            margin="dense"
            onChange={handleInputChange}
            onBlur={handleBlur}
            inputProps={{
              step: 1,
              min: 1,
              max: {max},
              type: 'number',
              'aria-labelledby': 'input-slider',
            }}
          />
        </Grid> */}
      </Grid>
    </div>
  )
}