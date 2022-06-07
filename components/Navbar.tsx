import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getCategories } from "../services";
import { TCategory } from ".";

const buttons: { name: string; slug: string }[] = [
  { name: "home", slug: "/" },
  { name: "about", slug: "/about" },
  { name: "categories", slug: "/category" },
];

const Navbar = () => {
  return (
    <nav className="fixed right-1/2 bottom-12 z-50 flex translate-x-1/2 gap-2">
      {buttons.map((button) => (
        <div className="rounded bg-kami bg-opacity-50 px-4 py-2 font-semibold text-katsu backdrop-blur-md">
          <Link href={button.slug}>
            <a>{button.name}</a>
          </Link>
        </div>
      ))}
    </nav>
  );
};

export default Navbar;
