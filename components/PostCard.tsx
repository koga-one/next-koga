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
    <Link href={`/post/${post.slug}`}>
      <a>
        <div className="flex h-full w-full flex-col">
          <div className="flex gap-2">
            <p
              className={`rounded-lg px-4 text-sm font-semibold text-kami dark:text-katsu ${
                post.category?.name !== "Default"
                  ? "bg-katsu dark:bg-kami"
                  : "bg-gure"
              }`}
            >
              {post.category ? post.category.name : "Default"}
            </p>
            <p className="rounded-lg bg-gure px-4 text-sm font-semibold text-kami dark:bg-gure dark:text-katsu">
              {moment(post.publishedAt).format("MMM DD, YYYY")}
            </p>
          </div>
          <div className="mt-2 h-full overflow-hidden rounded-xl border dark:bg-katsu">
            <Card post={post} />
          </div>
        </div>
      </a>
    </Link>
  );
};

export default PostCard;
