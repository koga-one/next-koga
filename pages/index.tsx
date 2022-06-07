import type { NextPage } from "next";
import Head from "next/head";
import {
  PageWrapper,
  Categories,
  PostWidget,
  TPost,
  PostGrid,
} from "../components";
import { getPosts } from "../services";

type Props = {
  posts: {
    node: TPost;
  }[];
};

const Home: NextPage<Props> = ({ posts }) => {
  return (
    <PageWrapper title="Home">
      <div className="container mx-auto">
        <h1 className="mb-8 text-center text-6xl lg:mb-16 lg:text-9xl">
          koga<span className="text-aka">.</span>one
        </h1>
        <div className="mx-2 grid min-h-screen grid-cols-1 gap-2 lg:grid-cols-12 lg:gap-8">
          <div className="col-span-1 lg:col-span-8">
            <PostGrid posts={posts} title="Posts" />
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

export async function getStaticProps() {
  const posts = (await getPosts()) || [];

  return {
    props: { posts },
    revalidate: 10,
  };
}

export default Home;
