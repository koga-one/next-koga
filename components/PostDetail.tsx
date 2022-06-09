import React from "react";
import { TAuthor, TUrl, TCategory, TContent } from "./";
import moment from "moment";
import Image from "next/image";
import PostArticle from "./PostDetails/PostArticle";

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
  return (
    <div className="rounded-xl shadow-lg dark:bg-kami dark:bg-opacity-5">
      <div className="overflow-hidden">
        <div className="relative h-[60vh] w-full overflow-hidden rounded-xl lg:h-[40vh]">
          <Image
            priority
            className="card-image"
            src={post.featuredImage.url}
            quality={80}
            layout={"fill"}
          />
        </div>
      </div>
      <div className="py-8 px-4 lg:p-8">
        <div className="mb-4 flex flex-wrap items-center justify-center gap-2 lg:mb-8 lg:justify-start">
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
        <PostArticle raw={post.content.raw} title={post.title} />
      </div>
    </div>
  );
};

export default PostDetail;
