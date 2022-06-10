import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getCategories, getCategoryData } from "../../services";
import {
  Categories,
  TPost,
  PageWrapper,
  PostGrid,
  RecentPosts,
  Title,
  TCategory,
  Loading,
  CategoryPostGrid,
} from "../../components";
import NotFound from "../404";

type Props = {
  categoryData?: TCategory;
};

const CategoryPost = ({ categoryData }: Props) => {
  const router = useRouter();

  if (router.isFallback) {
    return <Loading />;
  }

  if (categoryData?.slug) {
    return (
      <PageWrapper title={categoryData.name}>
        <div className="container mx-auto">
          <Title title={categoryData.name} subtitle={categoryData.subtitle} />
          <div className="mx-2 grid min-h-screen grid-cols-1 gap-2 lg:grid-cols-12 lg:gap-8">
            <div className="col-span-1 lg:col-span-8">
              <CategoryPostGrid slug={categoryData.slug} />
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
  }
  return <NotFound />;
};
export default CategoryPost;

type StaticProps = {
  params: {
    slug: string;
  };
};

// Fetch data at build time
export async function getStaticProps({ params }: StaticProps) {
  const categoryData = await getCategoryData(params.slug);

  return {
    props: { categoryData },
    revalidate: 10,
  };
}

export async function getStaticPaths() {
  const categories = await getCategories();
  return {
    paths: categories.map(({ slug }) => ({ params: { slug } })),
    fallback: true,
  };
}
