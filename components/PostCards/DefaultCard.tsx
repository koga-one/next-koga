import { TCardProps } from "../";
import Image from "next/image";

const DefaultCard = ({ post }: TCardProps) => {
  return (
    <div className="h-full">
      <div className="relative min-h-[120px] w-full overflow-hidden rounded-xl lg:min-h-[80px]">
        <Image
          className="card-image"
          src={post.featuredImage.url}
          quality={50}
          layout={"fill"}
        />
      </div>
      <div className="p-4">
        <h2 className="mb-1 text-2xl">{post.title}</h2>
        <p>{post.excerpt}</p>
      </div>
    </div>
  );
};

export default DefaultCard;
