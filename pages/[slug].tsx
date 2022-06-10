import React, { useEffect, useState } from "react";
import { getPageDetails, getAllPages } from "../services";
import { RichText } from "@graphcms/rich-text-react-renderer";
import {
  Categories,
  Loading,
  PageWrapper,
  RecentPosts,
  Title,
  TPage,
} from "../components";
import { NextPage } from "next";
import { RichTextContent } from "@graphcms/rich-text-types";
import { useRouter } from "next/router";
import NotFound from "./404";

type Props = {
  pageDetails?: TPage;
};

const PageDetails: NextPage<Props> = ({ pageDetails }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <Loading />;
  }

  if (pageDetails && pageDetails.title) {
    const [raw, setRaw] = useState<RichTextContent>([]);
    useEffect(() => {
      setRaw(pageDetails.content!.raw);
    }, [pageDetails.title]);

    return (
      <PageWrapper title={pageDetails.title}>
        <div className="container mx-auto">
          <Title title={pageDetails.title} subtitle={pageDetails.subtitle} />
          <div className="mx-2 grid min-h-screen grid-cols-1 gap-2 lg:grid-cols-12 lg:gap-8">
            <div className="col-span-1 lg:col-span-8">
              <div className="rounded-lg py-8 px-4 shadow-lg dark:bg-kami dark:bg-opacity-5 lg:p-8">
                <div className="rich-text">
                  <RichText
                    content={raw}
                    renderers={{
                      code_block: ({ children }) => <pre>{children}</pre>,
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="col-span-1 lg:col-span-4">
              <div className="relative lg:sticky lg:top-8">
                <RecentPosts />
                <div className="mb-2 lg:mb-8"></div>
                <Categories />
              </div>
            </div>
          </div>
        </div>
      </PageWrapper>
    );
  } else {
    return <NotFound />;
  }
};

export default PageDetails;

type StaticProps = {
  params: {
    slug: string;
  };
};

// Fetch data at build time
export async function getStaticProps({ params }: StaticProps) {
  const pageDetails = (await getPageDetails(params.slug)) || [];

  return {
    props: { pageDetails },
    revalidate: 10,
  };
}

export async function getStaticPaths() {
  const pages = await getAllPages();

  return {
    paths: pages.map(({ slug }) => ({ params: { slug } })),
    fallback: true,
  };
}
