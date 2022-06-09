import React, { useState, useEffect } from "react";
import { getFeaturedPosts } from "../services";
import { TPost } from "./MyTypes";
import Widget from "./Widget";
import PostCard from "./PostCard";

type Props = {
  node: TPost;
};

const RecentPosts = () => {
  const [featuredPosts, setfeaturedPosts] = useState<Props[]>([]);
  useEffect(() => {
    getFeaturedPosts().then((result) => setfeaturedPosts(result));
  }, []);

  return (
    <Widget title={"Featured Posts"}>
      <div className="grid grow gap-4">
        {featuredPosts.map((post) => (
          <PostCard post={post.node} key={post.node.slug}></PostCard>
        ))}
      </div>
    </Widget>
  );
};

export default RecentPosts;
