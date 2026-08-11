'use client';

export default function Hero({ hasEAD, showLuckyDrawBtn, luckyDrawText, onLuckyDrawClick, onRegisterClick }) {
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

      {/* Subtle Background Watermark Branding (EAD. LSM.) */}
      <div className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-center items-center opacity-[0.05]">
        <div className="w-full max-w-[1500px] mx-auto px-6 flex flex-col justify-center items-center h-full gap-0">
          <div
            id="hero-ead"
            className="text-[14vw] md:text-[12vw] font-black leading-none text-left tracking-tighter bg-gradient-to-r from-[#0F172A] to-[#7DA6A9] bg-clip-text text-transparent font-montserrat pl-[5%] w-full"
          >
            EAD.
          </div>
          <div
            id="hero-lsm"
            className="text-[14vw] md:text-[12vw] font-black leading-none text-right tracking-tighter bg-gradient-to-r from-[#0F172A] to-[#60999C] bg-clip-text text-transparent font-montserrat pr-[5%] w-full"
          >
            LSM.
          </div>
        </div>
      </div>

      {/* Hero Content Overlay */}
      <div className="relative z-20 w-full max-w-4xl mx-auto px-6 text-center flex flex-col items-center justify-center h-full pointer-events-none">
        
        {/* Eyebrow */}
        <p className="text-xs md:text-sm font-mono font-black uppercase tracking-[0.25em] text-[#0F172A]/70 mb-4 animate-fade-in">
          Entrepreneurship Cell, IIT Kharagpur presents
        </p>
        
        {/* H1 Heading */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-montserrat font-black leading-tight tracking-tight text-[#0F172A] mb-6 drop-shadow-2xs">
          EAD-LSM: Where India's Next Wave of Entrepreneurs Begins
        </h1>
        
        {/* Subhead */}
        <p className="text-[#0F172A]/85 text-xs sm:text-base md:text-lg max-w-2xl leading-relaxed mb-8 font-montserrat font-medium">
          The Entrepreneurship Awareness Drive and Local Startups Meet bring founders, investors, and students together across 20+ cities — building the largest PAN-India entrepreneurship network of its kind.
        </p>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 items-center w-full sm:w-auto pointer-events-auto">
          <button
            onClick={onRegisterClick}
            className="w-full sm:w-auto bg-[#0F172A] hover:bg-[#1E293B] text-white border-none py-3.5 px-8 font-montserrat font-black text-xs md:text-sm tracking-wider uppercase rounded-xl shadow-lg transition-all duration-300 ease-in-out hover:-translate-y-0.5 active:scale-95 cursor-pointer"
          >
            Register Now
          </button>
          <a
            href="#impact"
            className="w-full sm:w-auto bg-white hover:bg-slate-50 text-[#0F172A] border border-slate-200 py-3.5 px-8 font-montserrat font-black text-xs md:text-sm tracking-wider uppercase rounded-xl shadow-md transition-all duration-300 ease-in-out hover:-translate-y-0.5 active:scale-95 text-center cursor-pointer no-underline"
          >
            Explore Cities
          </a>
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
