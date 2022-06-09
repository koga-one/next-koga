import Image from "next/image";

type Props = {
  featuredUrl: string;
};

const PostImage = ({ featuredUrl }: Props) => {
  return (
    <div className="relative h-[60vh] w-full overflow-hidden rounded-xl lg:h-[40vh]">
      <Image
        priority
        className="card-image"
        src={featuredUrl}
        quality={80}
        layout={"fill"}
      />
    </div>
  );
};

export default PostImage;
