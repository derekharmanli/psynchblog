import React, {useState, useEffect} from 'react'

import Link from 'next/link'

import {GetCategories} from '../services'
const Header = () => {
    const [categories, setCategories] = useState([]);

  useEffect(() => {
    GetCategories().then((newCategories) => {
      setCategories(newCategories);
    });
  }, []);
  return (
    <div className ="container mx-auto px-10 mb-8">
        <div className = "w-full inline-block border-blue-400 py-8">
            <div className="flex flex-col border-b">
                <div className = "md:float-left block">
                    <Link href="/">
                        <span className = "text-shadow cursor-pointer font-bold text-6xl text-white" title="Pronounced like cinch">
                            Psynch
                        </span>
                    </Link>
                </div>
                <div className ="flex lg:flex-row flex-col justify-between">
                    <div className = "text-white italic lg:mb-0 mb-4">
                        Your Favorite Psychiatry Media Transcribed and Summarized
                    </div>
                    <div className ="flex flex-row">
                        <Link className="mr-5" href="/about">
                            <div className = "text-white font-semibold">
                                About
                            </div>
                        </Link>
                        <Link href="/disclaimer">
                            <div className = "text-white font-semibold">
                                Disclaimer
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
            <div className = "hidden md:float-left md:contents">
                {categories.map((category) =>
                    <Link key={category.slug} href={`/category/${category.slug}`}>
                        <span className="md:float-right mt-2 align-middle text-white ml-4 font-semibold cursor-pointer">
                            {category.name}
                        </span>
                    </Link>
                )}

            </div>
       
        </div>
        
    </div>
  )
}

export default Header