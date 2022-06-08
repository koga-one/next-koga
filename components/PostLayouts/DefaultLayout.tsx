import {
  TAuthor,
  TCategory,
  TContent,
  PageWrapper,
  PostDetail,
  Author,
  CommentsForm,
  Comments,
  PostWidget,
  Categories,
} from "../";

type Props = {
  post: {
    author: TAuthor;
    createdAt: string;
    slug: string;
    title: string;
    excerpt: string;
    imageLink: string;
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
            <PostDetail post={post} />
            <Author author={post.author} />
            <CommentsForm slug={post.slug} />
            <Comments slug={post.slug} />
          </div>
          <div className="col-span-1 lg:col-span-4">
            <div className="relative lg:sticky lg:top-8">
              <PostWidget category={post.category} slug={post.slug} />
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
