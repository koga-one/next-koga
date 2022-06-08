import { TCardProps } from "../";

const PensamentosCard = ({ post }: TCardProps) => {
  return (
    <div className="h-full bg-[#fff] dark:bg-[#000]">
      <iframe
        className="rounded-xl"
        src={post.extra!.spotify}
        width="100%"
        height="80"
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      ></iframe>
      <div className="max-h-24 overflow-hidden">
        <h2 className="-mx-8 -my-4 self-center break-all font-fira text-xl lg:text-2xl">
          {post.title} {post.title} {post.title} {post.title} {post.title}{" "}
          {post.title} {post.title} {post.title} {post.title} {post.title}{" "}
          {post.title} {post.title} {post.title} {post.title} {post.title}{" "}
        </h2>
      </div>
    </div>
  );
};

export default PensamentosCard;
