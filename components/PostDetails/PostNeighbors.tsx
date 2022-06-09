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
    <div className="grid grid-cols-2 gap-x-2">
      {previousPost && (
        <Link href={`/post/${previousPost.slug}`}>
          <a className="w-full place-self-start overflow-hidden text-ellipsis whitespace-nowrap rounded-lg border px-4 font-semibold text-katsu dark:border-gure dark:font-normal dark:text-kami">
            <span className="font-fira">{"<- "}</span>
            {previousPost.title}
          </a>
        </Link>
      )}
      {!previousPost && <div></div>}
      {nextPost && (
        <Link href={`/post/${nextPost.slug}`}>
          <a className="w-full place-self-end overflow-hidden text-ellipsis whitespace-nowrap rounded-lg border px-4 text-right font-semibold text-katsu dark:border-gure dark:font-normal dark:text-kami">
            {nextPost.title}
            <span className="font-fira">{" ->"}</span>
          </a>
        </Link>
      )}
    </div>
  );
};

export default PostNeighbors;
