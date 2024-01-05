import React, { useState, useEffect } from "react";
import { PostCard, Sidebar, GoToTop, Loader, Layout } from "../components";
import InfiniteScroll from "react-infinite-scroll-component";
import Head from "next/head";
import { FeaturedPosts } from "../public/sections/index";
import { GetPosts } from "../services";

export default function Podcasts({ initialPosts }) {
  const [posts, setPosts] = useState(initialPosts.edges);
  const [hasMore, setHasMore] = useState(initialPosts.pageInfo.hasNextPage);
  const [afterCursor, setAfterCursor] = useState(
    initialPosts.pageInfo.endCursor
  );

  const fetchMorePosts = async () => {
    if (!hasMore) return;

    const newPosts = await GetPosts(10, afterCursor);
    setPosts([...posts, ...newPosts.edges]);
    setHasMore(newPosts.pageInfo.hasNextPage);
    setAfterCursor(newPosts.pageInfo.endCursor);
  };

  return (
    <Layout>
      <Head>
        <title>Psynch Podcasts</title>
      </Head>
      <div className="container mx-auto px-10 mb-8">
        <FeaturedPosts />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-11 col-span-1">
            <InfiniteScroll
              dataLength={posts.length}
              next={fetchMorePosts}
              hasMore={hasMore}
              loader={<Loader />}
            >
              {posts.map(({ node }) => (
                <div className="embossed p-4 mb-4" key={node.title}>
                  <PostCard post={node} />
                </div>
              ))}
            </InfiniteScroll>
          </div>
        </div>
      </div>
      <Sidebar location="podcasts" />
      <GoToTop />
    </Layout>
  );
}

export async function getStaticProps() {
  const initialPosts = await GetPosts(10);
  return {
    props: { initialPosts },
  };
}
