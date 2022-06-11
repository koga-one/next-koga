import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getPages } from "../services";
import { TPage } from "./";

const Navbar = () => {
  const [pages, setPages] = useState<TPage[]>([]);
  useEffect(() => {
    getPages(true).then((newPages) => setPages(newPages));
  }, []);

  return (
    <nav className="pointer-events-none sticky bottom-12 z-50 my-8 grid grid-flow-col content-center justify-center gap-2">
      <Link href="/" key="/">
        <a className="pointer-events-auto">
          <div className="rounded-lg border border-katsu px-4 py-2 font-semibold text-katsu backdrop-blur-md dark:border-kami dark:text-kami dark:backdrop-brightness-75">
            home
          </div>
        </a>
      </Link>
      {pages.map((page) => (
        <Link href={`/${page.slug!}`} key={page.slug}>
          <a className="pointer-events-auto">
            <div className="rounded-lg border border-katsu px-4 py-2 font-semibold text-katsu backdrop-blur-md dark:border-kami dark:text-kami dark:backdrop-brightness-75">
              {page.title.toLowerCase()}
            </div>
          </a>
        </Link>
      ))}
    </nav>
  );
};

export default Navbar;
