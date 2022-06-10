import React, { useEffect, useState } from "react";
import {
  getCategoryPost,
  amountOfCategoryPosts,
  postsPerPage,
} from "../services";
import { TPost, PostCard } from ".";

type Props = {
  slug: string;
};

const PostGrid = ({ slug }: Props) => {
  const [index, setIndex] = useState(0);
  const [posts, setPosts] = useState<{ node: TPost }[]>([]);
  const [postCount, setPostCount] = useState(0);

  function changePage(newIndex: number) {
    setIndex(newIndex);
  }

  useEffect(() => {
    getCategoryPost(slug, index).then((result) => setPosts(result));
  }, [index, slug]);

  useEffect(() => {
    amountOfCategoryPosts(slug).then((result) => setPostCount(result));
    setIndex(0);
  }, [slug]);

  return (
    <div className="rounded-xl px-4 py-8 shadow-lg dark:bg-kami dark:bg-opacity-5 lg:p-8">
      <h2 className="text-center text-3xl lg:text-6xl">Posts</h2>
      <div className="mt-8 grid w-full grid-cols-3 gap-x-2">
        <button
          type="button"
          disabled={index <= 0}
          onClick={() => changePage(index - 1)}
          className="mr-auto rounded-lg border font-semibold disabled:border-aka disabled:text-aka dark:border-kami dark:font-normal dark:text-kami"
        >
          <a className="px-2">
            <span className="w-7 whitespace-nowrap font-fira">{"<- "}</span>
            <span>Previous</span>
          </a>
        </button>
        <div className="mx-auto rounded-lg bg-katsu font-semibold text-kami dark:border-kami dark:bg-gure dark:text-katsu">
          <p className="px-4">Page {index + 1}</p>
        </div>
        <button
          type="button"
          disabled={postsPerPage * index + postsPerPage > postCount}
          onClick={() => changePage(index + 1)}
          className="ml-auto rounded-lg border font-semibold disabled:border-aka disabled:text-aka dark:border-kami dark:font-normal dark:text-kami"
        >
          <a className="px-2">
            <span>Next</span>
            <span className="w-7 whitespace-nowrap font-fira">{" ->"}</span>
          </a>
        </button>
      </div>
      <div className="mt-8 grid grid-cols-1 items-stretch justify-items-stretch gap-4 lg:grid-cols-2 lg:gap-x-6 lg:gap-y-4">
        {posts.map((post) => (
          <PostCard post={post.node} key={post.node.slug}></PostCard>
        ))}
      </div>
    </div>
  );
};

export default PostGrid;
