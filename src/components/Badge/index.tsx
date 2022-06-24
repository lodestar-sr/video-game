import React, {FC} from "react";
import classnames from "classnames";

export interface IBadgeProps {
  className?: string;
}

export const Badge: FC<IBadgeProps> = ({
  children,
  className = '',
}) => {
  return (
    <span className={classnames(
      'flex-center flex-shrink-0 w-8 h-8 bg-blue font-title text-white font-semibold rounded-full',
      className,
    )}>
      { children }
    </span>
  );
};
