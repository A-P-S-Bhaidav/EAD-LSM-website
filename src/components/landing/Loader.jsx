'use client';

export default function Loader() {
  return (
    <div className="loader_wrap div-block-3 w-node-f3b25b68-89b2-5bd0-0bc6-02fcf40c6be5-f40c6be5" id="loader">
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
            <div className="loader_main_percent u-text-md" data-loader-percent="">0%</div>
          </div>
          <div className="loader_bar_wrap" id="w-node-f3b25b68-89b2-5bd0-0bc6-02fcf40c6bf7-f40c6be5">
            <div className="loader_bar_front" data-loader-bar-fill=""></div>
          </div>
        </div>
      </div>
    </div>
  );
}
