import React from "react";
import { useRouter } from "next/router";
import { getCategories, getCategoryPost } from "../../services";
import {
  PostCard,
  Categories,
  TPost,
  PageWrapper,
  PostGrid,
  PostWidget,
} from "../../components";

type Props = {
  posts: { node: TPost }[];
};

const CategoryPost = ({ posts }: Props) => {
  const router = useRouter();
  const categoryName = router.asPath.split("/")[2];

  if (router.isFallback) {
    return <div>Loader</div>;
  }

  return (
    <PageWrapper title={categoryName}>
      <div className="container mx-auto">
        <h1 className="mb-8 text-center text-6xl lg:mb-16 lg:text-9xl">
          koga<span className="text-aka">.</span>one
        </h1>
        <div className="mx-2 grid min-h-screen grid-cols-1 gap-2 lg:grid-cols-12 lg:gap-8">
          <div className="col-span-1 lg:col-span-8">
            <PostGrid posts={posts} title={categoryName} />
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
export default CategoryPost;

type StaticProps = {
  params: {
    slug: string;
  };
};

// Fetch data at build time
export async function getStaticProps({ params }: StaticProps) {
  const posts = await getCategoryPost(params.slug);

  return {
    props: { posts },
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
