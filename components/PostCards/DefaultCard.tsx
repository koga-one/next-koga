import { TCardProps } from "../";
import Image from "next/image";

const DefaultCard = ({ className, post, children }: TCardProps) => {
  return (
    <div className={className}>
      {children}
      <div className="mt-2 flex flex-row rounded-xl border">
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
      </div>
    </div>
  );
};

export default DefaultCard;
