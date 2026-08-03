'use client';

export default function Hero({ hasEAD, showLuckyDrawBtn, luckyDrawText, onLuckyDrawClick }) {
  const images = [
    { alt: "Startup conference stage", src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80" },
    { alt: "Innovation workspace", src: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80" },
    { alt: "Technology event", src: "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?auto=format&fit=crop&w=800&q=80" },
    { alt: "Business strategy", src: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80" },
    { alt: "Entrepreneurship workshop", src: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=800&q=80" }
  ];

  const isLuckyNumber = luckyDrawText?.startsWith('LUCKY NUMBER');

  return (
    <div className="hero_container u-container relative" data-hero="" id="home">
      <div className="hero_heading_wrap">
        <div className="hero_bg_img_wrap" data-hero-img="" style={{ filter: 'grayscale(100%) contrast(1.1) brightness(0.85)' }}>
          {images.map((img) => (
            <img key={img.alt} alt={img.alt} className="hero_bg_img" loading="lazy" src={img.src} />
          ))}
        </div>
        <div className="hero_svg_wrap grid-col-12 pointer-events-none">
          <div id="hero-text-container" className="flex flex-col justify-center col-span-full relative z-10 pointer-events-none w-full gap-0 px-[5%]">
            <div id="hero-ead" className="text-[14vw] font-black text-white leading-none text-left pl-[5%]">EAD.</div>
            <div id="hero-lsm" className="text-[14vw] font-black text-white leading-none text-right pr-[5%]">LSM.</div>
          </div>
        </div>
      </div>
      <div className="hero_top_wrap grid-col-12"></div>
      <div className="hero_overlay"></div>

      {hasEAD && showLuckyDrawBtn && (
        <button
          id="lucky-draw-btn"
          onClick={isLuckyNumber ? null : onLuckyDrawClick}
          className={`absolute bottom-[20px] md:bottom-[30px] left-[20px] md:left-[30px] z-50 bg-white text-darkbg border-none py-2.5 md:py-3 px-5 md:px-6 font-montserrat font-extrabold text-[0.7rem] md:text-[0.8rem] tracking-wider uppercase rounded shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:shadow-[0_15px_40px_rgba(0,0,0,0.6)] ${
            isLuckyNumber ? 'cursor-default' : 'cursor-pointer'
          }`}
        >
          {luckyDrawText}
        </button>
      )}
    </div>
  );
}
