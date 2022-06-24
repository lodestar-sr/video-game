import React, {FC, ReactElement, useCallback, useState} from "react";
import classnames from "classnames";
import {IAbstractInputControlProps} from "../types";

export interface IInputWrapperProps {
  value?: any;
  children(props: IInputOptions): ReactElement;
}

export interface IInputOptions {
  className: string;
  containerClass: string;
  disabled: boolean;
  readonly: boolean;
  onFocus(): void;
  onBlur(): void;
}

export const InputWrapper: FC<IInputWrapperProps & IAbstractInputControlProps> = ({
  className = '',
  label = '',
  labelClass = 'text-xs',
  labelFloat = false,
  value,
  description = '',
  descriptionClass = 'text-xs mb-2',
  containerClass = '',
  inputClass = '',
  fullWidth = false,
  direction = 'vertical',
  size = 'md',
  icon,
  iconPosition = 'left',
  iconClass = '',
  required = false,
  readonly = false,
  disabled = false,
  error = false,
  helperText,
  helperTextClass = '',
  absoluteHelper = false,
  onBlur = () => {},
  children,
}) => {
  const [focused, setFocused] = useState(false);

  const handleBlur = useCallback(() => {
    setFocused(false);
    onBlur();
  }, [onBlur]);

  return (
    <div className={classnames(
      `input-wrapper input-size-${size} relative flex`,
      fullWidth ? 'w-full' : 'w-full max-w-120',
      direction === 'horizontal' ? 'items-center' : 'flex-col',
      containerClass,
    )}>
      {label && (
        <label className={classnames(
          'input-label relative flex items-center mb-1 transition-all',
          labelFloat && (!focused && !value ? `as-placeholder` : 'top-0 left-4'),
          { '!text-danger': error },
          labelClass,
        )}>
          {label}
          {required && (
            <span className="text-purple ml-1">*</span>
          )}
        </label>
      )}
      {description && (
        <p className={classnames(
          { '!text-danger': error },
          descriptionClass,
        )}>
          {description}
        </p>
      )}
      <div
        className={classnames(
          'flex items-center bg-navy-light shadow-md transition-all',
          className,
        )}
      >
        {
          iconPosition === 'left' && !!icon && (
            <div className={classnames('flex-shrink-0 flex items-center ml-3 -mr-2', iconClass)}>{ icon }</div>
          )
        }
        {children({
          containerClass: 'w-0 flex-grow bg-transparent p-0 outline-none transition-all',
          className: classnames('text-white px-2 py-1', inputClass),
          disabled,
          readonly,
          onFocus: () => setFocused(true),
          onBlur: handleBlur,
        })}
        {
          iconPosition === 'right' && !!icon && (
            <div className={classnames('flex-shrink-0 flex items-center mr-3 -ml-2', iconClass)}>{ icon }</div>
          )
        }
      </div>
      {helperText && (
        <div className={classnames(
          'text-xs mt-1 ml-2',
          { 'absolute -bottom-5 left-0': absoluteHelper },
          { 'text-danger': error },
          helperTextClass,
        )}>
          {helperText}
        </div>
      )}
    </div>
  );
};
