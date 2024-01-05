import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import {
  PostDetail,
  Sidebar,
  Author,
  Comments,
  CommentsForm,
  Loader,
  Layout,
} from "../../components";
import { GetPosts, GetPostDetails } from "../../services";
import { AdjacentPosts } from "../../public/sections/index";

const PostDetails = ({ post }) => {
  const router = useRouter();
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (router.isFallback) {
    return <Loader />;
  }

  const handleScroll = () => {
    if (window.scrollY > 300) {
      setShowTopBtn(true);
    } else {
      setShowTopBtn(false);
    }
  };

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <Layout>
      <div className="container mx-auto px-10 mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="col-span-1 lg:col-span-12">
            <PostDetail post={post} />
            <Author author={post.author} />
            <AdjacentPosts slug={post.slug} createdAt={post.createdAt} />
            <CommentsForm slug={post.slug} />
            <Comments slug={post.slug} />
          </div>
        </div>
      </div>
      <Sidebar location={"postslug"} />
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
};
export default PostDetails;

// Fetch data at build time
export async function getStaticProps({ params }) {
  const data = await GetPostDetails(params.slug);
  return {
    props: {
      post: data,
    },
  };
}

// Specify dynamic routes to pre-render pages based on data.
// The HTML is generated at build time and will be reused on each request.
export async function getStaticPaths() {
  const postsConnection = await GetPosts();
  const posts = postsConnection.edges;

  return {
    paths: posts.map(({ node: { slug } }) => ({ params: { slug } })),
    fallback: true,
  };
}
