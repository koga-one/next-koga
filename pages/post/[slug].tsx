import React from "react";
import { useRouter } from "next/router";
import { getPosts, getPostDetails } from "../../services";
import {
  PostDetail,
  Categories,
  PostWidget,
  Author,
  Comments,
  CommentsForm,
  TContent,
  TAuthor,
  TUrl,
  TCategory,
  PageWrapper,
} from "../../components";
import { NextPage } from "next";

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

  return (
    <PageWrapper title={post.title}>
      <div className="container mx-auto mb-8 px-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="col-span-1 lg:col-span-8">
            <PostDetail post={post} />
            <Author author={post.author} />
            <CommentsForm slug={post.slug} />
            <Comments slug={post.slug} />
          </div>
          <div className="col-span-1 lg:col-span-4">
            <div className="relative top-8 lg:sticky">
              <PostWidget category={post.category} slug={post.slug} />
              <Categories />
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
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
