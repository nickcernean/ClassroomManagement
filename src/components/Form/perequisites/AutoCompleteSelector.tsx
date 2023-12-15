import React, { SyntheticEvent } from "react";
import { FieldProps, getIn } from "formik";
import TextField from "@mui/material/TextField";
import Autocomplete, { AutocompleteValue } from "@mui/material/Autocomplete";
import { UseAutocompleteProps } from "@mui/material";
import { Option } from "@/components/Form/Form";

export const AutocompleteSelector: React.FC<
  FieldProps &
    UseAutocompleteProps<Option, true, true, false> & { label: string }
> = (props) => {
  const isTouched = getIn(props.form.touched, props.field.name);
  const errorMessage = getIn(props.form.errors, props.field.name);

  const {
    field,
    multiple,
    label,
    form,
    options,
    disableClearable,
    filterSelectedOptions,
  } = props;

  return (
    <Autocomplete
      multiple={multiple}
      options={options}
      disableClearable={disableClearable}
      filterSelectedOptions={filterSelectedOptions}
      getOptionLabel={(option) => option.label}
      onChange={(_, value) => {
        if (multiple) {
          form.setFieldValue(
            field.name,
            value.map((option) => option.id)
          );
          return;
        }
        // @ts-ignore - no time to find a way to make it dynamic
        form.setFieldValue(field.name, value?.id);
      }}
      renderInput={(params) => (
        <TextField
          label={label}
          error={Boolean(isTouched && errorMessage)}
          helperText={isTouched && errorMessage ? errorMessage : undefined}
          type="search"
          {...params}
        />
      )}
    />
  );
};
