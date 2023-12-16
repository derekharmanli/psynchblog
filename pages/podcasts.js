//pages/podcasts
import { PostCard, PostWidget, PostWidget2, Categories, Layout} from '../components';
import React, { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Head from 'next/head';
import { FeaturedPosts } from '../public/sections/index';
import { GetPosts } from '../services';


export default function Podcasts({ initialPosts }) {
  const [posts, setPosts] = useState(initialPosts.edges);
  const [hasMore, setHasMore] = useState(initialPosts.pageInfo.hasNextPage);
  const [afterCursor, setAfterCursor] = useState(initialPosts.pageInfo.endCursor);

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
        <div className="lg:col-span-8 col-span-1">
        <InfiniteScroll
          dataLength={posts.length}
          next={fetchMorePosts}
          hasMore={hasMore}
          loader={<div className="loader-spinner"></div>}
        >
          {posts.map(({ node }) => (
            <div className="embossed p-4 mb-4" key={node.title}>
              <PostCard post={node} />
            </div>
          ))}
        </InfiniteScroll>
        </div>
        <div className="lg:col-span-4 col-span-1">
          <div className="lg:sticky relative top-8">
              <div className = "embossed mb-4 p-4">
                 <PostWidget />
              </div>
              <div className = "embossed mb-4 p-4">
                 <PostWidget2 />
              </div>
              <div className = "embossed">
                <Categories />
              </div>
          </div>
        </div>
      </div>
    </div>
    </Layout> 
  );
}

export async function getStaticProps() {
  const initialPosts = await GetPosts(10)
  return {
    props: { initialPosts },
  };
}