import React, {FC, useEffect} from "react";
import {useLocation} from "react-router";
import classnames from "classnames";
import {NavLink} from "../../components";

const navLinks = [
  { text: 'Video Games', altText: 'Video', link: '/video-games' },
  { text: 'Contact', altText: 'Contact', link: '/contact' },
];

const FullLayout: FC = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    const element = document.querySelector('.full-layout');
    element.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [location]);

  return (
    <div className={classnames(
      'full-layout w-full min-h-screen flex flex-col bg-gradient-to-b from-navy-dark to-dark',
      'p-4 md:p-6 lg:px-12 lg:py-8 xl:px-16 xl:py-12',
    )}>
      <div className="flex max-md:flex-col mb-8">
        {navLinks.map((item, i) => (
          <NavLink
            key={i}
            className="mr-8"
            text={item.text}
            altText={item.altText}
            link={item.link}
            active={location.pathname.startsWith(item.link)}
          />
        ))}
      </div>
      <div className="flex flex-grow">
        {children}
      </div>
    </div>
  );
};

export default FullLayout;
