// src/components/hook-form/RHFTextField.jsx

import PropTypes from 'prop-types';
import { useFormContext, Controller } from 'react-hook-form';
import { TextField } from '@mui/material';

RHFTextField.propTypes = {
  name: PropTypes.string.isRequired,
  helperText: PropTypes.node,
};

export default function RHFTextField({ name, helperText, ...other }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
  {...field}
  fullWidth
  value={field.value ?? ''}
  error={!!error}
  helperText={error?.message || helperText}
  {...other}
/>

      )}
    />
  );
}
