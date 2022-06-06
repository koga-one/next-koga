import { request, gql } from "graphql-request";
import { TPost, TCategory, TUrl, TAuthor, TComment } from "../components";

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
            featuredImage {
              url
            }
            categories {
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
      featuredImage: TUrl;
      createdAt: string;
      slug: string;
    }[];
  };

  const query = gql`
    query GetPostDetails() {
      posts(
        orderBy: createdAt_ASC
        last: 3
      ) {
        createdAt
        slug
        title
        featuredImage {
          url
        }
      }
    }
  `;

  const result: Wrapper = await request(
    typeof graphqlAPI === "string" ? graphqlAPI : "",
    query
  );

  return result.posts;
};

export const getSimilarPosts = async (categories: string[], slug: string) => {
  type Wrapper = {
    posts: {
      title: string;
      featuredImage: TUrl;
      createdAt: string;
      slug: string;
    }[];
  };

  const query = gql`
    query GetPostDetails($slug: String!, $categories: [String!]) {
      posts(
        where: {
          slug_not: $slug
          AND: { categories_some: { slug_in: $categories } }
        }
        last: 3
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `;

  const result: Wrapper = await request(
    typeof graphqlAPI === "string" ? graphqlAPI : "",
    query,
    { categories, slug }
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
      }
    }
  `;

  const result: Wrapper = await request(
    typeof graphqlAPI === "string" ? graphqlAPI : "",
    query
  );

  return result.categories;
};

export const getPostDetails = async (slug: string) => {
  type Wrapper = {
    post: {
      author: TAuthor;
      createdAt: string;
      slug: string;
      title: string;
      excerpt: string;
      featuredImage: TUrl;
      categories: TCategory[];
      content: { raw: string };
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
        featuredImage {
          url
        }
        categories {
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

export const submitComment = async (obj) => {
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
