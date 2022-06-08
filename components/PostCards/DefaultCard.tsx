import { TCardProps } from "../";
import Image from "next/image";

const DefaultCard = ({ className, post, children }: TCardProps) => {
  return (
    <div className={className}>
      {children}
      <div className="mt-2 flex flex-row rounded-xl border dark:bg-katsu">
        <div className="relative min-h-[100px] min-w-[100px]">
          {/* <Image
            className="rounded-xl"
            src={post.featuredImage.url}
            layout="fill"
            sizes="50vw"
          /> */}
        </div>
        <div className="px-4 py-2">
          <h2 className="text-xl">{post.title}</h2>
          <p>{post.excerpt}</p>
        </div>
      </div>
    </div>
  );
};

export default DefaultCard;
