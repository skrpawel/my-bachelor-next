import React, { FC, ReactElement } from "react";
import Link from "next/link";

interface NavbarElementProps {
  href: string;
  label: string;
  onClick?: () => void;
}

const NavbarElement: React.FC<NavbarElementProps> = ({
  href,
  label,
  onClick,
}) => {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="hover:text-prime hover:font-bold text-center"
    >
      <li className="w-28">{label}</li>
    </Link>
  );
};

export default NavbarElement;
