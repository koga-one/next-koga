import { RichTextContent } from "@graphcms/rich-text-types";

export type TPost = {
  createdAt: string;
  slug: string;
  title: string;
  featuredImage: TUrl;
  imageLink?: string;
  author?: TAuthor;
  extra?: string;
  category?: TCategory;
  excerpt: string;
};

export type TAuthor = {
  bio: string;
  id: string;
  name: string;
  photo: TUrl;
};

export type TCategory = {
  name: string;
  slug: string;
  subtitle: string;
};

export type TUrl = {
  url: string;
};

export type TContent = {
  raw: RichTextContent;
};

export type TComment = {
  name: string;
  createdAt: string;
  comment: string;
};

type ChildrenType = { children: string };

export type TCardProps = {
  post: TPost;
};

export type TPage = {
  title: string;
  subtitle: string;
  slug?: string;
  content?: TContent;
  navbar?: boolean;
};
