import React, { useState, useEffect } from "react";
import {
  PostCard,
  PostWidget,
  PostWidget2,
  Categories,
  Loader,
  Layout,
} from "../components";
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
  const [showTopBtn, setShowTopBtn] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 300) {
      setShowTopBtn(true);
    } else {
      setShowTopBtn(false);
    }
  };
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const fetchMorePosts = async () => {
    if (!hasMore) return;

    const newPosts = await GetPosts(10, afterCursor);
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
        <FeaturedPosts />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-12 col-span-1">
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
        } lg:col-span-4 col-span-1 fixed right-0 top-0 h-full shadow-lg`}
      >
        <div className="text-xl bg-pink-600 p-2 rounded-full text-white text-center font-semibold mt-2 mb-4 mr-8">
          Sidebar
        </div>
        <div className="lg:sticky relative top-8">
          <div className="embossed mb-4 mr-8 p-4">
            <PostWidget />
          </div>
          <div className="embossed mb-4 mr-8 p-4">
            <PostWidget2 />
          </div>
          <div className="embossed mr-8">
            <Categories />
          </div>
        </div>
      </div>
      {showTopBtn && (
        <button
          onClick={goToTop}
          className="fixed bottom-10 left-10 cursor-pointer
                     text-white bg-pink-600 hover:bg-indigo-900 
                     transition duration-500 ease-in-out 
                     h-12 w-32 rounded-full flex items-center justify-center 
                     text-lg font-semibold z-50"
        >
          ↑ Go to Top
        </button>
      )}
    </Layout>
  );
}

export async function getStaticProps() {
  const initialPosts = await GetPosts(10);
  return {
    props: { initialPosts },
  };
}
