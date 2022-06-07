import DefaultLayout from "./DefaultLayout";
import { TAuthor, TUrl, TCategory, TContent } from "../";

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

const PensamentosLayout = ({ post }: Props) => {
  return <DefaultLayout post={post}></DefaultLayout>;
};

export default PensamentosLayout;
