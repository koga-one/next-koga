import { RichText } from "@graphcms/rich-text-react-renderer";
import { RichTextContent } from "@graphcms/rich-text-types";
import { useEffect, useState } from "react";
import {
  TAuthor,
  TCategory,
  TContent,
  PageWrapper,
  Author,
  CommentsForm,
  Comments,
  RelatedPosts,
  Categories,
  TUrl,
} from "../";
import { PostHeader } from "../PostDetails";

type Props = {
  post: {
    author: TAuthor;
    createdAt: string;
    slug: string;
    title: string;
    excerpt: string;
    featuredImage: TUrl;
    category: TCategory;
    content: TContent;
    extra: string;
  };
};

const PensamentosLayout = ({ post }: Props) => {
  const [raw, setRaw] = useState<RichTextContent>([]);
  useEffect(() => {
    setRaw(post.content.raw);
  }, []);
  const extra: { spotify: string } = JSON.parse(post.extra!);

  return (
    <PageWrapper title={post.title}>
      <div className="container mx-auto">
        <div className="mx-2 grid min-h-screen grid-cols-1 gap-2 lg:grid-cols-12 lg:gap-8">
          <div className="col-span-1 lg:col-span-8">
            <div className="rounded-xl border bg-[#fff] shadow-lg dark:bg-[#000]">
              <iframe
                className="h-[54vh] rounded-xl lg:h-[40vh]"
                src={`https://open.spotify.com/embed/track/${extra.spotify}`}
                width="100%"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              ></iframe>
              <div className="overflow-hidden py-8 px-4 lg:p-8">
                <article>
                  <h1 className="-m-16 mb-4 max-h-[8ch] overflow-hidden break-all text-center font-fira text-3xl font-semibold lg:mb-8 lg:text-left lg:text-6xl">
                    {post.title} {post.title} {post.title} {post.title}{" "}
                    {post.title} {post.title} {post.title} {post.title}{" "}
                    {post.title} {post.title} {post.title} {post.title}{" "}
                    {post.title} {post.title} {post.title} {post.title}{" "}
                  </h1>
                  <PostHeader
                    createdAt={post.createdAt}
                    authorUrl={post.author.photo.url}
                    authorName={post.author.name}
                    categoryName={post.category.name}
                  />
                  <div className="rich-text">
                    <RichText
                      content={raw}
                      renderers={{
                        code_block: ({ children }) => <pre>{children}</pre>,
                      }}
                    />
                  </div>
                </article>
              </div>
            </div>
            <Author author={post.author} />
            <CommentsForm slug={post.slug} />
            <Comments slug={post.slug} />
          </div>
          <div className="col-span-1 lg:col-span-4">
            <div className="relative lg:sticky lg:top-8">
              <RelatedPosts category={post.category} slug={post.slug} />
              <div className="mb-2 lg:mb-8"></div>
              <Categories />
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default PensamentosLayout;
