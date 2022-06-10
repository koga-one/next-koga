import { NextPage } from "next";
import {
  PageWrapper,
  Categories,
  PostGrid,
  Title,
  FeaturedPosts,
  TPost,
} from "../components";

const Home: NextPage = () => {
  return (
    <PageWrapper title="Home">
      <div className="container mx-auto">
        <Title />
        <div className="mx-2 grid min-h-screen grid-cols-1 gap-2 lg:grid-cols-12 lg:gap-8">
          <div className="block lg:hidden">
            <FeaturedPosts />
          </div>
          <div className="col-span-1 lg:col-span-8">
            <PostGrid title="Posts" />
          </div>
          <div className="col-span-1 lg:col-span-4">
            <div className="relative lg:sticky lg:top-8">
              <div className="hidden lg:mb-8 lg:block">
                <FeaturedPosts />
              </div>
              <Categories />
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Home;
