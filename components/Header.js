import React, { useState, useEffect } from "react";
import { useRouter } from "next/router"; // Import useRouter

import Link from "next/link";

import { GetCategories } from "../services";
const Header = () => {
  const [categories, setCategories] = useState([]);
  const router = useRouter(); // Use useRouter to get router object

  useEffect(() => {
    GetCategories().then((newCategories) => {
      setCategories(newCategories);
    });
  }, []);

  // Function to check if the current page is either 'About' or 'Disclaimer'
  const isHiddenPage = () => {
    return router.pathname === "/about" || router.pathname === "/disclaimer";
  };
  return (
    <div className="container mx-auto px-10 mb-8 mt-2">
      <div className="w-full inline-block border-blue-400 rounded-lg py-8 px-8 bg-pink-600">
        <div className="flex flex-col border-b">
          <div className="md:float-left block">
            <Link href="/podcasts">
              <span
                className="text-shadow cursor-pointer font-bold text-6xl text-white"
                title="Pronounced like cinch"
              >
                Psynch Podcast
              </span>
            </Link>
          </div>
          <div className="flex lg:flex-row flex-col justify-between">
            <div className="text-white italic lg:mb-0 mb-4 mt-2">
              Your Favorite Psychiatry Podcasts Transcribed and Summarized
            </div>
            <div className="flex flex-row">
              <Link className="mr-5" href="/about">
                <div className="text-white font-semibold">About</div>
              </Link>
              <Link className="mr-5" href="/disclaimer">
                <div className="text-white font-semibold">Disclaimer</div>
              </Link>
              <Link href="/">
                <div className="text-white font-semibold">Landing</div>
              </Link>
            </div>
          </div>
        </div>
        {!isHiddenPage() && ( // Conditionally render this block
          <div className="hidden md:float-left md:contents">
            {categories.map((category) => (
              <Link key={category.slug} href={`/category/${category.slug}`}>
                <span className="md:float-right mt-2 align-middle text-white ml-4 font-semibold cursor-pointer">
                  {category.name}
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
