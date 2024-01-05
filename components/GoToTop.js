import React, { useState, useEffect } from "react";

const GoToTop = () => {
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
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
  if (!showTopBtn) return null;
  return (
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
  );
};

export default GoToTop;
