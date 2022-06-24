import React, {FC} from "react";
import classnames from "classnames";

export interface ICardProps {
  className?: string;
}

export const Card: FC<ICardProps> = ({
  className = '',
  children,
}) => {
  return (
    <div className={classnames("bg-navy shadow-md p-4", className)}>
      {children}
    </div>
  );
};
