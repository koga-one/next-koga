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
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="col-span-1 shadow-lg lg:col-span-8">
            <h2 className="text-center text-8xl">Posts</h2>
            <PostGrid posts={posts} />
          </div>
          <div className="col-span-1 lg:col-span-4">
            <div className="relative top-8 lg:sticky">
              <PostWidget />
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
