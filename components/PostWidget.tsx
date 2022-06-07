import React, { useState, useEffect } from "react";
import moment from "moment";
import Link from "next/link";
import { getRecentPosts, getSimilarPosts } from "../services";
import { TUrl } from "./";
import { TCategory } from "./MyTypes";

type Props = {
  category?: TCategory;
  slug?: string;
};

const PostWidget = ({ category, slug }: Props) => {
  type RelatedPostWrapper = {
    title: string;
    featuredImage: TUrl;
    createdAt: string;
    slug: string;
  };

  const [relatedPosts, setRelatedPosts] = useState<RelatedPostWrapper[]>([]);
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
    <div className="bg-white mb-8 rounded-lg p-8 shadow-lg">
      <h3 className="mb-8 border-b p-4 text-xl font-semibold">
        {slug ? "Related Posts" : "Recent Posts"}
      </h3>
      {relatedPosts.map((post) => (
        <div key={post.title} className="mb-4 flex w-full items-center">
          <div className="w-16 flex-none">
            <img
              alt={post.title}
              height="60px"
              width="60px"
              className="rounded-full align-middle"
              src={post.featuredImage.url}
            />
          </div>
          <div className="ml-4 flex-grow">
            <p className="text-gray-500 text-xs">
              {moment(post.createdAt).format("MMM DD, YYYY")}
            </p>
            <Link
              href={`/post/${post.slug}`}
              key={post.title}
              className="text-md"
            >
              {post.title}
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostWidget;
