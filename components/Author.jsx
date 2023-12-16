import React from 'react';
import parse from 'html-react-parser'

const Author = ({ author }) => {
  // Function to ensure the URL starts with http:// or https://
  const ensureAbsoluteUrl = (html) => {
    const urlPattern = /href="([^"]*)"/g;
    return html.replace(urlPattern, (match, url) => {
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        return match.replace(url, `https://${url}`);
      }
      return match;
    });
  };

  // Process the author.website.html to ensure absolute URLs
  const processedWebsiteHtml = ensureAbsoluteUrl(author.website.html);

  return (
    <div className="text-center mt-20 mb-8 p-12 relative rounded-lg bg-black bg-opacity-20">
      <div className="absolute left-0 right-0 -top-14">
        <img
          alt={author.name}
          height="100px"
          width="100px"
          className="align-middle rounded-full"
          src={author.photo.url}
        />
      </div>
      <h3 className="text-white mt-4 mb-4 text-xl font-bold">{author.name}</h3>
      <div className="underline text-white hover:text-blue-800 visited:text-purple-600">
        {parse(processedWebsiteHtml)}
      </div>
      <p className="text-white text-ls">{author.bio}</p>
    </div>
  );
};

export default Author;
