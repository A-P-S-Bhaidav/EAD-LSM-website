'use client';
import { useState, useEffect } from 'react';

export default function Loader() {
  const [progress, setProgress] = useState(0);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let current = 0;
    const timer = setInterval(() => {
      current += Math.floor(Math.random() * 15) + 8;
      if (current >= 100) {
        current = 100;
        setProgress(100);
        clearInterval(timer);
        setTimeout(() => {
          setHidden(true);
        }, 500);
      } else {
        setProgress(current);
      }
    }, 60);

    return () => clearInterval(timer);
  }, []);

  if (hidden) return null;

  return (
    <div
      className={`loader_wrap div-block-3 w-node-f3b25b68-89b2-5bd0-0bc6-02fcf40c6be5-f40c6be5 transition-all duration-500 ease-out ${
        progress === 100 ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      id="loader"
      style={progress === 100 ? { opacity: 0, pointerEvents: 'none' } : {}}
    >
      <div className="loader_main_wrap">
        <div className="loader_main_top">
          <div className="loader_cpt u-text-sm">Connecting</div>
        </div>
        <div className="loader_main_mid grid-col-12">
          <div className="loader_svg_logo flex gap-[25px] justify-center items-center w-full max-w-[500px] mx-auto" data-loader-logo="" id="w-node-_9fe4f064-e40d-09dd-f5ff-d2ee1dfc0cba-f40c6be5">
            <img alt="EAD" src="/EAD-logo-transparent.png" className="w-[45%] h-auto object-contain" />
            <img alt="LSM" src="/LSM-logo-transparent.png" className="w-[45%] h-auto object-contain" />
          </div>
        </div>
        <div className="loader_main_bottom grid-col-12">
          <div className="loader_percent_wrap">
            <div className="loader_main_percent u-text-md" data-loader-percent="">
              {progress}%
            </div>
          </div>
          <div className="loader_bar_wrap" id="w-node-f3b25b68-89b2-5bd0-0bc6-02fcf40c6bf7-f40c6be5">
            <div
              className="loader_bar_front"
              data-loader-bar-fill=""
              style={{ width: `${progress}%`, transition: 'width 0.08s ease-out' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
