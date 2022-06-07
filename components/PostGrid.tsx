import { TPost, PostCard } from "./";

type Props = {
  posts: {
    node: TPost;
  }[];
};

const PostGrid = ({ posts }: Props) => {
  return (
    <div className="flex flex-wrap gap-4 rounded-xl p-8 dark:bg-kami dark:bg-opacity-5">
      {posts.map((post) => (
        <PostCard post={post.node}></PostCard>
      ))}
    </div>
  );
};

export default PostGrid;
