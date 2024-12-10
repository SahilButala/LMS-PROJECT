import React from "react";
import banner from "../../assets/Image.jpg";
import { useNavigate } from "react-router-dom";
function Banner() {


  return (
    <section>
      <div className="h-[600px] w-full">
        <div
          className={`banner h-full  flex flex-col  items-start  justify-center`}
          style={{
            backgroundImage: `url(${banner})`,
            objectFit: "cover",
            backgroundPosition: "top",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="details pl-20">
            <h1 className="text-5xl font-bold">
              Build Skills with <br />
              <span className="text-[#FF782D]">Online</span> Course
            </h1>

            <p className="mt-4 text-[17px]">
              We denounce with righteous indignation and dislike men who are so
              beguiled and <br /> demoralized that cannot trouble.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Banner;
