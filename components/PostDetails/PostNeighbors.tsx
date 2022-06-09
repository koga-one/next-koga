import Link from "next/link";
import { useEffect, useState } from "react";
import { getNextPost, getPreviousPost } from "../../services";
import { TPost } from "../MyTypes";

type Props = {
  publishedAt: string;
};

const PostNeighbors = ({ publishedAt }: Props) => {
  const [nextPost, setnextPost] = useState<TPost>();
  const [previousPost, setpreviousPost] = useState<TPost>();
  useEffect(() => {
    getNextPost(publishedAt).then((result) => setnextPost(result));
    getPreviousPost(publishedAt).then((result) => setpreviousPost(result));
  }, [publishedAt]);

  return (
    <div className="grid grid-cols-2">
      {previousPost && (
        <Link href={`/post/${previousPost.slug}`}>
          <a className="place-self-start rounded-lg border px-4 font-semibold text-katsu dark:border-gure dark:font-normal dark:text-kami">
            <span className="font-fira">{"<- "}</span>
            {previousPost.title}
          </a>
        </Link>
      )}
      {!previousPost && <div></div>}
      {nextPost && (
        <Link href={`/post/${nextPost.slug}`}>
          <a className="place-self-end rounded-lg border px-4 font-semibold text-katsu dark:border-gure dark:font-normal dark:text-kami">
            {nextPost.title}
            <span className="font-fira">{" ->"}</span>
          </a>
        </Link>
      )}
    </div>
  );
};

export default PostNeighbors;
