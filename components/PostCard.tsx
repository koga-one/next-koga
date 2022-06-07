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
        <Card className="relative" post={post}>
          <div className="flex gap-2">
            <p className="rounded-lg bg-katsu px-4 text-sm font-semibold text-kami dark:bg-gure dark:text-katsu">
              {moment(post.createdAt).format("MMM DD, YYYY")}
            </p>
            <p className="rounded-lg bg-katsu px-4 text-sm font-semibold text-kami dark:bg-gure dark:text-katsu">
              {post.category ? post.category.name : "No category"}
            </p>
          </div>
        </Card>
      </a>
    </Link>
  );
};

export default PostCard;
