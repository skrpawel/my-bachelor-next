import Link from "next/link";
import React from "react";

export const Footer = () => {
  return (
    <div className="bg-prime p-8 text-white text-center">
      <Link
        target="_blank"
        href={"https://www.linkedin.com/in/pawel-skrobski/"}
        className="hover:text-[#0072b1]"
      >
        Paweł Skrobski&nbsp;
      </Link>
      2023 &copy;
    </div>
  );
};
