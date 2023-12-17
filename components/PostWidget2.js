import React, { useState, useEffect } from "react";
import moment from "moment";

import Link from "next/link";

import { GetLatestPosts } from "../services";

const PostWidget2 = () => {
  const [latestPosts, setLatestPosts] = useState([]);
  useEffect(() => {
    GetLatestPosts().then((result) => {
      setLatestPosts(result);
    });
  }, []);
  return (
    <div className="bg-white rounded-lg p-8 pb-12 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b-4 pb-1 text-shadow-md">
        {"Newest Media"}
      </h3>
      {latestPosts.map((post) => (
        <div key={post.title} className="flex items-center w-full mb-4">
          <div className="w-16 flex-none">
            <Link href={`/post/${post.slug}`}>
              <img
                alt={post.title}
                height="50px"
                width="50px"
                className="align-middle rounded-full"
                src={post.featuredImage.url}
              />
            </Link>
          </div>
          <div className="flex-grow ml-4">
            <p className="text-gray-500 font-xs">
              {moment(post.dateOfPodcast).format("MMM DD, YYYY")}
            </p>
            <Link
              href={`/post/${post.slug}`}
              className="text-md"
              key={post.title}
            >
              {post.title}
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostWidget2;
