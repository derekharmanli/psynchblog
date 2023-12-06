import Head from 'next/head';
import { PostCard, PostWidget, PostWidget2, Categories } from '../components';
import { FeaturedPosts } from '../public/sections/index';
import { GetPosts } from '../services';

export default function Home({ posts }) {
  return (
    <div className="container mx-auto px-10 mb-8">
      <FeaturedPosts />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 col-span-1">
          {posts.map((post) => (
            <div className="embossed p-4 mb-4" key={post.title}>
              <PostCard post={post.node} />
            </div>
          ))}
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
  );
}

export async function getStaticProps() {
  const posts = (await GetPosts()) || [];
  return {
    props: { posts },
  };
}
