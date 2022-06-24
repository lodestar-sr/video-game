import React, {FC, MouseEventHandler} from "react";
import classnames from "classnames";

export interface IButtonProps {
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}

export const Button: FC<IButtonProps> = ({
  children,
  className = '',
  type = 'button',
  disabled,
  ...props
}) => {
  return (
    <button
      className={classnames(
        'flex-center bg-blue hover:bg-purple font-title text-white font-medium outline-none px-4 py-1 shadow-md transition-all',
        { 'opacity-60': disabled },
        className,
      )}
      type={type}
      disabled={disabled}
      {...props}
    >
      { children }
    </button>
  );
};
