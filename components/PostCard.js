import React from "react";
import moment from "moment";
import Link from "next/link";

const PostCard = ({ post }) => {
  return (
    <>
      <div className="bg-white rounded-lg p-0 lg:p-8 pb-12 mb-8">
        <div className="relative overflow-hidden shadow-md pb-80 mb-6">
          <Link href={`/post/${post.slug}`}>
            <img
              src={post.featuredImage.url}
              alt={post.title}
              className="object-top absolute h-80 w-full object-cover shadow-lg rounded-t-lg lg:rounded-lg"
            />
          </Link>
        </div>
        <h1 className="transition duration-700 text-center mb-8 cursor-pointer hover:text-pink-600 text-3xl font-semibold">
          <Link className="text-shadow" href={`/post/${post.slug}`}>
            {post.title}
          </Link>
        </h1>
        <div className="block flex-col text-center justify-center mb-8 w-full">
          <div className="flex lg:justify-center mb-4 w-full lg:w-auto">
            <div className="flex lg:items-center">
              <img
                alt={post.author.name}
                height="30px"
                width="30px"
                className="rounded-full"
                src={post.author.photo.url}
              />
              <p className="inline text-gray-700 lg:ml-2 ml-10 text-lg">
                {post.author.name}
              </p>
            </div>
          </div>
          <div className="flex lg:items-center lg:justify-center mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 inline text-pink-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span className="lg:ml-2 ml-12">
              {moment(post.createdAt).format("MMM DD, YYYY")}
            </span>
          </div>
          <div className="flex items-center lg:justify-center">
            <img
              alt={post.categories[0].name}
              height="30px"
              width="30px"
              className="rounded-full"
              src={post.categories[0].picture.url}
            />
            <span
              className={`ml-${
                post.categories[0].name.length > 10 ? "10" : "1"
              } lg:ml-2`}
            >
              {post.categories[0].name}
            </span>
          </div>
        </div>

        <p className="text-center text-lg text-gray-700 font-normal px-4 lg:px-20 mb-8">
          {post.excerpt}
        </p>
        <div className="text-center">
          <Link href={`/post/${post.slug}`}>
            <span className="transition duration-500 transform hover:-translate-y-1 inline-block bg-pink-600 text-lg font-medium rounded-full text-white px-8 py-3 cursor-pointer">
              Continue Reading
            </span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default PostCard;
