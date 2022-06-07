import React from "react";
import { useRouter } from "next/router";
import { getCategories, getCategoryPost } from "../../services";
import { PostCard, Categories, TPost } from "../../components";

type Props = {
  posts: { node: TPost }[];
};

const CategoryPost = ({ posts }: Props) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loader</div>;
  }

  return (
    <div className="container mx-auto mb-8 px-10">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        <div className="col-span-1 lg:col-span-8">
          {posts.map((post: { node: TPost }, index: number) => (
            <PostCard key={index} post={post.node} />
          ))}
        </div>
        <div className="col-span-1 lg:col-span-4">
          <div className="relative top-8 lg:sticky">
            <Categories />
          </div>
        </div>
      </div>
    </div>
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
