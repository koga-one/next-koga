import React, {
  createRef,
  KeyboardEvent,
  RefObject,
  useEffect,
  useState,
} from "react";
import { getPosts, amountOfPosts, postsPerPage } from "../services";
import { TPost, PostCard } from "./";

type Props = {
  title: string;
};

const PostGrid = ({ title }: Props) => {
  const [index, setIndex] = useState(0);
  const [posts, setPosts] = useState<{ node: TPost }[]>([]);
  const [postNumbers, setPostNumbers] = useState({ amount: 0, maxIndex: 0 });
  const pageEl: RefObject<HTMLInputElement> = createRef();

  const changePage = (newIndex: number) => {
    setIndex(newIndex);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      goToPage();
    }
  };

  const goToPage = () => {
    if (pageEl.current) {
      const localInt = parseInt(pageEl.current.value);

      if (!isNaN(localInt)) {
        setIndex(Math.min(Math.max(localInt - 1, 0), postNumbers.maxIndex));
      }

      pageEl.current.value = "";
    }
  };

  useEffect(() => {
    amountOfPosts().then((result) =>
      setPostNumbers({
        amount: result,
        maxIndex: Math.ceil(result / postsPerPage) - 1,
      })
    );
  }, []);

  useEffect(() => {
    getPosts(index).then((result) => setPosts(result));
  }, [index]);

  return (
    <div className="rounded-xl px-4 py-8 shadow-lg dark:bg-kami dark:bg-opacity-5 lg:p-8">
      <h2 className="text-center text-3xl lg:text-6xl">{title}</h2>
      <div className="mt-8 grid w-full grid-cols-1 gap-x-2 lg:grid-cols-3">
        <div className="mr-auto hidden gap-2 lg:flex">
          <button
            type="button"
            disabled={index <= 0}
            onClick={() => changePage(0)}
            className="rounded-lg border font-semibold disabled:border-aka disabled:text-aka dark:border-kami dark:font-normal dark:text-kami"
          >
            <a className="px-2">
              <span className="w-7 whitespace-nowrap font-fira">{"<<- "}</span>
              <span>First</span>
            </a>
          </button>
          <button
            type="button"
            disabled={index <= 0}
            onClick={() => changePage(index - 1)}
            className="rounded-lg border font-semibold disabled:border-aka disabled:text-aka dark:border-kami dark:font-normal dark:text-kami"
          >
            <a className="px-2">
              <span className="w-7 whitespace-nowrap font-fira">{"<- "}</span>
              <span>Previous</span>
            </a>
          </button>
        </div>
        <div className="mx-auto flex gap-1 rounded-lg bg-gure py-1 px-2">
          <span className="font-semibold text-katsu">Page </span>
          <input
            ref={pageEl}
            type="text"
            className="w-[40px] rounded-md bg-kami text-center font-semibold text-aka outline-none placeholder:font-semibold placeholder:text-katsu focus:ring-2 focus:ring-kami dark:bg-katsu dark:bg-opacity-90 dark:placeholder:text-kami"
            placeholder={(index + 1).toString()}
            name="page"
            onKeyDown={handleKeyDown}
          />
          <span className="font-semibold text-katsu">
            out of {postNumbers.maxIndex + 1}
          </span>
        </div>
        <div className="ml-auto hidden gap-2 lg:flex">
          <button
            type="button"
            disabled={postsPerPage * index + postsPerPage >= postNumbers.amount}
            onClick={() => changePage(index + 1)}
            className="rounded-lg border font-semibold disabled:border-aka disabled:text-aka dark:border-kami dark:font-normal dark:text-kami"
          >
            <a className="px-2">
              <span>Next</span>
              <span className="w-7 whitespace-nowrap font-fira">{" ->"}</span>
            </a>
          </button>
          <button
            type="button"
            disabled={index >= postNumbers.maxIndex}
            onClick={() => changePage(postNumbers.maxIndex)}
            className="rounded-lg border font-semibold disabled:border-aka disabled:text-aka dark:border-kami dark:font-normal dark:text-kami"
          >
            <a className="px-2">
              <span>Last</span>
              <span className="w-7 whitespace-nowrap font-fira">{" ->>"}</span>
            </a>
          </button>
        </div>
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
