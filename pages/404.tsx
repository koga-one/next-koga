import type { NextPage } from "next";
import { useEffect, useState } from "react";
import {
  PageWrapper,
  Categories,
  RecentPosts,
  TPost,
  PostGrid,
  Title,
} from "../components";
import { getPosts } from "../services";

const NotFound: NextPage = () => {
  const [posts, setposts] = useState<{ node: TPost }[]>([]);
  useEffect(() => {
    getPosts(0).then((result) => setposts(result));
  }, []);

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
