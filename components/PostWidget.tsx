import React, { useState, useEffect } from "react";
import moment from "moment";
import Link from "next/link";
import { getRecentPosts, getSimilarPosts } from "../services";
import { TUrl } from "./";
import { TCategory } from "./MyTypes";
import Widget from "./Widget";
import Image from "next/image";

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
    excerpt: string;
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
    <Widget title={slug ? "Related Posts" : "Recent Posts"}>
      <div className="grid grow gap-4">
        {relatedPosts.map((post) => (
          <Link href={`/post/${post.slug}`}>
            <a>
              <div className="flex gap-2">
                <p className="rounded-lg bg-katsu px-4 text-xs font-semibold text-kami dark:bg-gure dark:text-katsu">
                  {moment(post.createdAt).format("MMM DD, YYYY")}
                </p>
              </div>
              <div className="mt-2 flex flex-row rounded-xl border dark:bg-katsu">
                <div className="relative min-h-[80px] min-w-[80px]">
                  <Image
                    className="rounded-xl"
                    src={post.featuredImage.url}
                    layout="fill"
                    sizes="50vw"
                  />
                </div>
                <div className="px-4 py-2">
                  <h2 className="text-lg">{post.title}</h2>
                  <p className="text-xs">{post.excerpt}</p>
                </div>
              </div>
            </a>
          </Link>
        ))}
      </div>
    </Widget>
  );
};

export default PostWidget;
