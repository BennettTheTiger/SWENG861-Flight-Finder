import React, { useEffect, useState } from 'react';
import {
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';

import Autocomplete from '@mui/material/Autocomplete';
import {
  LocationOn as PinIcon,
  Search as MagnifierIcon,
} from '@mui/icons-material';
// import { search } from '../api';

// eslint-disable-next-line react/prop-types
function Search({ setValue, label }) {
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState([]);
  useEffect(() => {
    /*
    const { process, cancel } = search(inputValue);
    process((results) => {
      setOptions(results);
    });
    return () => cancel();
    */
    setOptions([]);
  }, [inputValue]);
  return (
    <div>
      <Autocomplete
        autoComplete
        autoHighlight
        freeSolo
        disableClearable
        blurOnSelect
        // clearOnBlur
        options={options}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        onInputChange={(event, newInputValue) => {
          setValue(newInputValue); // here temp
          setInputValue(newInputValue);
        }}
        getOptionLabel={(option) => option.city || ''}
        renderOption={(option) => (
          <Grid container alignItems="center">
            <Grid item>
              <PinIcon />
            </Grid>
            <Grid item xs>
              <span>{option.city}</span>
              <Typography variant="body2" color="textSecondary">
                {option.country}
                {option.state ? `, ${option.state}` : ''}
              </Typography>
            </Grid>
          </Grid>
        )}
        renderInput={(props) => (
          <TextField
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...props}
            placeholder="Search"
            label={label}
            // variant="outlined"
            InputProps={{
              // eslint-disable-next-line react/prop-types
              ...props.InputProps,
              startAdornment: (
                <InputAdornment position="start">
                  <MagnifierIcon />
                </InputAdornment>
              ),
            }}
          />
        )}
      />
    </div>
  );
}
// eslint-disable-next-line import/prefer-default-export
export { Search };
