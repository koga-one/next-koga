import Link from "next/link";
import { useEffect, useState } from "react";
import { getNextPost, getPreviousPost } from "../../services";
import { TPost } from "../MyTypes";

type Props = {
  createdAt: string;
};

const PostNeighbors = ({ createdAt }: Props) => {
  const [nextPost, setnextPost] = useState<TPost>();
  const [previousPost, setpreviousPost] = useState<TPost>();
  useEffect(() => {
    if (createdAt) {
      getNextPost(createdAt).then((result) => setnextPost(result));
      getPreviousPost(createdAt).then((result) => setpreviousPost(result));
    }
  }, [createdAt]);

  return (
    <div className="flex flex-row gap-x-2">
      {previousPost && (
        <div className="mr-auto rounded-lg border font-semibold dark:border-kami dark:font-normal dark:text-kami">
          <Link href={`/post/${previousPost.slug}`}>
            <a className="flex flex-row px-2">
              <p className="w-7 whitespace-nowrap font-fira">{"<- "}</p>
              <p>{previousPost.title}</p>
            </a>
          </Link>
        </div>
      )}
      {nextPost && (
        <div className="ml-auto rounded-lg border font-semibold dark:border-kami dark:font-normal dark:text-kami">
          <Link href={`/post/${nextPost.slug}`}>
            <a className="flex flex-row px-2">
              <p>{nextPost.title}</p>
              <p className="w-7 whitespace-nowrap font-fira">{" ->"}</p>
            </a>
          </Link>
        </div>
      )}
    </div>
  );
};

export default PostNeighbors;
