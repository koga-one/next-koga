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
import { PostArticle, PostHeader, PostImage } from "../PostDetails";

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
  };
};

const DefaultLayout = ({ post }: Props) => {
  return (
    <PageWrapper title={post.title}>
      <div className="container mx-auto">
        <div className="mx-2 grid min-h-screen grid-cols-1 gap-2 lg:grid-cols-12 lg:gap-8">
          <div className="col-span-1 lg:col-span-8">
            <div className="rounded-xl shadow-lg dark:bg-kami dark:bg-opacity-5">
              <div className="overflow-hidden">
                <PostImage featuredUrl={post.featuredImage.url} />
              </div>
              <div className="py-8 px-4 lg:p-8">
                <PostHeader
                  createdAt={post.createdAt}
                  authorUrl={post.author.photo.url}
                  authorName={post.author.name}
                  categoryName={post.category.name}
                />
                <PostArticle raw={post.content.raw} title={post.title} />
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

export default DefaultLayout;
