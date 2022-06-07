import React from "react";
import { Header } from "./";
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
      <Header />
      {children}
    </>
  );
};

export default Layout;
