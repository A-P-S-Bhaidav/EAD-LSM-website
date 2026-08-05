'use client';

export default function Hero({ hasEAD, showLuckyDrawBtn, luckyDrawText, onLuckyDrawClick }) {
  const isLuckyNumber = luckyDrawText?.startsWith('LUCKY NUMBER');

  return (
    <section
      id="home"
      className="hero_container relative w-full h-screen min-h-[650px] overflow-hidden bg-[#F4F7F9] flex items-center justify-center m-0 p-0"
    >
      {/* Full Screen Background Image */}
      <div className="hero_bg_img_wrap absolute inset-0 w-full h-full z-0">
        <img
          alt="EAD LSM Landing Background"
          className="hero_bg_img w-full h-full object-cover object-center"
          loading="eager"
          src="/landing.png"
        />
        {/* 2-Combo Light Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#F4F7F9]/70 via-[#F4F7F9]/30 to-[#F4F7F9] z-10 pointer-events-none" />
      </div>

      {/* Hero Typography: EAD. LSM. */}
      <div className="hero_heading_wrap relative z-20 w-full max-w-[1500px] mx-auto px-6 pointer-events-none flex flex-col justify-center items-center h-full">
        <div className="hero_svg_wrap pointer-events-none w-full">
          <div id="hero-text-container" className="flex flex-col justify-center pointer-events-none w-full gap-0 px-[4%]">
            
            {/* Top EAD Block */}
            <div
              id="hero-ead"
              className="text-[14vw] md:text-[12vw] font-black leading-none text-left tracking-tighter bg-gradient-to-r from-[#0F172A] via-[#1E293B] to-[#7DA6A9] bg-clip-text text-transparent drop-shadow-sm font-montserrat pl-[5%]"
            >
              EAD.
            </div>

            {/* Bottom LSM Block */}
            <div
              id="hero-lsm"
              className="text-[14vw] md:text-[12vw] font-black leading-none text-right tracking-tighter bg-gradient-to-r from-[#1E293B] via-[#0F172A] to-[#60999C] bg-clip-text text-transparent drop-shadow-sm font-montserrat pr-[5%]"
            >
              LSM.
            </div>

          </div>
        </div>
      </div>

      {/* Lucky Draw CTA */}
      {hasEAD && showLuckyDrawBtn && (
        <button
          id="lucky-draw-btn"
          onClick={isLuckyNumber ? null : onLuckyDrawClick}
          className={`absolute bottom-[20px] md:bottom-[35px] left-[20px] md:left-[40px] z-50 bg-[#0F172A] hover:bg-[#1E293B] text-white border-none py-2.5 md:py-3.5 px-5 md:px-7 font-montserrat font-extrabold text-[0.75rem] md:text-[0.85rem] tracking-wider uppercase rounded-lg shadow-lg transition-all duration-300 ease-in-out hover:-translate-y-0.5 ${
            isLuckyNumber ? 'cursor-default' : 'cursor-pointer'
          }`}
        >
          {luckyDrawText}
        </button>
      )}
    </section>
  );
}
