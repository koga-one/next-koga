import type { NextPage } from "next";
import {
  PageWrapper,
  Categories,
  RecentPosts,
  TPost,
  PostGrid,
  Title,
  FeaturedPosts,
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
        <Title />
        <div className="mx-2 grid min-h-screen grid-cols-1 gap-2 lg:grid-cols-12 lg:gap-8">
          <div className="col-span-1 lg:col-span-8">
            <PostGrid posts={posts} title="Posts" />
          </div>
          <div className="col-span-1 lg:col-span-4">
            <div className="relative lg:sticky lg:top-8">
              <FeaturedPosts />
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
