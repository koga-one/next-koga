import { TCardProps } from "../";

const PensamentosCard = ({ post }: TCardProps) => {
  return (
    <div className="h-full bg-[#fff] dark:bg-[#000]">
      <iframe
        className="rounded-lg"
        src={`https://open.spotify.com/embed/track/${post.extra!}`}
        width="100%"
        height="80"
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      ></iframe>
      <div className="max-h-24 overflow-hidden">
        <h2 className="text-md -mx-8 -my-2 self-center break-all font-fira lg:text-xl">
          {post.title} {post.title} {post.title} {post.title} {post.title}{" "}
          {post.title} {post.title} {post.title} {post.title} {post.title}{" "}
          {post.title} {post.title} {post.title} {post.title} {post.title}{" "}
          {post.title} {post.title} {post.title} {post.title} {post.title}{" "}
          {post.title} {post.title} {post.title} {post.title} {post.title}{" "}
          {post.title} {post.title} {post.title} {post.title} {post.title}{" "}
          {post.title} {post.title} {post.title} {post.title} {post.title}{" "}
          {post.title} {post.title} {post.title} {post.title} {post.title}{" "}
        </h2>
      </div>
    </div>
  );
};

export default PensamentosCard;
