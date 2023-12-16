import React, { useState, useEffect } from 'react';
import { RichText } from '@graphcms/rich-text-react-renderer';
import ReactAudioPlayer from 'react-audio-player';
import parse from 'html-react-parser';
import moment from 'moment';
import Head from 'next/head';
const Modal = ({ isOpen, onClose, onDontShowAgain }) => {
  const [dontShowAgain, setDontShowAgain] = useState(false);

  const handleClose = () => {
    if (dontShowAgain) {
      onDontShowAgain();
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2 className="text-2xl font-semibold">Disclaimer and Important Information</h2>
        <p>- This is NOT medical advice. As this is AI generated content, there may be incorrect information.</p>
        <p>- The Key Points section is intended to be a 1-minute reading summary.</p>
        <p>- The Summary Section is intended to be a 5minute reading summary.</p>
        <p>- The Transcript will likely have the most errors and is AI&apos;s best attempt to transcribe the media.</p>
        <p className= "mt-2 font-semibold">To make this modal pop up again, even if you select the do not open again below, press Ctrl-M on PC/Mac and/or double tap the screen on your mobile device</p>
        <div className="mt-4">
    <input
        type="checkbox"
        id="dontShowCheckbox"
        checked={dontShowAgain}
        onChange={(e) => setDontShowAgain(e.target.checked)}
      />
      <label htmlFor="dontShowCheckbox">Do not open again</label> 
  </div>
        
        <button onClick={handleClose} className="modal-close-btn">X</button>
      </div>
    </div>
  );
};
const PostDetail = ({ post }) => {
  const [showTranscript, setShowTranscript] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [showLinks, setShowLinks] = useState(false);
  const [showMedia, setShowMedia] = useState(false);
  const [showPoints, setShowPoints] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [lastTap, setLastTap] = useState(null);

  useEffect(() => {
    checkModalSetting();
    setupEventListeners();

    return () => {
      cleanupEventListeners();
    };
  }, [post, lastTap]);

  const checkModalSetting = () => {
    const modalSetting = localStorage.getItem('hideModal');
    setIsModalOpen(modalSetting !== 'true');
  };

  const setupEventListeners = () => {
    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('touchend', handleDoubleTap);

  };

  const cleanupEventListeners = () => {
    window.removeEventListener('keydown', handleKeyDown);
    document.removeEventListener('touchend', handleDoubleTap);

  };

  const handleKeyDown = (event) => {
    if (event.ctrlKey && event.key === 'm') {
      setIsModalOpen(true);
      localStorage.setItem('hideModal', 'false');
    }
  };
  const handleDoubleTap = () => {
    const currentTime = new Date().getTime();
    const tapLength = currentTime - lastTap;
    if (lastTap && tapLength < 500 && tapLength > 0) {
      setIsModalOpen(true);
      localStorage.setItem('hideModal', 'false');
    }
    setLastTap(currentTime);
  };

  const handleDontShowAgain = () => {
    localStorage.setItem('hideModal', 'true');
  };

  const toggleTranscript = () => {
    setShowTranscript(!showTranscript);
  };
  const toggleSummary = () => {
    setShowSummary(!showSummary);
  };
  const toggleLinks = () => {
    setShowLinks(!showLinks);
  };
  const toggleMedia = () => {
    setShowMedia(!showMedia);
  };
  const togglePoints = () => {
    setShowPoints(!showPoints);
  };

  

  return (
    <>
    <Head>
        <title>Psynch Podcasts</title>
      </Head>
      <div className="bg-white embossed rounded-lg lg:p-8 pb-12 mb-8">
        <div className="relative overflow-hidden shadow-md mb-6">
          <img
            src={post.featuredImage.url}
            alt=""
            className="object-top h-full w-full object-cover rounded-t-lg lg:rounded-lg"
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
          <h1 className="text-3xl mb-1 font-semibold text-shadow">{post.title}</h1>
          <h3 className="border-b-4 mb-4 font-semibold text-xs">{"from "} <img alt= {post.categories[0].name} height = '20px' width= '20px' className="rounded-full inline"  src = {post.categories[0].picture.url}/> {post.categories[0].name}</h3>


         
          <div className="flex flex-row">
            <h2 className="text-xl border bg-pink-600 p-2 rounded-full text-white text-center font-semibold border-b mb-2"  style={{ width: '100%' }}>
                  Media 
            </h2>
            <button
                type="button"
                onClick={toggleMedia}
                className="transition duration-500 ease hover:bg-indigo-900 bg-pink-600 text-lg text-center font-medium rounded-full text-white mb-2 px-4 py-2 cursor-pointer"
              >
                {showMedia ? '⌃' : '⌄'}
              </button>
          </div>
          {showMedia && (
            <div>
              <h3 className="mb-2 font-semibold text-s"><img alt= {post.categories[0].name} height = '20px' width= '20px' className="rounded-full inline"  src = {post.categories[0].picture.url}/> {post.categories[0].name}</h3>
              <span className="underline">
                  {"Published Date"}
                </span>
                <span>{": "}</span>
                <span>
                  {moment(post.dateOfPodcast).format('MMM DD, YYYY')}
                  </span>
                <div className = "mt-3">
                  <ReactAudioPlayer
                    src={post.podcast.url}
                    controls
                  />
                </div>
            </div>
          )}
        <div className="flex flex-row">
            <h2 className="text-xl border bg-pink-600 p-2 rounded-full text-white text-center font-semibold border-b mb-2"  style={{ width: '100%' }}>
                  Links
                  
                </h2>
                <button
                    type="button"
                    onClick={toggleLinks}
                    className="ml-1 transition duration-500 ease hover:bg-indigo-900 bg-pink-600 text-lg text-center font-medium rounded-full text-white px-4 mb-2 py-2 cursor-pointer"
                  >
                    {showLinks ? '⌃' : '⌄'}
                  </button>
          </div>
          {showLinks && (
            <div className={`${post.importantLinks && post.importantLinks.html ? 'underline text-blue-600 hover:text-blue-800 visited:text-purple-600' : 'text-black'}`}>
              {post.importantLinks && post.importantLinks.html ? parse(post.importantLinks.html) : 'No important links available.'}
            </div>
          )}
           <div>
            {post.keyPoints && (
             <div className="flex flex-row">
                <h2 className="text-xl border bg-pink-600 p-2 rounded-full text-white text-center font-semibold border-b mb-2" style={{ width: '100%' }}>
                  Key Points
                  
                </h2>
                <button
                    type="button"
                    onClick={togglePoints}
                    className="mb-2 transition duration-500 ease hover:bg-indigo-900 bg-pink-600 text-lg text-center font-medium rounded-full text-white px-4 py-2 cursor-pointer"
                  >
                    {showPoints ? '⌃' : '⌄'}
                  </button>
              </div>
            )}

            {showPoints && post.keyPoints && (
              <div className="mt-4 mb-4">
                <RichText content={post.keyPoints.raw.children} />
              </div>
            )}
          </div>
          <div className="flex flex-row">
            <h2 className="text-xl border bg-pink-600 p-2 rounded-full text-white text-center font-semibold border-b mb-2"  style={{ width: '100%' }}>
                  Summary
                  
                </h2>
                <button
                    type="button"
                    onClick={toggleSummary}
                    className="mb-2 transition duration-500 ease hover:bg-indigo-900 bg-pink-600 text-lg text-center font-medium rounded-full text-white px-4 py-2 cursor-pointer"
                  >
                    {showSummary ? '⌃' : '⌄'}
                  </button>   
          </div>
          {showSummary && (
            <div className="mt-4 mb-4">
              <RichText content={post.content.raw.children} />
            </div>
          )}
          <div className="flex flex-row">
            <h2 className="text-xl border bg-pink-600 p-2 rounded-full text-white text-center font-semibold border-b mb-2"  style={{ width: '100%' }}>
                  Transcript 
                  
                </h2>
                <button
                    type="button"
                    onClick={toggleTranscript}
                    className="mb-2 transition duration-500 ease hover:bg-indigo-900 bg-pink-600 text-lg text-center font-medium rounded-full text-white px-4 py-2 cursor-pointer"
                  >
                    {showTranscript ? '⌃' : '⌄'}
                  </button>
          </div>
          {showTranscript && (
            <div className="mt-4 mb-4">
              <RichText content={post.transcript.raw.children} />
            </div>
          )}

          
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onDontShowAgain={handleDontShowAgain}
      />
    </>
  );
};

export default PostDetail;
