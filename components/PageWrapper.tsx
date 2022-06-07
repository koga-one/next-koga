import Head from "next/head";

type Props = {
  children: React.ReactNode;
  title: string;
};

const PageWrapper = ({ children, title }: Props) => {
  return (
    <div>
      <Head>
        <title>{title.toUpperCase()} // K.O</title>
      </Head>
      {children}
    </div>
  );
};

export default PageWrapper;
