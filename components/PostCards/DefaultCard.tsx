import { TCardProps } from "../";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getImage } from "../../services";

const DefaultCard = ({ className, post, children }: TCardProps) => {
  return (
    <div className={className}>
      {children}
      <div className="mt-2 flex flex-row rounded-xl border dark:bg-katsu">
        <div className="relative min-h-[120px] w-[120px] min-w-[60px] overflow-hidden rounded-xl">
          <div className="absolute right-1/2 h-full translate-x-1/2">
            <Image
              className="card-image"
              src={post.featuredImage.url}
              height={120}
              width={120}
              quality={50}
              layout={"fixed"}
            />
          </div>
        </div>
        <div className="px-4 py-2">
          <h2 className="text-xl lg:text-2xl">{post.title}</h2>
          <p>{post.excerpt}</p>
        </div>
      </div>
    </div>
  );
};

export default DefaultCard;
