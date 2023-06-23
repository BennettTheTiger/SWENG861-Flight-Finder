/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { debounce } from '@mui/material/utils';
import { search } from '../../api';

export default function AirportSearch(props) {
  const { label, handleSelection } = props;
  const [value, setValue] = React.useState(null);
  const [inputValue, setInputValue] = React.useState('');
  const [options, setOptions] = React.useState([]);

  // fires API request
  const fetch = React.useMemo(
    () => debounce((request, callback) => {
      const { process } = search(request.input);
      process(callback);
    }, 800), // keystroke cooldown
    [],
  );

  React.useEffect(() => {
    let active = true;

    if (inputValue === '') {
      setOptions(value ? [value] : []);
      return undefined;
    }

    fetch({ input: inputValue }, (results) => {
      if (active) {
        let newOptions = [];

        if (value) {
          newOptions = [value];
        }

        if (results) {
          newOptions = [...newOptions, ...results.data];
        }

        setOptions(newOptions);
      }
    });

    return () => {
      active = false;
    };
  }, [inputValue, fetch]);

  return (
    <Autocomplete
      getOptionLabel={(option) => `${option.iataCode} - ${option.name}`}
      filterOptions={(x) => x}
      options={options}
      autoComplete
      includeInputInList
      filterSelectedOptions
      value={value}
      noOptionsText="No Airports"
      onChange={(event, newValue) => {
        setOptions(newValue ? [newValue, ...options] : options);
        // setState in app via callback
        handleSelection(newValue?.iataCode);
        setValue(newValue);
      }}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={(params) => (
        <TextField {...params} label={label} fullWidth />
      )}
      renderOption={(renderProps, option) => (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <li {...renderProps}>
          <Grid container alignItems="center">
            <Grid item xs>
              <span>{`${option.iataCode} - ${option.name}`}</span>
              <Typography variant="body2" color="textSecondary">
                {option.detailedName || ''}
              </Typography>
            </Grid>
          </Grid>
        </li>
      )}
    />
  );
}
