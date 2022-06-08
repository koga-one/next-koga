import { request, gql } from "graphql-request";
import {
  TPost,
  TCategory,
  TUrl,
  TAuthor,
  TComment,
  TContent,
} from "../components";

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export const getPosts = async () => {
  type Wrapper = {
    postsConnection: {
      edges: { node: TPost }[];
    };
  };

  const query = gql`
    query MyQuery {
      postsConnection {
        edges {
          node {
            author {
              bio
              name
              id
              photo {
                url
              }
            }
            createdAt
            slug
            title
            excerpt
            imageLink
            category {
              name
              slug
            }
          }
        }
      }
    }
  `;

  const result: Wrapper = await request(
    typeof graphqlAPI === "string" ? graphqlAPI : "",
    query
  );

  return result.postsConnection.edges;
};

export const getRecentPosts = async () => {
  type Wrapper = {
    posts: {
      title: string;
      imageLink: string;
      createdAt: string;
      slug: string;
      excerpt: string;
    }[];
  };

  const query = gql`
    query GetPostDetails() {
      posts(
        orderBy: createdAt_ASC
        last: 3
      ) {
        excerpt
        createdAt
        slug
        title
        imageLink
      }
    }
  `;

  const result: Wrapper = await request(
    typeof graphqlAPI === "string" ? graphqlAPI : "",
    query
  );

  return result.posts;
};

export const getSimilarPosts = async (category: string, slug: string) => {
  type Wrapper = {
    posts: {
      title: string;
      imageLink: string;
      createdAt: string;
      slug: string;
      excerpt: string;
    }[];
  };

  const query = gql`
    query GetPostDetails($slug: String!, $category: String!) {
      posts(
        where: { slug_not: $slug, AND: { category: { slug: $category } } }
        last: 3
      ) {
        excerpt
        title
        imageLink
        createdAt
        slug
      }
    }
  `;

  const result: Wrapper = await request(
    typeof graphqlAPI === "string" ? graphqlAPI : "",
    query,
    { category, slug }
  );

  return result.posts;
};

export const getCategories = async () => {
  type Wrapper = {
    categories: TCategory[];
  };

  const query = gql`
    query GetCategories {
      categories {
        name
        slug
        subtitle
      }
    }
  `;

  const result: Wrapper = await request(
    typeof graphqlAPI === "string" ? graphqlAPI : "",
    query
  );

  return result.categories;
};

export const getCategoryPost = async (slug: string) => {
  type Wrapper = {
    postsConnection: {
      edges: { node: TPost }[];
    };
  };

  const query = gql`
    query GetCategoryPost($slug: String!) {
      postsConnection(where: { category: { slug: $slug } }) {
        edges {
          node {
            author {
              bio
              name
              id
              photo {
                url
              }
            }
            createdAt
            slug
            title
            excerpt
            imageLink
            category {
              name
              slug
            }
          }
        }
      }
    }
  `;

  const result: Wrapper = await request(
    typeof graphqlAPI === "string" ? graphqlAPI : "",
    query,
    { slug }
  );

  return result.postsConnection.edges;
};

export const getPostDetails = async (slug: string) => {
  type Wrapper = {
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

  const query = gql`
    query GetPostDetails($slug: String!) {
      post(where: { slug: $slug }) {
        author {
          bio
          name
          id
          photo {
            url
          }
        }
        createdAt
        slug
        title
        excerpt
        imageLink
        category {
          name
          slug
        }
        content {
          raw
        }
      }
    }
  `;

  const result: Wrapper = await request(
    typeof graphqlAPI === "string" ? graphqlAPI : "",
    query,
    { slug }
  );

  return result.post;
};

type CommentObj = {
  name: string;
  email: string;
  comment: string;
  slug: string;
};

export const submitComment = async (obj: CommentObj) => {
  const result = await fetch("/api/comments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  });

  return result.json();
};

export const getComments = async (slug: string) => {
  type Wrapper = {
    comments: TComment[];
  };

  const query = gql`
    query GetComments($slug: String!) {
      comments(where: { post: { slug: $slug } }) {
        name
        createdAt
        comment
      }
    }
  `;

  const result: Wrapper = await request(
    typeof graphqlAPI === "string" ? graphqlAPI : "",
    query,
    { slug }
  );

  return result.comments;
};
