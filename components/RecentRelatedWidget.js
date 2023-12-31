import React, { useState, useEffect } from "react";
import moment from "moment";

import Link from "next/link";

import { GetRecentPosts, GetSimilarPosts } from "../services";

const RecentRelatedWidget = ({ categories, slug }) => {
  const [relatedPosts, setRelatedPosts] = useState([]);
  useEffect(() => {
    if (slug) {
      GetSimilarPosts(categories, slug).then((result) =>
        setRelatedPosts(result)
      );
    } else {
      GetRecentPosts().then((result) => setRelatedPosts(result));
    }
  }, [slug]);
  return (
    <div className="bg-white rounded-lg p-8 pb-12 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b-4 pb-1 text-shadow-md">
        {slug ? "Related Posts" : "Recent Posts"}
      </h3>
      {relatedPosts.map((post) => (
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
              {moment(post.createdAt).format("MMM DD, YYYY")}
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

export default RecentRelatedWidget;
