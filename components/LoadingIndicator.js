// components/LoadingIndicator.js

import React, { useState, useEffect } from "react";

export default function LoadingIndicator({ onComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Slow down the increment
    const interval = setInterval(() => {
      setProgress((oldProgress) => {
        const newProgress = oldProgress + Math.random() * 5; // Small random increment
        if (newProgress > 90) clearInterval(interval); // Don't let it reach 100% on its own
        return newProgress;
      });
    }, 200); // Adjust interval time as needed

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (onComplete) {
      setProgress(100); // Complete the progress when page has loaded
    }
  }, [onComplete]);

  return (
    <div className="loading-indicator">
      <div className="progress-bar">
        <div className="progress" style={{ width: `${progress}%` }}></div>
      </div>
      <span>Loading... {Math.round(progress)}%</span>

      <style jsx>{`
        .loading-indicator {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
        }

        .progress-bar {
          width: 100%;
          background-color: #ddd;
        }

        .progress {
          height: 5px;
          background-color: #09f;
          transition: width 0.1s ease-in-out;
        }
      `}</style>
    </div>
  );
}
