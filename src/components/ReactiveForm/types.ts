import {ReactElement} from "react";

export type FormControlType = 'text' | 'password' | 'number' | 'date' | 'textarea' | 'file' | 'country' | 'switch' | 'select';
export type InputSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type InputDirection = 'horizontal' | 'vertical';
export type InputIconPosition = 'left' | 'right';

export interface IAbstractInputControlProps {
  className?: string;
  name?: string;
  label?: string | ReactElement;
  labelClass?: string;
  labelFloat?: boolean;
  description?: string | ReactElement;
  descriptionClass?: string;
  containerClass?: string;
  inputClass?: string;
  fullWidth?: boolean;
  direction?: InputDirection;
  size?: InputSize;
  icon?: ReactElement;
  iconPosition?: InputIconPosition;
  iconClass?: string;
  required?: boolean;
  readonly?: boolean;
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
  helperTextClass?: string;
  absoluteHelper?: boolean;
  onBlur?: () => void;
  onChange?: (value?: any) => void;
}


export type ValidationError = string | null;
export type ValidatorFn = (value: FormControl) => ValidationError;


export interface IFormControlOptions {
  name?: string;
  disabled?: boolean;
  readonly?: boolean;
}

export class FormControl<T = any> {
  name?: string;
  value?: T;
  disabled?: boolean;
  readonly?: boolean;
  touched: boolean;
  invalid: boolean;
  error?: string;
  validators: ValidatorFn[];
  onUpdate: () => void;

  refreshHandler: () => void;

  constructor(value?: T, validators?: ValidatorFn[], options?: IFormControlOptions) {
    const init = {
      disabled: false,
      readonly: false,
      touched: false,
      invalid: true,
      error: null,
      value,
      validators,
      ...options,
    };

    this.name = init.name;
    this.value = init.value;
    this.disabled = init.disabled;
    this.readonly = init.readonly;
    this.touched = init.touched;
    this.invalid = init.invalid;
    this.error = init.error;
    this.validators = init.validators || [];
    this.onUpdate = () => {};
    this.refreshHandler = () => {};
  }

  markAsTouched(validate = true): void {
    this.touched = true;
    if (validate)
      this.validate();
    this.refreshHandler();
  }

  patch(newValue: T): void {
    if (this.value !== newValue) {
      this.value = newValue;
      this.onUpdate();
      this.refreshHandler();
    }
  }

  reset(newValue?: T): void {
    this.value = newValue;
    this.validate(false);
    this.touched = false;
    this.error = null;
    this.onUpdate();
  }

  disable(disabled = true): void {
    if (this.disabled !== disabled) {
      this.disabled = disabled;
      this.validate(false);
      this.refreshHandler();
    }
  }

  setOptions(options: Partial<IFormControlOptions>) {
    Object.assign(this, options);
    this.validate(false);
  }

  setError(error: ValidationError): void {
    this.error = error;
    this.invalid = Boolean(error);
    this.refreshHandler();
  }

  validate(markAsTouched = true): boolean {
    if (markAsTouched)
      this.markAsTouched(false);
    this.setError(null);

    if (this.disabled || !this.validators)
      return true;

    for (const validator of this.validators) {
      const error = validator(this);
      if (error) {
        this.setError(error);
        return false;
      }
    }

    return true;
  }

  getFormData(): T {
    return this.value;
  }
}

export type FormElement = FormControl | FormGroup<any> | FormArray<any>;

export type AbstractControls = {
  [field: string]: FormElement;
};

export class FormGroup<T extends AbstractControls = AbstractControls> {
  name: string;
  controls: T;
  invalid: boolean;
  onUpdate?: () => void;

  constructor(controls: T, onUpdate = () => {}) {
    this.controls = controls;
    this.onUpdate = onUpdate;
    Object.keys(controls).forEach((field) => {
      const control = controls[field];
      control.name = field;
      control.onUpdate = onUpdate;
    });
  }

  patch(data: any): void {
    if (!data)
      return;

    Object.keys(data).forEach((field) => {
      const control = this.controls[field];
      if (control) {
        control.patch(data[field]);
      }
    });
    this.validate(false);
    this.onUpdate();
  }

  reset(data: any = {}): void {
    Object.values(this.controls).forEach((control) => {
      control.reset(data[control.name]);
    });
    this.validate(false);
    this.onUpdate();
  }

  disable(disabled = true): void {
    Object.values(this.controls).forEach((control) => {
      control.disable(disabled);
    });
  }

  setControl(field: keyof T, control: FormElement) {
    this.controls[field] = control as any;
    this.validate(false);
    this.onUpdate();
  }

  validate(markAsTouched = true): boolean {
    let valid = true;
    Object.values(this.controls).forEach((control) => {
      valid = control.validate(markAsTouched) && valid;
    });

    this.invalid = !valid;
    return valid;
  }

  getFormData(): any {
    const formData: any = {};
    Object.values(this.controls).forEach((control) => {
      formData[control.name] = control.getFormData();
    });
    return formData;
  }
}


export class FormArray<T extends (FormControl | FormGroup) = FormControl> {
  name: string;
  controls: T[];
  validators: ValidatorFn[];
  invalid: boolean;
  uId: number;
  onUpdate?: () => void;

  constructor(controls: T[], validators?: ValidatorFn[], onUpdate = () => {}) {
    this.uId = 0;
    this.name = `form-array-${Math.floor(Math.random() * 10000)}`;
    this.controls = controls;
    this.validators = validators;
    this.onUpdate = onUpdate;

    if (validators) {
      controls.forEach((control) => {
        if (control instanceof FormControl) {
          control.validators = validators;
        }
        control.name = `${this.name}-${++this.uId}`;
      });
    }
  }

  patch(data: any[]): void {
    data.forEach((item, i) => {
      const control = this.controls[i];
      if (control) {
        control.patch(item);
      }
    });
    this.validate(false);
    this.onUpdate();
  }

  reset(data: any[] = []): void {
    this.controls.forEach((control, i) => {
      control.reset(data[i]);
    })
    this.validate(false);
    this.onUpdate();
  }

  validate(markAsTouched = true): boolean {
    let valid = true;
    this.controls.forEach((control) => {
      valid = control.validate(markAsTouched) && valid;
    });

    this.invalid = !valid;
    return valid;
  }

  clear() {
    this.controls = [];
    this.validate(false);
    this.onUpdate();
  }

  append(control: T) {
    if (this.validators && control instanceof FormControl) {
      control.validators = this.validators;
    }
    control.name = `${this.name}-${++this.uId}`;
    this.controls = [...this.controls, control];
    this.validate(false);
    this.onUpdate();
  }

  disable(disabled = true): void {
    this.controls.forEach((control) => {
      control.disable(disabled);
    });
  }

  remove(control: T) {
    this.controls = this.controls.filter((item) => item !== control);
    this.validate(false);
    this.onUpdate();
  }

  getFormData(): any {
    return this.controls.map((control) => control.getFormData());
  }
}
