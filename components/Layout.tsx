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
      <div className="min-h-screen">{children}</div>
      <Navbar />
      <Footer />
    </>
  );
};

export default Layout;
