"use client";
import { FaChevronRight } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Image from "next/image";
import GrSlideBox from "../graphic-slider-box";
import ProductSlideBox from "../rel-product-slider-box";

const RelatedProductsSlider = ({relProducts,title}) => {
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

  const [relProductsData , setRelProductsData] = useState([]);
  const [loading , setLoading] = useState(true);

  useEffect(() => {
    axios.post("https://mernfa-fileshop-server.iran.liara.run/api/product/get-related-products",relProducts)
    .then((d) => {
      setRelProductsData(d.data.data);
      setLoading(false);
    })
    .catch(e => console.log(e))
  },[])

  return (
    <section className="flex flex-col gap-6 mb-10">
      <header className="flex justify-between items-center">
        <h2 className="text-xl text-zinc-500">{title}</h2>
        <div className="flex items-center gap-2 text-zinc-800">
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
      </header>
      <div
        ref={carouselRef}
        className="sliderContainer w-full overflow-x-scroll"
      >
        {loading ? (
            <div className="flex justify-center py-5">
              <Image
                alt="loading gif"
                src={"/loading.gif"}
                width={120}
                height={120}
              />
            </div>
          ) : (
            relProductsData.length == 0 ? (
                <h1 className="text-center p-4">محصول مرتبطی وجود ندارد</h1>
              ) : ( 
              <div className="flex items-center py-3">
                {relProductsData.map((p,i) => {
                  if(p.typeOfProduct == "gr"){
                    return <GrSlideBox key={i} {...p} />
                  }else{
                    return <ProductSlideBox key={i} {...p} />
                  }
                })}
              </div>
            )
          )
        }
      </div>
    </section>
  );
};

export default RelatedProductsSlider;
