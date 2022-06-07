import React from "react";
import { TAuthor } from "./";
import Image from "next/image";

type Props = {
  author: TAuthor;
};

const Author = ({ author }: Props) => {
  return (
    <div className="relative mt-2 rounded-xl px-4 py-8 shadow-lg dark:bg-kami dark:bg-opacity-5 lg:mt-8 lg:p-8">
      <div className="mb-4 flex place-content-center">
        <Image
          unoptimized
          alt={author.name}
          height="120px"
          width="120px"
          className="rounded-full align-middle"
          src={author.photo.url}
        />
      </div>
      <h3 className="text-white my-4 text-center text-xl font-semibold lg:text-3xl">
        {author.name}
      </h3>
      <p className="text-center lg:text-lg">{author.bio}</p>
    </div>
  );
};

export default Author;
