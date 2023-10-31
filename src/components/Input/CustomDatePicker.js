import { TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { useState } from 'react';

export function CustomDateTimePicker({ label, name, rowData }) {
  return (
    <TextField
      id={name}
      label={label}
      type="date"
      defaultValue={rowData['date']}
      sx={{ width: '100%' }}
      InputLabelProps={{
        shrink: true,
      }}
    />
  );
}

export function CustomDatePicker({ label, name, rowData }) {
  const [value, setValue] = useState(dayjs(rowData['date']));
  const handleChange = (newValue) => {
    setValue(newValue);
  };
  return (
    <DatePicker
      label={label}
      value={value}
      onChange={handleChange}
      renderInput={(params) => (
        <TextField name={name} sx={{ width: '100%' }} {...params} />
      )}
    />
  );
}
