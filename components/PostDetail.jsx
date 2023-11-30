import React, { useState } from 'react';
import { RichText } from '@graphcms/rich-text-react-renderer';
import ReactAudioPlayer from 'react-audio-player';
import parse from 'html-react-parser';
import moment from 'moment';

const PostDetail = ({ post }) => {
  const [showTranscript, setShowTranscript] = useState(false);

  const toggleTranscript = () => {
    setShowTranscript(!showTranscript);
  };

  return (
    <>
      <div className="bg-white shadow-lg rounded-lg lg:p-8 pb-12 mb-8">
        <div className="relative overflow-hidden shadow-md mb-6">
          <img
            src={post.featuredImage.url}
            alt=""
            className="object-top h-full w-full object-cover  shadow-lg rounded-t-lg lg:rounded-lg"
          />
        </div>
        <div className="px-4 lg:px-0">
          <div className="flex items-center mb-8 w-full">
            <div className="hidden md:flex items-center justify-center lg:mb-0 lg:w-auto mr-8 items-center">
              <img
                alt={post.author.name}
                height="30px"
                width="30px"
                className="align-middle rounded-full"
                src={post.author.photo.url}
              />
              <p className="inline align-middle text-gray-700 ml-2 font-medium text-lg">{post.author.name}</p>
            </div>
            <div className="font-medium text-gray-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 inline mr-2 text-pink-500"
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
              <span className="align-middle">{moment(post.createdAt).format('MMM DD, YYYY')}</span>
            </div>
          </div>
          <h1 className="text-3xl border-b-4 font-semibold">{post.title}</h1>
        
          <button
            onClick={toggleTranscript}
            className="bg-blue-500 mb-3 text-white px-4 border-b py-2 rounded-md mt-4"
          >
            {showTranscript ? 'Hide Transcript' : 'Show Transcript at Article End'}
          </button>
          <h2 className="text-xl border bg-indigo-500 p-2 text-white text-center font-semibold border-b mb-2">Referenced Podcast</h2>
          <span className="underline">
            {"Podcast Published Date:"}
          </span>
          <span>{" "}</span>
          <span>
            {moment(post.dateOfPodcast).format('MMM DD, YYYY')}
            </span>
          <div className = "mt-3">
            <ReactAudioPlayer
              src={post.podcast.url}
              controls
            />
          </div>
          <h2 className="text-xl border bg-indigo-500 p-2 text-white text-center font-semibold border-b mb-2">Important Links</h2>
          <div className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600">{parse(post.importantLinks.html)}</div>
          <h2 className="text-xl border bg-indigo-500 p-2 text-white text-center font-semibold border-b mb-2">Rough Summary</h2>
          <RichText content={post.content.raw.children} />
          {showTranscript && (
            <div className="mt-4">
              <h2 className="text-xl bg-indigo-500 p-2 text-white text-center border font-semibold mb-2">Rough Transcript</h2>
              <RichText content={post.transcript.raw.children} />
            </div>
          )}

          
        </div>
      </div>
    </>
  );
};

export default PostDetail;
