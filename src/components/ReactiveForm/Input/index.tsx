import React, {FC, useEffect, useState} from "react";
import {FormControl, FormControlType, IAbstractInputControlProps, ValidationError} from "../types";
import {ITextFieldProps, TextField} from "../../TextField";
import {ISelectProps, Select} from "../../Select";

type IInputControlProps = (ITextFieldProps | ISelectProps) & Omit<IAbstractInputControlProps, 'onChange'>;

export interface IInputProps {
  className?: string;
  control: FormControl;
  type?: FormControlType;
  onChange?: (field: string, value: string) => void;
}

export const Input: FC<IInputProps & IInputControlProps> = ({
  className = '',
  control,
  type = 'text',
  onChange = () => {},
  ...inputProps
}) => {
  const [value, setValue] = useState(control.value);
  const [touched, setTouched] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [errorMessage, setErrorMessage] = useState<ValidationError>();

  useEffect(() => {
    if (value !== control.value) {
      setValue(control.value);
    }
  }, [control.value, value]);

  useEffect(() => {
    control.refreshHandler = () => {
      setValue(control.value);
      setTouched(control.touched);
      setDisabled(control.disabled);
      setErrorMessage(control.error);
    };
    control.refreshHandler();
  }, [control]);

  const handleChange = (newValue) => {
    control.patch(newValue);
    control.validate();

    setValue(newValue);
    onChange(control.name, newValue);
  };

  if (type === 'select') {
    return (
      <Select
        {...inputProps}
        name={control.name}
        value={value}
        placeholder={inputProps.placeholder as string}
        options={(inputProps as ISelectProps).options}
        disabled={disabled}
        error={touched && !disabled && Boolean(errorMessage)}
        helperText={touched && !disabled ? errorMessage : ''}
        onBlur={() => control.markAsTouched()}
        onChange={handleChange}
      />
    );
  }

  return (
    <TextField
      {...inputProps}
      name={control.name}
      type={type}
      value={value}
      placeholder={inputProps.placeholder as string}
      readonly={control.readonly}
      disabled={disabled}
      error={touched && !disabled && Boolean(errorMessage)}
      helperText={touched && !disabled ? errorMessage : ''}
      onBlur={() => control.markAsTouched()}
      onChange={handleChange}
    />
  );
};
