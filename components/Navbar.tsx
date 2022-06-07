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
    <nav className="sticky bottom-12 z-50 grid grid-flow-col content-center justify-center gap-2">
      {buttons.map((button) => (
        <Link href={button.slug}>
          <a>
            <div
              key={button.slug}
              className="rounded border bg-katsu bg-opacity-50 px-4 py-2 font-semibold text-kami backdrop-blur-md dark:bg-kami dark:bg-opacity-50 dark:text-katsu"
            >
              {button.name.toLowerCase()}
            </div>
          </a>
        </Link>
      ))}
    </nav>
  );
};

export default Navbar;
