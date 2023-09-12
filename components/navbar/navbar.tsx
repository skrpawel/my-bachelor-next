"use client";

import React, { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import NavbarElement from "./navbar-element";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { signOut } from "next-auth/react";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const { data: session } = useSession();

  return (
    <div className="fixed w-full bg-black bg-opacity-40 z-50">
      <div>
        <div className="flex text-[#FFFCF2] justify-between items-center w-full p-6">
          <Link href="/">
            <h1 className="text-4xl font-bold text-prime">
              {process.env.appName}
            </h1>
          </Link>
          <ul className="hidden md:flex md:justify-end uppercase">
            <NavbarElement href="/" label="Home" onClick={() => {}} />
            <NavbarElement href="/calendar" label="Calendar" />
            {session?.user ? (
              <>
                <NavbarElement
                  href="/login"
                  label="Sign out"
                  onClick={() => signOut()}
                />
              </>
            ) : (
              <>
                <NavbarElement href="/login" label="Login" />
                <NavbarElement href="/register" label="Sign Up" />
              </>
            )}
          </ul>
          <div onClick={toggleMobileMenu} className="block md:hidden">
            {mobileMenuOpen ? (
              <AiOutlineClose size={26} />
            ) : (
              <AiOutlineMenu size={26} />
            )}
          </div>
        </div>

        {mobileMenuOpen && (
          <div className=" md:hidden pb-6 text-white">
            <ul className="uppercase mt-2 space-y-2 flex flex-col w-full items-center text-2xl">
              <NavbarElement href="/" label="Home" />
              <NavbarElement href="/calendar" label="Calendar" />
              {session?.user ? (
                <>
                  <NavbarElement
                    href="/login"
                    label="Sign out"
                    onClick={() => {
                      signOut();
                    }}
                  />
                </>
              ) : (
                <>
                  <NavbarElement href="/login" label="Login" />
                  <NavbarElement href="/register" label="Sign Up" />
                </>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
