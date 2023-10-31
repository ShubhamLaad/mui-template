import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useEffect, useState } from 'react';
import { DEFAULT_DETAILS_FILTER } from '../../constants/APP';

export function CustomSelect({ options = [], label, name, defaultValue = '' }) {
  const [value, setValue] = useState('');
  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);
  return (
    <FormControl sx={{ width: '100%' }} size="small">
      <InputLabel id={name}>{label}</InputLabel>
      <Select
        labelId={name}
        value={value}
        label={label}
        name={name}
        required={true}
        onChange={(event) => {
          setValue(event.target.value);
        }}
      >
        {!defaultValue && (
          <MenuItem disabled value="">
            Select{' '}
          </MenuItem>
        )}
        {options.map(({ id, label }) => (
          <MenuItem value={id} key={id}>
            {label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export function ControlSelect({ options = [], label, name, value, onChange }) {
  return (
    <FormControl sx={{ width: '100%' }} size="small">
      <InputLabel id={name}>{label}</InputLabel>
      <Select
        labelId={name}
        value={value}
        label={label}
        name={name}
        onChange={onChange}
        field={label}
      >
        <MenuItem value={DEFAULT_DETAILS_FILTER}>All</MenuItem>
        {options.map(({ id, label }) => (
          <MenuItem value={id} key={label}>
            {label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
