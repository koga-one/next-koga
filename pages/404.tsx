import type { NextPage } from "next";
import {
  PageWrapper,
  Categories,
  RecentPosts,
  PostGrid,
  Title,
} from "../components";

const NotFound: NextPage = () => {
  return (
    <PageWrapper title="404">
      <div className="container mx-auto">
        <Title title="404" subtitle="huh, this page doesn't exist" />
        <div className="mx-2 grid min-h-screen grid-cols-1 gap-2 lg:grid-cols-12 lg:gap-8">
          <div className="col-span-1 lg:col-span-8">
            <PostGrid title="Recent Posts" />
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

export default NotFound;
