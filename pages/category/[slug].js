import React, { useState, useEffect } from "react";

import { useRouter } from "next/router";
import InfiniteScroll from "react-infinite-scroll-component";

import { GetCategories, GetCategoryPost } from "../../services";
import { PostCard, Categories, Loader, Layout } from "../../components";
import Head from "next/head";
const CategoryPost = ({ initialPosts = { edges: [], pageInfo: {} } }) => {
  const router = useRouter();
  const [posts, setPosts] = useState(initialPosts.edges);
  const [hasMore, setHasMore] = useState(initialPosts.pageInfo.hasNextPage);
  const [afterCursor, setAfterCursor] = useState(
    initialPosts.pageInfo.endCursor
  );
  const [showTopBtn, setShowTopBtn] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
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
        {/* Toggle Button for Sidebar */}
        <button
          onClick={toggleSidebar}
          className="fixed right-10 top-1/2 transform -translate-y-1/2 
                     z-50 bg-pink-600 hover:bg-indigo-900 text-white font-bold 
                     py-2 px-4 rounded"
        >
          {isSidebarOpen ? "→" : "←"}
        </button>

        {/* Sidebar */}
        <div
          className={`transition-transform duration-300 flex flex-col justify-center ${
            isSidebarOpen ? "translate-x-0" : "translate-x-full"
          } lg:col-span-4 col-span-1 fixed right-0 top-0 h-full`}
        >
          <div className="text-xl bg-pink-600 p-2 rounded-full text-white text-center font-semibold mt-2 mb-4 mr-8">
            Sidebar
          </div>
          <div className="lg:sticky relative top-8">
            <div className="embossed mr-8">
              <Categories />
            </div>
          </div>
        </div>
        {showTopBtn && (
          <button
            onClick={goToTop}
            className="fixed bottom-10 left-10 cursor-pointer text-white bg-pink-600 hover:bg-indigo-900 transition duration-500 ease-in-out h-12 w-32 rounded-full flex items-center justify-center text-lg font-semibold z-50"
          >
            ↑ Go to Top
          </button>
        )}
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
