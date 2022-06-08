import { TPost, PostCard } from "./";

type Props = {
  posts: {
    node: TPost;
  }[];
  title: string;
};

const PostGrid = ({ posts }: Props) => {
  return (
    <div className="rounded-xl px-4 py-8 shadow-lg dark:bg-kami dark:bg-opacity-5 lg:p-8">
      <h2 className="text-center text-5xl lg:text-6xl">Posts</h2>
      <div className="mt-8 grid grid-cols-1 items-stretch justify-items-stretch gap-4 lg:grid-cols-2 lg:gap-x-6 lg:gap-y-4">
        {posts.map((post) => (
          <PostCard post={post.node} key={post.node.slug}></PostCard>
        ))}
      </div>
    </div>
  );
};

export default PostGrid;
