import React, { ReactElement, useEffect, useState } from "react";
import { TAuthor, TUrl, TCategory, TContent } from "./";
import moment from "moment";
import { RichText } from "@graphcms/rich-text-react-renderer";
import Image from "next/image";

type Props = {
  post: {
    author: TAuthor;
    createdAt: string;
    slug: string;
    title: string;
    excerpt: string;
    featuredImage: TUrl;
    category: TCategory;
    content: TContent;
  };
};

const PostDetail = ({ post }: Props) => {
  const [richText, setRichText] = useState<ReactElement>();

  useEffect(() => {
    setRichText(<RichText content={post.content.raw} />);
  }, []);

  return (
    <div className="rounded-lg shadow-lg dark:bg-kami dark:bg-opacity-5">
      <div className="overflow-hidden">
        <div className="relative h-[160px] overflow-hidden rounded-xl lg:h-[400px]">
          <img
            src={post.featuredImage.url}
            alt={post.title}
            className="absolute bottom-1/2 w-full translate-y-1/2 rounded-t-lg object-top"
          />
        </div>
      </div>
      <div className="py-8 px-4 lg:p-8">
        <div className="mb-8 flex flex-wrap items-center justify-center gap-2 lg:justify-start">
          <span className="rounded-lg bg-katsu px-4 text-sm font-semibold text-kami dark:bg-gure dark:text-katsu lg:order-2 lg:text-base">
            {moment(post.createdAt).format("MMM DD, YYYY")}
          </span>
          <div className="lg:order-0 h-10">
            <Image
              src={post.author.photo.url}
              alt={post.author.name}
              className="rounded-full"
              height="40px"
              width="40px"
              layout="fixed"
            />
          </div>
          <span className="hidden rounded-lg bg-katsu px-4 text-sm font-semibold text-kami dark:bg-gure dark:text-katsu lg:order-1 lg:inline lg:text-base">
            {post.author.name}
          </span>
          <span className="rounded-lg bg-katsu px-4 text-sm font-semibold text-kami dark:bg-gure dark:text-katsu lg:order-4 lg:text-base">
            {post.category ? post.category.name : "No category"}
          </span>
        </div>
        <article>
          <h1 className="mb-8 text-4xl font-semibold lg:text-6xl">
            {post.title}
          </h1>
          {richText}
        </article>
      </div>
    </div>
  );
};

export default PostDetail;
