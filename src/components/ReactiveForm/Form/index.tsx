import React, {FC} from "react";
import {FormArray, FormGroup} from "../types";

export interface IFormProps {
  className?: string;
  formGroup: FormGroup | FormArray;
  onSubmit?: (data: any) => void;
  onSubmitCapture?: () => void;
}

export const Form: FC<IFormProps> = ({
  className = '',
  formGroup,
  children,
  onSubmit = () => {},
  onSubmitCapture = () => {},
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();

    onSubmitCapture();

    if (formGroup.validate()) {
      onSubmit(formGroup.getFormData());
    }
  };

  return (
    <form className={className} onSubmit={handleSubmit}>
      {children}
    </form>
  );
};
