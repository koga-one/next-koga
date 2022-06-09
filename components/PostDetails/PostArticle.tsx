import React from "react";
import { RichText } from "@graphcms/rich-text-react-renderer";
import { RichTextContent } from "@graphcms/rich-text-types";

type Props = {
  raw: RichTextContent;
  title: string;
};

const PostArticle = ({ raw, title }: Props) => {
  return (
    <article>
      <h1 className="mb-6 text-center text-3xl font-semibold lg:mb-12 lg:text-left lg:text-6xl">
        {title}
      </h1>
      <div className="rich-text">
        <RichText
          content={raw}
          renderers={{
            code_block: ({ children }) => <pre>{children}</pre>,
          }}
        />
      </div>
    </article>
  );
};

export default PostArticle;
