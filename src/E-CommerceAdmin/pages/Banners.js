/** @format */

import React from "react";
import HOC from "../layout/HOC";

const Banners = () => {

  const data = [
    {
      img : "https://c4.wallpaperflare.com/wallpaper/295/163/719/anime-anime-boys-picture-in-picture-kimetsu-no-yaiba-kamado-tanjir%C5%8D-hd-wallpaper-preview.jpg"
    },
    {
      img : "https://wallpapercave.com/wp/wp8203971.jpg"
    },
    {
      img : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrkxuyWfQoPkIlAvvRRowppxPnmla0usying&usqp=CAU"
    },
    {
      img : "https://www.pixelstalk.net/wp-content/uploads/images5/Black-Goku-4K-Wallpaper-HD.jpg "
    },
  ]

  return (
    <>
      <p className="headP">Dashboard / Banners</p>

      <div
        className="pb-4 sticky top-0  w-full flex justify-between items-center"
        style={{ width: "98%", marginLeft: "2%" }}
      >
        <span
          className="tracking-widest text-slate-900 font-semibold uppercase "
          style={{ fontSize: "1.5rem" }}
        >
          All Banners ( Total : {data.length} )
        </span>
      </div>

      <div className="gridCont">
      {data.map((i , index) => (
        <div key={index}>
            <img src={i.img} alt='' />
                 <button className="delete-Btn">Button</button>
        </div>
      ))}
      </div>
    </>
  );
};

export default HOC(Banners);
