// components/LandingPage.js
import Link from "next/link";
import { useEffect, useState } from "react";

export default function LandingPage() {
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
    <div className="landing-container">
      <img
        src="/logo-transformed-modified.png"
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
        <Link className="text-white text-xl" href="/podcasts">
          Podcasts
        </Link>
      </div>

      <div className="status-bar">
        <span>
          &#169; Psynch. All Rights Reserved. Courtesy of{" "}
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
