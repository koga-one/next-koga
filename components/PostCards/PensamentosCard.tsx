import { TCardProps } from "../";
import Image from "next/image";

const PensamentosCard = ({ className, post, children }: TCardProps) => {
  return (
    <div
      className={`flex flex-row place-items-center justify-center rounded-xl border ${className}`}
    >
      <Image
        className="rounded-xl"
        src={post.featuredImage.url}
        width="100px"
        height="100px"
        layout="intrinsic"
      />
      <div className="flex flex-col px-4 py-2">
        <h2 className="text-lg">{post.title}</h2>
        <p>{post.excerpt}</p>
      </div>
      {children}
    </div>
  );
};

export default PensamentosCard;
