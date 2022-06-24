import React, {FC} from "react";
import {Link} from "react-router-dom";
import classnames from "classnames";

export interface INavLinkProps {
  className?: string;
  text: string;
  altText: string;
  link: string;
  active?: boolean;
}

export const NavLink: FC<INavLinkProps> = ({
  className,
  text,
  altText,
  link,
  active,
}) => {
  return (
    <div className={classnames('relative font-title uppercase', className)}>
      <div className={classnames(
        'absolute text-navy-light text-6xl font-semibold',
        { 'opacity-0': !active },
      )}>
        { altText }
      </div>

      <div className="relative text-white text-3xl whitespace-nowrap ml-8 mt-8 cursor-pointer">
        <Link to={link}>{ text }</Link>
      </div>
    </div>
  );
};
