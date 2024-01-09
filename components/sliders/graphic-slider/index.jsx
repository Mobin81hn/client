"use client";
import SlideBox from "../graphic-slider-box";
import { FaChevronRight } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";
import { useRef } from "react";
import Link from "next/link";

const GraphicSlider = ({data}) => {
  const carouselRef = useRef();

  const carouselSwitcher = (data) => {
    if (carouselRef.current) {
      const width = carouselRef.current.offsetWidth;
      carouselRef.current.scrollTo(
        carouselRef.current.scrollLeft + width * data,
        0
      );
    }
  };

  return (
    <div className="bg-orange-500">
      <section className="container max-w-7xl mx-auto my-10 flex flex-col gap-6 px-2 py-6">
        <header className="flex justify-between items-center">
          <h2 className="text-white text-lg sm:text-2xl border-r-white border-r-2 pr-2">
            فایل های گرافیکی
          </h2>
          <div className="flex items-center gap-2 text-zinc-800">
            <FaChevronRight
              onClick={() => {
                carouselSwitcher(1);
              }}
              className="hidden xs:inline-block cursor-pointer bg-zinc-200 transition-all duration-300 hover:bg-zinc-400 hover:text-white w-10 h-10 p-3 rounded"
            />
            <FaChevronLeft
              onClick={() => {
                carouselSwitcher(-1);
              }}
              className="hidden xs:inline-block cursor-pointer bg-zinc-200 transition-all duration-300 hover:bg-zinc-400 hover:text-white w-10 h-10 p-3 rounded"
            />
            <Link
              href={'/'}
              className="py-2 px-4 mr-2 bg-blue-500 text-white rounded-md border-2 transition-all duration-500 hover:bg-blue-600"
            >
              دیدن همه
            </Link>
          </div>
        </header>
        <div className="flex xs:hidden items-center justify-center gap-2 text-zinc-800">
          <FaChevronRight
            onClick={() => {
              carouselSwitcher(1);
            }}
            className="cursor-pointer bg-zinc-200 transition-all duration-300 hover:bg-orange-400 hover:text-white w-10 h-10 p-3 rounded"
          />
          <FaChevronLeft
            onClick={() => {
              carouselSwitcher(-1);
            }}
            className="cursor-pointer bg-zinc-200 transition-all duration-300 hover:bg-orange-400 hover:text-white w-10 h-10 p-3 rounded"
          />
        </div>
        <div
          ref={carouselRef}
          className="sliderContainer w-full overflow-x-scroll"
        >
          <div className="flex items-center py-3">
            {
              data.map((d,i) => (
                <SlideBox key={i} {...d}/>
              ))
            }
          </div>
        </div>
      </section>
    </div>
  );
};

export default GraphicSlider;
