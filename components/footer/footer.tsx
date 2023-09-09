import Link from "next/link";
import React from "react";

export const Footer = () => {
  return (
    <div className="bg-prime p-8 text-white">
      Made by{" "}
      <Link
        href="https://www.linkedin.com/feed/"
        target="__blank"
        className="text-black"
      >
        Pawel Skrobski
      </Link>
    </div>
  );
};
