import React from "react";
import { getPostDetails, getAllPosts } from "../../services";
import { TContent, TAuthor, TCategory, TUrl, Loading } from "../../components";
import loadable from "@loadable/component";
import { useRouter } from "next/router";
import NotFound from "../404";

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

const PostDetails = ({ post }: Props) => {
  const router = useRouter();

  if (router.isFallback) {
    return <Loading />;
  }

  if (post.title) {
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
  } else {
    return <NotFound />;
  }
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
  const posts = await getAllPosts();

  return {
    paths: posts.map(({ node: { slug } }) => ({ params: { slug } })),
    fallback: true,
  };
}
