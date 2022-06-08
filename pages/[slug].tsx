import React from "react";
import { getPageDetails, getAllPages } from "../services";
import { RichText } from "@graphcms/rich-text-react-renderer";
import {
  Categories,
  PageWrapper,
  PostWidget,
  Title,
  TPage,
} from "../components";

type Props = {
  pageDetails: TPage;
};

const PageDetails = ({ pageDetails }: Props) => {
  return (
    <PageWrapper title={pageDetails.title}>
      <div className="container mx-auto">
        <Title title={pageDetails.title} subtitle={pageDetails.subtitle} />
        <div className="mx-2 grid min-h-screen grid-cols-1 gap-2 lg:grid-cols-12 lg:gap-8">
          <div className="col-span-1 lg:col-span-8">
            <div className="rounded-lg py-8 px-4 shadow-lg dark:bg-kami dark:bg-opacity-5 lg:p-8">
              <div className="rich-text">
                <RichText
                  content={pageDetails.content!.raw}
                  renderers={{
                    code_block: ({ children }) => <pre>{children}</pre>,
                  }}
                />
              </div>
            </div>
          </div>
          <div className="col-span-1 lg:col-span-4">
            <div className="relative lg:sticky lg:top-8">
              <PostWidget />
              <div className="mb-2 lg:mb-8"></div>
              <Categories />
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};
export default PageDetails;

type StaticProps = {
  params: {
    slug: string;
  };
};

// Fetch data at build time
export async function getStaticProps({ params }: StaticProps) {
  const pageDetails = await getPageDetails(params.slug);

  return {
    props: { pageDetails },
    revalidate: 10,
  };
}

// Specify dynamic routes to pre-render pages based on data.
// The HTML is generated at build time and will be reused on each request.
export async function getStaticPaths() {
  const pages = await getAllPages();
  return {
    paths: pages.map(({ slug }) => ({ params: { slug } })),
    fallback: false,
  };
}
