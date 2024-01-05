import React, { useState, useEffect } from "react";

import { useRouter } from "next/router";
import InfiniteScroll from "react-infinite-scroll-component";

import { GetCategories, GetCategoryPost } from "../../services";
import { PostCard, Sidebar, GoToTop, Loader, Layout } from "../../components";
import Head from "next/head";
const CategoryPost = ({ initialPosts = { edges: [], pageInfo: {} } }) => {
  const router = useRouter();
  const [posts, setPosts] = useState(initialPosts.edges);
  const [hasMore, setHasMore] = useState(initialPosts.pageInfo.hasNextPage);
  const [afterCursor, setAfterCursor] = useState(
    initialPosts.pageInfo.endCursor
  );

  useEffect(() => {
    const fetchPosts = async () => {
      if (!router.query.slug) return;
      const newPosts = await GetCategoryPost(router.query.slug, 10);
      setPosts(newPosts.edges);
      setHasMore(newPosts.pageInfo.hasNextPage);
      setAfterCursor(newPosts.pageInfo.endCursor);
    };

    fetchPosts();
  }, [router.query.slug]);

  if (router.isFallback) {
    return <Loader />;
  }
  if (!initialPosts || !initialPosts.edges) {
    return <div>No posts available</div>;
  }
  const fetchMorePosts = async () => {
    if (!hasMore) return;

    const newPosts = await GetCategoryPost(router.query.slug, 10, afterCursor);
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="col-span-1 lg:col-span-12">
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
        <Sidebar location="categoryslug" />
        <GoToTop />
      </div>
    </Layout>
  );
};
export async function getStaticProps({ params }) {
  const initialPosts = await GetCategoryPost(params.slug, 10);
  return {
    props: { initialPosts },
  };
}

export async function getStaticPaths() {
  const categories = await GetCategories();
  return {
    paths: categories.map(({ slug }) => ({ params: { slug } })),
    fallback: true,
  };
}
export default CategoryPost;
