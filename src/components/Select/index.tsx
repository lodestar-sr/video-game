import React, {FC, ReactElement, useEffect, useMemo, useRef, useState} from "react";
import classnames from "classnames";
import {IAbstractInputControlProps} from "../ReactiveForm/types";
import {InputWrapper} from "../ReactiveForm/InputWrapper";

export type ISelectOption = {
  text: string | ReactElement;
  value: any;
  disabled?: boolean;
};

export interface ISelectProps {
  value?: string | number;
  placeholder?: string;
  options: ISelectOption[];
}

export const Select: FC<ISelectProps & IAbstractInputControlProps> = ({
  name = '',
  value,
  options,
  placeholder = '',
  onChange = () => {},
  children,
  ...wrapperProps
}) => {
  const [opened, setOpened] = useState(false);
  const ref = useRef(null);

  const activeOption = useMemo(() => (
    options.find((item) => item.value === value)
  ), [options, value]);

  useEffect(() => {
    if (!opened) {
      return;
    }

    const clickListener = (e: MouseEvent) => {
      let el: Node | null = e.target as Node;
      if (!el || !el.parentNode)
        return;

      while (el && el !== ref.current) {
        el = el.parentNode;
      }
      if (!el) {
        setOpened(false);
      }
    };
    window.addEventListener('click', clickListener);
    return () => window.removeEventListener('click', clickListener);
  }, [opened]);

  const onToggle = () => {
    setOpened(!opened);
  };

  const onSelectItem = (item: ISelectOption) => {
    onChange(item.value);
    setOpened(false);
  };

  return (
    <InputWrapper {...wrapperProps}>
      {({ className, containerClass, disabled, onFocus, onBlur }) => (
        <div
          className={classnames('relative', containerClass)}
          ref={ref}
        >
          <div className={classnames('flex items-center cursor-pointer', className)} onClick={onToggle}>
            <span className="truncate mr-4">{activeOption?.text || placeholder}</span>
            <i className={classnames('fa fa-caret-down text-white transform transition-transform ml-auto', { 'rotate-180': opened })} />
          </div>

          {opened && (
            <div className="dropdown-wrapper w-full bg-opacity-90 absolute z-50 bg-navy-light">
              {options.map((item, index) => (
                <div
                  key={index}
                  className={classnames(
                    'text-light hover:text-white text-sm px-2 py-1 cursor-pointer transition-all',
                    { 'hidden': item === activeOption },
                  )}
                  onClick={() => onSelectItem(item)}
                >
                  {item.text}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </InputWrapper>
  );
};
