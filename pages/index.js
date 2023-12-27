import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [windowWidth, setWindowWidth] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    setWindowWidth(window.innerWidth);
    setWindowHeight(window.innerHeight);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Calculate the logo size and text size based on window width and height
  const logoSize = Math.min(0.8 * windowWidth, 0.8 * windowHeight, 700);
  const textSize = Math.min(0.05 * windowWidth + 40, 200);
  const isSmallScreen = windowWidth < 640; // Define the breakpoint for a small screen.

  const handlePlayButtonClick = () => {
    const audio = new Audio("/cinch.mp3");
    if (!isPlaying) {
      audio.play();
    } else {
      audio.pause();
    }
    setIsPlaying(!isPlaying);
  };
  return (
    <div
      className={` ${
        isSmallScreen ? "landing-container-small" : "landing-container"
      }`}
    >
      <div className="fixed top-0 left-0 right-0 bg-pink-600 text-white text-center py-2"></div>
      <img
        src="/PBrain(TransparentVersion)_cropped.gif"
        alt="Psynch Logo"
        width={logoSize}
        height={logoSize}
        style={{ marginBottom: "1rem" }}
      />
      <h1
        className="text-white font-semibold text-shadow mb-2"
        style={{ fontSize: `${textSize}px`, position: "relative" }}
      >
        Psynch
        <button className="play-button" onClick={handlePlayButtonClick}>
          <img
            src="/speaker_white.png"
            alt=""
            width={0.08 * logoSize}
            height={0.08 * logoSize}
            style={{ position: "absolute", top: "1rem", right: "-2rem" }}
          />
        </button>
      </h1>

      <div className="flex flex-row">
        <Link href="/podcasts">
          <div className="text-white text-xl">Podcasts</div>
        </Link>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-pink-600 text-white text-center py-2">
        <span>
          &#169; Psynch 2023.{" "}
          {`${isSmallScreen ? "" : "All Rights Reserved. "}`} Courtesy of{" "}
          <a
            href="https://www.linkedin.com/in/derekharmanli"
            target="_blank"
            rel="noopener noreferrer"
          >
            Derek Harmanli
          </a>
        </span>
      </div>
    </div>
  );
}
