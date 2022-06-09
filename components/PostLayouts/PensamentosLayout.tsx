import {
  TAuthor,
  TCategory,
  TContent,
  PageWrapper,
  PostDetail,
  Author,
  CommentsForm,
  Comments,
  RelatedPosts,
  Categories,
  TUrl,
} from "../";

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
  const extra: { spotify: string } = JSON.parse(post.extra!);

  return (
    <PageWrapper title={post.title}>
      <div className="container mx-auto">
        <div className="mx-2 grid min-h-screen grid-cols-1 gap-2 lg:grid-cols-12 lg:gap-8">
          <div className="col-span-1 lg:col-span-8">
            <iframe
              className="h-[50vh] rounded-xl lg:h-[40vh]"
              src={`https://open.spotify.com/embed/track/${extra.spotify}`}
              width="100%"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            ></iframe>
            <PostDetail post={post} />
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
