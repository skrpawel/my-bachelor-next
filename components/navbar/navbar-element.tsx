import React from "react";
import Link from "next/link";
import { NavbarElementProps } from "types";

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
      <li className="w-32">{label}</li>
    </Link>
  );
};

export default NavbarElement;
