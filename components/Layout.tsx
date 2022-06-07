import React from "react";
import { Navbar } from "./";
import Head from "next/head";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <Navbar />
      {children}
    </>
  );
};

export default Layout;
