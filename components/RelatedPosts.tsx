import React, { useState, useEffect } from "react";
import { getSimilarPosts } from "../services";
import { TCategory, TPost } from "./MyTypes";
import Widget from "./Widget";
import PostCard from "./PostCard";

type Props = {
  category: TCategory;
  slug: string;
};

const RelatedPosts = ({ category, slug }: Props) => {
  const [relatedPosts, setRelatedPosts] = useState<TPost[]>([]);
  useEffect(() => {
    getSimilarPosts(category.slug, slug).then((result) =>
      setRelatedPosts(result)
    );
  }, [slug]);

  return (
    <Widget title={"Related Posts"}>
      <div className="grid grow gap-4">
        {relatedPosts.map((post) => (
          <PostCard post={post} key={post.slug}></PostCard>
        ))}
      </div>
    </Widget>
  );
};

export default RelatedPosts;
