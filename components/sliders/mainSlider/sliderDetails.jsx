"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Link from "next/link";

export default function SliderDetails({ data }) {
  return (
    <section className="px-4">
      {data.data.length == 0 ? (
        <></>
      ) : (
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
        >
          {
            data.data.map((d, i) => (
              <SwiperSlide key={i}>
                <Link
                  href={d.link}
                  className="flex justify-center items-center"
                >
                  <Image
                    alt={d.imageAlt}
                    width={1280}
                    height={300}
                    className="rounded-lg"
                    src={d.image}
                  />
                </Link>
              </SwiperSlide>
            ))
          }
        </Swiper>
      )}
    </section>
  );
}
