import React, {FC} from "react";
import {IAbstractInputControlProps} from "../ReactiveForm/types";
import {InputWrapper} from "../ReactiveForm/InputWrapper";
import classnames from "classnames";

export interface ITextFieldProps {
  type?: string;
  value?: string | number;
  placeholder?: string;
  min?: number;
  max?: number;
  minRows?: number;
  maxRows?: number;
}

export const TextField: FC<ITextFieldProps & IAbstractInputControlProps> = ({
  name = '',
  type = 'text',
  value,
  min,
  max,
  minRows,
  maxRows,
  placeholder = '',
  onChange = () => {},
  ...wrapperProps
}) => {
  return (
    <InputWrapper {...wrapperProps} value={value}>
      {({ className, containerClass, disabled, readonly, onFocus, onBlur }) => (
        type === 'textarea' ? (
          <textarea
            className={classnames(containerClass, className)}
            name={name}
            value={value || ''}
            placeholder={placeholder}
            readOnly={readonly}
            disabled={disabled}
            rows={minRows}
            onFocus={onFocus}
            onBlur={onBlur}
            onChange={(e) => onChange(e.target.value)}
          />
        ): (
          <input
            className={classnames(containerClass, className)}
            name={name}
            type={type}
            value={value || ''}
            placeholder={placeholder}
            readOnly={readonly}
            disabled={disabled}
            onFocus={onFocus}
            onBlur={onBlur}
            onChange={(e) => onChange(e.target.value)}
          />
        )
      )}
    </InputWrapper>
  );
};
