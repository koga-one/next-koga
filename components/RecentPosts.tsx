import React, { useState, useEffect } from "react";
import { getRecentPosts } from "../services";
import { TPost } from "./MyTypes";
import Widget from "./Widget";
import PostCard from "./PostCard";

const RecentPosts = () => {
  const [relatedPosts, setRelatedPosts] = useState<TPost[]>([]);
  useEffect(() => {
    getRecentPosts().then((result) => setRelatedPosts(result));
  }, []);

  return (
    <Widget title={"Latest Post"}>
      <div className="grid grow gap-4">
        {relatedPosts.map((post) => (
          <PostCard post={post} key={post.slug}></PostCard>
        ))}
      </div>
    </Widget>
  );
};

export default RecentPosts;
