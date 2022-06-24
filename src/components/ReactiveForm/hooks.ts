import {useEffect, useMemo, useState} from "react";
import {AbstractControls, FormArray, FormControl, FormGroup, ValidatorFn} from "./types";

export const useForm = <T extends AbstractControls = AbstractControls>(formGroup: T) => {
  const [formData, setFormData] = useState<any>({});
  const form = useMemo<FormGroup<T>>(() => (
    new FormGroup(formGroup, () => setFormData(form.getFormData()))
  ), []);

  useEffect(() => {
    setFormData(form.getFormData());
  }, [form]);

  return [form, formData];
}

export const useFormArray = <T extends (FormControl | FormGroup) = FormControl>(
  controls: T[] = [],
  validators: ValidatorFn[] = [],
) => {
  const [formData, setFormData] = useState<any>([]);
  const form = useMemo<FormArray<T>>(() => (
    new FormArray(controls, validators, () => setFormData(form.getFormData()))
  ), []);

  useEffect(() => {
    setFormData(form.getFormData());
  }, [form]);

  return [form, formData];
}

