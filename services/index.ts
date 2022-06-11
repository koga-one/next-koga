import { request, gql } from "graphql-request";
import {
  TPost,
  TCategory,
  TUrl,
  TAuthor,
  TComment,
  TContent,
  TPage,
} from "../components";

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;
const unsplashAPI = process.env.NEXT_PUBLIC_UNSPLASH_ENDPOINT;
const unsplashAccessKey = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;
export const postsPerPage = 8;

export const getImage = async (id: string) => {
  const result = await fetch(
    `${unsplashAPI!}/photos/${id}?client_id=${unsplashAccessKey!}`
  );

  return result.json();
};

export const getAllPosts = async () => {
  type Wrapper = {
    postsConnection: {
      edges: { node: TPost }[];
    };
  };

  const query = gql`
    query MyQuery() {
      postsConnection(
        orderBy: createdAt_DESC
      ) {
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
            extra
            featuredImage {
              url
            }
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

export const getPosts = async (index: number) => {
  type Wrapper = {
    postsConnection: {
      edges: { node: TPost }[];
    };
  };

  const query = gql`
    query MyQuery($skip: Int!, $postsPerPage: Int!) {
      postsConnection(
        orderBy: createdAt_DESC
        skip: $skip
        first: $postsPerPage
      ) {
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
            extra
            featuredImage {
              url
            }
            category {
              name
              slug
            }
          }
        }
      }
    }
  `;

  const skip = postsPerPage * index;

  const result: Wrapper = await request(
    typeof graphqlAPI === "string" ? graphqlAPI : "",
    query,
    { skip, postsPerPage }
  );

  return result.postsConnection.edges;
};

export const amountOfPosts = async () => {
  type Wrapper = {
    postsConnection: {
      edges: { node: TPost }[];
    };
  };

  const query = gql`
    query HasNext {
      postsConnection {
        edges {
          node {
            id
          }
        }
      }
    }
  `;

  const result: Wrapper = await request(
    typeof graphqlAPI === "string" ? graphqlAPI : "",
    query
  );

  return result.postsConnection.edges.length;
};

export const getFeaturedPosts = async () => {
  type Wrapper = {
    postsConnection: {
      edges: { node: TPost }[];
    };
  };

  const query = gql`
    query MyQuery {
      postsConnection(orderBy: createdAt_DESC, where: { featuredPost: true }) {
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
            extra
            featuredImage {
              url
            }
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
    posts: TPost[];
  };

  const query = gql`
    query GetPostDetails() {
      posts(
        orderBy: createdAt_DESC
        first: 2
      ) {
        category {
          name
          slug
        }
        excerpt
        createdAt
        slug
        title
        extra
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

export const getSimilarPosts = async (category: string, slug: string) => {
  type Wrapper = {
    posts: TPost[];
  };

  const query = gql`
    query GetPostDetails($slug: String!, $category: String!) {
      posts(
        where: { slug_not: $slug, AND: { category: { slug: $category } } }
        orderBy: createdAt_DESC
        first: 2
      ) {
        excerpt
        title
        extra
        category {
          name
          slug
        }
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
      }
    }
  `;

  const result: Wrapper = await request(
    typeof graphqlAPI === "string" ? graphqlAPI : "",
    query
  );

  return result.categories;
};

export const getCategoryData = async (slug: string) => {
  type Wrapper = {
    category: TCategory;
  };

  const query = gql`
    query GetCategoryData($slug: String!) {
      category(where: { slug: $slug }) {
        subtitle
        name
        slug
      }
    }
  `;

  const result: Wrapper = await request(
    typeof graphqlAPI === "string" ? graphqlAPI : "",
    query,
    { slug }
  );

  return result.category;
};

export const amountOfCategoryPosts = async (slug: string) => {
  type Wrapper = {
    postsConnection: {
      edges: { node: TPost }[];
    };
  };

  const query = gql`
    query HasNext($slug: String!) {
      postsConnection(where: { category: { slug: $slug } }) {
        edges {
          node {
            id
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

  return result.postsConnection.edges.length;
};

export const getCategoryPost = async (slug: string, index: number) => {
  type Wrapper = {
    postsConnection: {
      edges: { node: TPost }[];
    };
  };

  const query = gql`
    query GetCategoryPost($slug: String!, $skip: Int!, $postsPerPage: Int!) {
      postsConnection(
        where: { category: { slug: $slug } }
        skip: $skip
        first: $postsPerPage
        orderBy: createdAt_DESC
      ) {
        edges {
          node {
            author {
              bio
              name
              photo {
                url
              }
            }
            createdAt
            slug
            title
            excerpt
            extra
            featuredImage {
              url
            }
            category {
              name
              slug
            }
          }
        }
      }
    }
  `;

  const skip = postsPerPage * index;

  const result: Wrapper = await request(
    typeof graphqlAPI === "string" ? graphqlAPI : "",
    query,
    { slug, skip, postsPerPage }
  );

  return result.postsConnection.edges;
};

export const getNextPost = async (date: string) => {
  type Wrapper = {
    posts: {
      author: TAuthor;
      createdAt: string;
      slug: string;
      title: string;
      excerpt: string;
      featuredImage: TUrl;
      category: TCategory;
      extra: string;
      content: TContent;
    }[];
  };

  const query = gql`
    query GetNextPost($date: DateTime!) {
      posts(where: { createdAt_gt: $date }, first: 1, orderBy: createdAt_ASC) {
        author {
          bio
          name
          photo {
            url
          }
        }
        createdAt
        slug
        title
        excerpt
        extra
        featuredImage {
          url
        }
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
    { date }
  );

  return result.posts[0];
};

export const getPreviousPost = async (date: string) => {
  type Wrapper = {
    posts: {
      author: TAuthor;
      createdAt: string;
      slug: string;
      title: string;
      excerpt: string;
      featuredImage: TUrl;
      category: TCategory;
      extra: string;
      content: TContent;
    }[];
  };

  const query = gql`
    query GetPreviousPost($date: DateTime!) {
      posts(where: { createdAt_lt: $date }, first: 1, orderBy: createdAt_DESC) {
        author {
          bio
          name
          photo {
            url
          }
        }
        createdAt
        slug
        title
        excerpt
        extra
        featuredImage {
          url
        }
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
    { date }
  );

  return result.posts[0];
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
      category: TCategory;
      extra: string;
      content: TContent;
    };
  };

  const query = gql`
    query GetPostDetails($slug: String!) {
      post(where: { slug: $slug }) {
        author {
          bio
          name
          photo {
            url
          }
        }
        createdAt
        slug
        title
        excerpt
        extra
        featuredImage {
          url
        }
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

export const getAllPages = async () => {
  type Wrapper = {
    pages: TPage[];
  };

  const query = gql`
    query GetPages {
      pages {
        slug
        subtitle
        title
      }
    }
  `;

  const result: Wrapper = await request(
    typeof graphqlAPI === "string" ? graphqlAPI : "",
    query
  );

  return result.pages;
};

export const getPages = async (navbar: boolean) => {
  type Wrapper = {
    pages: TPage[];
  };

  const query = gql`
    query GetPages($navbar: Boolean!) {
      pages(where: { navbar: $navbar }) {
        slug
        subtitle
        title
      }
    }
  `;

  const result: Wrapper = await request(
    typeof graphqlAPI === "string" ? graphqlAPI : "",
    query,
    { navbar }
  );

  return result.pages;
};

export const getPageDetails = async (slug: string) => {
  type Wrapper = {
    page: TPage;
  };

  const query = gql`
    query GetPageDetails($slug: String!) {
      page(where: { slug: $slug }) {
        subtitle
        title
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

  return result.page;
};
