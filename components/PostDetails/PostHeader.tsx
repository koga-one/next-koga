import moment from "moment";
import Image from "next/image";
import React from "react";

type Props = {
  createdAt: string;
  authorUrl: string;
  authorName: string;
  categoryName: string;
};

const PostHeader = ({
  createdAt,
  authorUrl,
  authorName,
  categoryName,
}: Props) => {
  return (
    <div className="mb-4 flex flex-wrap items-center justify-center gap-2 lg:mb-8 lg:justify-start">
      <span className="rounded-lg bg-katsu px-4 text-sm font-semibold text-kami dark:bg-gure dark:text-katsu lg:order-2 lg:text-base">
        {moment(createdAt).format("MMM DD, YYYY")}
      </span>
      <div className="lg:order-0 h-10">
        <Image
          src={authorUrl}
          alt={authorName}
          className="rounded-full"
          height="40px"
          width="40px"
          layout="fixed"
        />
      </div>
      <span className="hidden rounded-lg bg-katsu px-4 text-sm font-semibold text-kami dark:bg-gure dark:text-katsu lg:order-1 lg:inline lg:text-base">
        {authorName}
      </span>
      <span className="rounded-lg bg-katsu px-4 text-sm font-semibold text-kami dark:bg-gure dark:text-katsu lg:order-4 lg:text-base">
        {categoryName}
      </span>
    </div>
  );
};

export default PostHeader;
