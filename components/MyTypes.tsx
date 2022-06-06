import { NodeRendererType } from "@graphcms/rich-text-react-renderer";
import { RichTextContent } from "@graphcms/rich-text-types";

export type TPost = {
  createdAt: string;
  slug: string;
  title: string;
  featuredImage: TUrl;
  author: TAuthor;
  categories: TCategory[];
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