import React, { useState, useEffect } from 'react';
import Link from 'next/link';

import { GetCategories } from '../services';

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    GetCategories().then((newCategories) => {
      setCategories(newCategories);
    });
  }, []);

  return (
    <div className="bg-white rounded-lg p-8 pb-12 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b-4 pb-1 text-shadow-md">Categories</h3>
      {categories.map((category, index) => (
        <Link key={index} href={`/category/${category.slug}`}>
          <div className={`cursor-pointer flex items-center ${(index === categories.length - 1) ? 'pb-3 mb-3' : 'border-b pb-3 mb-3'}`}>
            {category.picture && (
              <img
                src={category.picture.url}
                alt={category.name}
                className="w-6 h-6 mr-2 rounded-full"
              />
            )}
            <span>{category.name}</span>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Categories;