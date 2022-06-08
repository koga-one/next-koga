import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getPages } from "../services";
import { TPage } from "./MyTypes";

const Footer = () => {
  const [pages, setPages] = useState<TPage[]>([]);
  useEffect(() => {
    getPages(false).then((newPages) => setPages(newPages));
  }, []);

  return (
    <div className="mt-8 grid h-80 grid-cols-1 items-center bg-kami bg-opacity-5 p-10 lg:h-40 lg:grid-cols-3">
      <div className="order-3 flex justify-center lg:order-1 lg:justify-end">
        © 2021 - {new Date().getFullYear()} - Andre H. Koga
      </div>
      <div className="order-1 flex flex-col place-content-center items-center lg:order-2">
        <Link href="/">
          <a>
            <Image src="/favicon.svg" width="30px" height="30px" />
          </a>
        </Link>
        <p className="font-garamond text-lg">
          the moon is beautiful, isn't it?
        </p>
      </div>
      <div className="order-2 flex justify-center gap-8 lg:order-3 lg:justify-start">
        {pages.map((page) => (
          <Link href={`/${page.slug!}`} key={page.slug}>
            <a className="underline">{page.title.toLowerCase()}</a>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Footer;
