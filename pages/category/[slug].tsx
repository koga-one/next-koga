import React from "react";
import { useRouter } from "next/router";
import {
  getCategories,
  getCategoryData,
  getCategoryPost,
} from "../../services";
import {
  Categories,
  TPost,
  PageWrapper,
  PostGrid,
  RecentPosts,
  Title,
  TCategory,
} from "../../components";

type Props = {
  posts: { node: TPost }[];
  categoryData: TCategory;
};

const CategoryPost = ({ posts, categoryData }: Props) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loader</div>;
  }

  return (
    <PageWrapper title={categoryData.name}>
      <div className="container mx-auto">
        <Title title={categoryData.name} subtitle={categoryData.subtitle} />
        <div className="mx-2 grid min-h-screen grid-cols-1 gap-2 lg:grid-cols-12 lg:gap-8">
          <div className="col-span-1 lg:col-span-8">
            <PostGrid posts={posts} title={categoryData.name} />
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
};
export default CategoryPost;

type StaticProps = {
  params: {
    slug: string;
  };
};

// Fetch data at build time
export async function getStaticProps({ params }: StaticProps) {
  const posts = await getCategoryPost(params.slug);
  const categoryData = await getCategoryData(params.slug);

  return {
    props: { posts, categoryData },
    revalidate: 10,
  };
}

// Specify dynamic routes to pre-render pages based on data.
// The HTML is generated at build time and will be reused on each request.
export async function getStaticPaths() {
  const categories = await getCategories();
  return {
    paths: categories.map(({ slug }) => ({ params: { slug } })),
    fallback: true,
  };
}
