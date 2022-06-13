import React from "react";
import loadable from "@loadable/component";
import { TPost } from "./";
import Link from "next/link";
import moment from "moment";

type Props = {
  post: TPost;
};

const PostCard = ({ post }: Props) => {
  const Card = loadable(() =>
    post.category
      ? import(`./PostCards/${post.category.name.replace(/\s/g, "")}Card`)
      : import("./PostCards/DefaultCard")
  );

  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex gap-2">
        {post.category && (
          <Link href={`/category/${post.category.slug}`}>
            <a>
              <p className="rounded-lg border border-katsu px-4 text-sm font-semibold text-katsu dark:border-kami dark:bg-katsu dark:text-kami">
                {post.category.name}
              </p>
            </a>
          </Link>
        )}
        <p className="rounded-lg bg-gure px-4 text-sm font-semibold text-katsu dark:bg-gure">
          {moment(post.createdAt).format("MMM DD, YYYY")}
        </p>
      </div>
      <Link href={`/post/${post.slug}`}>
        <a className="relative">
          <div className="mt-2 min-h-[178px] overflow-hidden rounded-xl border dark:border-gure dark:bg-katsu">
            <Card post={post} />
          </div>
          <div className="absolute right-2 bottom-2 z-50 rounded-lg border border-katsu bg-kami">
            <p className="px-2 text-sm text-katsu">
              Read Post <span className="font-fira">{"->"}</span>
            </p>
          </div>
        </a>
      </Link>
    </div>
  );
};

export default React.memo(PostCard);
