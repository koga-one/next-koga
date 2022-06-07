import React from "react";
import { useRouter } from "next/router";
import { getPosts, getPostDetails } from "../../services";
import { TContent, TAuthor, TUrl, TCategory } from "../../components";
import { NextPage } from "next";
import loadable from "@loadable/component";

type Props = {
  post: {
    author: TAuthor;
    createdAt: string;
    slug: string;
    title: string;
    excerpt: string;
    featuredImage: TUrl;
    category: TCategory;
    content: TContent;
  };
};

const PostDetails: NextPage<Props> = ({ post }) => {
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loader</div>;
  }

  const Post = loadable(() =>
    post.category
      ? import(
          `../../components/PostLayouts/${post.category.name.replace(
            /\s/g,
            ""
          )}Layout`
        )
      : import("../../components/PostLayouts/DefaultLayout")
  );

  return <Post post={post} />;
};

export default PostDetails;

type StaticProps = {
  params: {
    slug: string;
  };
};

export async function getStaticProps({ params }: StaticProps) {
  const data = (await getPostDetails(params.slug)) || [];

  return {
    props: { post: data },
    revalidate: 10,
  };
}

export async function getStaticPaths() {
  const posts = await getPosts();

  return {
    paths: posts.map(({ node: { slug } }) => ({ params: { slug } })),
    fallback: true,
  };
}
