import React from 'react';
import { FieldProps } from 'formik';
import { TimePicker, TimePickerProps } from '@mui/x-date-pickers/TimePicker';
import { Dayjs } from 'dayjs';

export const TimeSelector: React.FC<FieldProps & TimePickerProps<Dayjs>> = (
  props
) => {
  const { field, label, form, ...rest } = props;

  return (
    <TimePicker
      ampm={false}
      format='HH:mm'
      slotProps={{
        textField: {
          fullWidth: true,
          label: label,
          size: 'medium',
        },
      }}
      {...field}
      {...rest}
      onChange={(value) => {
        form.setFieldValue(field.name, value);
      }}
    />
  );
};
