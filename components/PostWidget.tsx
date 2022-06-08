import React, { useState, useEffect } from "react";
import { getRecentPosts, getSimilarPosts } from "../services";
import { TCategory, TPost } from "./MyTypes";
import Widget from "./Widget";
import PostCard from "./PostCard";

type Props = {
  category?: TCategory;
  slug?: string;
};

const PostWidget = ({ category, slug }: Props) => {
  const [relatedPosts, setRelatedPosts] = useState<TPost[]>([]);
  useEffect(() => {
    if (slug && category) {
      getSimilarPosts(category.slug, slug).then((result) =>
        setRelatedPosts(result)
      );
    } else {
      getRecentPosts().then((result) => setRelatedPosts(result));
    }
  }, [slug]);

  return (
    <Widget title={slug && category ? "Related Posts" : "Latest Post"}>
      <div className="grid grow gap-4">
        {relatedPosts.map((post) => (
          <PostCard post={post} key={post.slug}></PostCard>
        ))}
      </div>
    </Widget>
  );
};

export default PostWidget;
