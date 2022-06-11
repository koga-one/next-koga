import { RichText } from "@graphcms/rich-text-react-renderer";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
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
import { PostNeighbors } from "../PostDetails";

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
  return (
    <PageWrapper title={post.title}>
      <div className="container mx-auto">
        <div className="mx-2 grid min-h-screen grid-cols-1 gap-2 lg:grid-cols-12 lg:gap-8">
          <div className="col-span-1 lg:col-span-8">
            <div className="mb-2">
              <PostNeighbors createdAt={post.createdAt} />
            </div>
            <div className="rounded-xl border bg-[#fff] shadow-lg dark:bg-[#000]">
              <iframe
                className="h-[40vh] rounded-xl"
                src={`https://open.spotify.com/embed/track/${post.extra!}`}
                width="100%"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              ></iframe>
              <div className="overflow-hidden py-8 px-4 lg:p-8">
                <article>
                  <h1 className="-m-16 mb-8 max-h-[12ch] overflow-hidden break-all text-center font-fira text-4xl font-semibold lg:mb-12 lg:max-h-[9ch] lg:text-left lg:text-6xl">
                    {post.title} {post.title} {post.title} {post.title}{" "}
                    {post.title} {post.title} {post.title} {post.title}{" "}
                    {post.title} {post.title} {post.title} {post.title}{" "}
                    {post.title} {post.title} {post.title} {post.title}{" "}
                    {post.title} {post.title} {post.title} {post.title}{" "}
                    {post.title} {post.title} {post.title} {post.title}{" "}
                  </h1>
                  <div className="mb-8">
                    <p className="text-right text-xs">
                      confused? check the original post{" "}
                      <Link href="/post/opa-os-meus-pensamentos-escaparam">
                        <a className="underline">here</a>
                      </Link>
                    </p>
                  </div>
                  <div className="rich-text">
                    <RichText
                      content={post.content.raw}
                      renderers={{
                        code_block: ({ children }) => <pre>{children}</pre>,
                      }}
                    />
                  </div>
                </article>
                <div className="mt-8 flex flex-wrap items-center justify-center gap-2 lg:justify-start">
                  <span className="rounded-lg bg-gure px-4 text-sm font-semibold text-katsu lg:order-2 lg:text-base">
                    {moment(post.createdAt).format("MMM DD, YYYY")}
                  </span>
                  <div className="lg:order-0 h-10">
                    <Image
                      src={post.author.photo.url}
                      alt={post.author.name}
                      className="rounded-full"
                      height="40px"
                      width="40px"
                      layout="fixed"
                    />
                  </div>
                  <span className="hidden rounded-lg bg-gure px-4 text-sm font-semibold text-katsu lg:order-1 lg:inline lg:text-base">
                    {post.author.name}
                  </span>
                  <Link href={`/category/${post.category.slug}`}>
                    <a className="lg:order-4">
                      <span className="rounded-lg border border-katsu px-4 text-sm font-semibold dark:border-kami dark:text-kami lg:text-base">
                        {post.category.name}
                      </span>
                    </a>
                  </Link>
                </div>
              </div>
            </div>
            <div className="mt-2">
              <PostNeighbors createdAt={post.createdAt} />
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
