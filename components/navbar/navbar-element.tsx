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
    <Link href={href} onClick={onClick}>
      <li className="px-4">{label}</li>
    </Link>
  );
};

export default NavbarElement;
