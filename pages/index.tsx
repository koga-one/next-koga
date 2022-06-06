import type { NextPage } from "next";
import Head from "next/head";
import { PostCard, Categories, PostWidget, TPost } from "../components";
import { getPosts } from "../services";
import React, { useState, useEffect } from "react";

const Home: NextPage = () => {
  type PostsWrapper = { node: TPost }[];

  const [posts, setPosts] = useState<PostsWrapper>([]);
  useEffect(() => {
    getPosts().then((result) => setPosts(result));
  }, []);

  return (
    <div className="container mx-auto mb-8 px-10">
      <Head>
        <title>CMS Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        <div className="col-span-1 lg:col-span-8">
          {posts.map((post) => (
            <PostCard post={post.node} key={post.node.title}></PostCard>
          ))}
        </div>
        <div className="col-span-1 lg:col-span-4">
          <div className="relative top-8 lg:sticky">
            <PostWidget />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
