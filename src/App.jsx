import "./index.css";
import React from "react";
import Canvas from "./Canvas";
import data from "./data";
import LocomotiveScroll from "locomotive-scroll";
import { useEffect, useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Circ, Expo } from "gsap/all";

function App() {
  const [showCanvas, setShowCanvas] = useState(false);
  const headingref = useRef(null);
  const growingSpan = useRef(null);

  useEffect(() => {
    const locomotiveScroll = new LocomotiveScroll();
  }, []);

  useGSAP(() => {
    const handleClick = (e) => {
      setShowCanvas((prevShowCanvas) => {
        if (!prevShowCanvas) {
          gsap.set(growingSpan.current, {
            top: e.clientY,
            left: e.clientX,
          });

          gsap.to("body", {
            color: "#000",
            backgroundColor: "#fd2c2a",
            duration: 1.2,
            ease: "power2.inOut",
          });

          gsap.to(growingSpan.current, {
            scale: 1000,
            duration: 2,
            ease: "power2.inOut",
            onComplete: () => {
              gsap.set(growingSpan.current, {
                scale: 0,
                clearProps: "all",
              });
            },
          });
        } else {
          gsap.to("body", {
            color: "#fff",
            backgroundColor: "#000",
            duration: 1.2,
            ease: "power2.inOut",
          });
        }

        return !prevShowCanvas;
      });
    };

    const headingElement = headingref.current;
    headingElement.addEventListener("click", handleClick);

    // Clean up event listener on unmount
    return () => headingElement.removeEventListener("click", handleClick);
  }, []);

  return (
    <>
      <span
        ref={growingSpan}
        className="growing rounded-full block fixed top-[-20px] left-[-20px] w-5 h-5"
      ></span>
      <div className="w-full relative min-h-screen font-['Helvetica_Now_Display'] overflow-x-hidden">
        {showCanvas &&
          data[0].map((canvasdets, index) => <Canvas key={index} details={canvasdets} />)}
        <div className="w-full relative z-[1] min-h-screen">
          {/* Responsive Navigation */}
          <nav className="w-full p-4 sm:p-6 md:p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center z-50 gap-4 sm:gap-0">
            <div className="brand text-xl sm:text-2xl font-md">thirtysixstudios</div>
            <div className="links flex flex-col sm:flex-row gap-3 sm:gap-6 md:gap-10 text-sm sm:text-base">
              {[
                "What we do",
                "Who we are",
                "How we give back",
                "Talk to us",
              ].map((link, index) => (
                <a
                  key={index}
                  href={`#${link.toLowerCase()}`}
                  className="hover:text-gray-300"
                >
                  {link}
                </a>
              ))}
            </div>
          </nav>

          {/* Hero Text Container */}
          <div className="textcontainer w-full px-5 sm:px-10 md:px-[15%] lg:px-[20%] mt-8 sm:mt-12 md:mt-16">
            <div className="text w-full sm:w-[80%] md:w-[70%] lg:w-[50%]">
              <h3 className="text-2xl sm:text-3xl md:text-4xl leading-[1.2]">
                At Thirtysixstudio, we build immersive digital experiences for
                brands with a purpose.
              </h3>
              <p className="text-base sm:text-lg w-full sm:w-[90%] md:w-[80%] mt-6 sm:mt-8 md:mt-10 font-normal">
                We are a team of designers, developers, and strategists who are
                passionate about creating digital experiences that are both
                beautiful and functional.
              </p>
              <p className="text-sm sm:text-md mt-6 sm:mt-8 md:mt-10">scroll</p>
            </div>
          </div>

          {/* Large Heading - Responsive sizing */}
          <div className="w-full absolute bottom-0 left-0 overflow-hidden">
            <h1
              ref={headingref}
              className="text-[4rem] sm:text-[6rem] md:text-[10rem] lg:text-[14rem] xl:text-[17rem] font-normal tracking-tight leading-none pl-2 sm:pl-3 md:pl-5 cursor-pointer select-none"
            >
              Thirtysixstudios
            </h1>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="w-full relative min-h-screen mt-16 sm:mt-24 md:mt-32 px-5 sm:px-8 md:px-10">
        {showCanvas &&
          data[1].map((canvasdets, index) => <Canvas key={index} details={canvasdets} />)}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl tracking-tighter">
          about the brand
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl leading-[1.6] sm:leading-[1.7] md:leading-[1.8] w-full md:w-[90%] lg:w-[80%] mt-6 sm:mt-8 md:mt-10 font-light">
          we are a team of designers, developers, and strategists who are
          passionate about creating digital experiences that are both beautiful
          and functional, we are a team of designers, developers, and
          strategists who are passionate about creating digital experiences that
          are both beautiful and functional.
        </p>

        <img
          className="w-full md:w-[90%] lg:w-[80%] mt-6 sm:mt-8 md:mt-10"
          src="https://directus.funkhaus.io/assets/b3b5697d-95a0-4af5-ba59-b1d423411b1c?withoutEnlargement=true&fit=outside&width=1400&height=1400"
          alt="Brand showcase"
        />
      </div>
    </>
  );
}

export default App;