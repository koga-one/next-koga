import React, { ReactElement, useEffect, useState } from "react";
import { TAuthor, TUrl, TCategory, TContent } from "./";
import moment from "moment";
import { RichText } from "@graphcms/rich-text-react-renderer";

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
    <div className="bg-white mb-8 rounded-lg pb-12 shadow-lg">
      <div className="mb-6 overflow-hidden shadow-md">
        <div className="relative h-[160px] overflow-hidden rounded-xl lg:h-[400px]">
          <img
            src={post.featuredImage.url}
            alt={post.title}
            className="absolute bottom-1/2 w-full translate-y-1/2 rounded-t-lg object-top"
          />
        </div>
      </div>
      <div className="px-4 lg:px-0">
        <div className="mb-8 flex w-full items-center">
          <div className="mb-4 mr-8 flex w-full items-center lg:mb-0 lg:w-auto">
            <img
              src={post.author.photo.url}
              alt={post.author.name}
              className="rounded-full align-middle"
              height="30px"
              width="30px"
            />
            <p className="text-gray-700 ml-2 inline align-middle text-lg">
              {post.author.name}
            </p>
          </div>
          <div className="text-gray-700 font-medium">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="text-pink-500 mr-2 inline h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span>{moment(post.createdAt).format("MMM DD, YYYY")}</span>
          </div>
        </div>
        <h1 className="mb-8 text-3xl font-semibold">{post.title}</h1>
        {richText}
      </div>
    </div>
  );
};

export default PostDetail;
