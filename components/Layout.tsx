import React from "react";
import { Header, Navbar, Footer } from "./";
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
      <Navbar />
      <Footer />
    </>
  );
};

export default Layout;
