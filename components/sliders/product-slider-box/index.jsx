"use client";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import Image from "next/image";
import { BsBookmark } from "react-icons/bs";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { AiOutlineSearch } from "react-icons/ai";
import Link from "next/link";

// USING CONTEXT
import { useAppContext } from "@/context/appContext";

const SlideBox = ({ _id , title, slug, image, imageAlt, price, categories }) => {
  function priceChanger(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const {cartNumber , setCartNumber} = useAppContext();

  const addFav = async () => {
    const cookie = Cookies.get("auth_cookie");
    
    try {
      await axios.post("https://mernfa-fileshop-server.iran.liara.run/api/user/add-favorite-product",{newFavProducts: _id},{
        headers: {auth_cookie: cookie}
      })
      toast.success("به محصولات مورد علاقه اضافه شد",{position: "top-right",autoClose: 5000,rtl: true,className: 'toast-message'})
    } catch (error) {
        console.log(error);
        toast.error(error.response?.data?.msg ? error.response.data.msg :"خطا در اضافه کردن محصول به علاقه مندی ها",{position: "top-right",autoClose: 5000,rtl: true,className: 'toast-message'})
    }
  }

  const addToCart = async () => {
    const cookie = Cookies.get("auth_cookie");
    
    try {
      await axios.post("https://mernfa-fileshop-server.iran.liara.run/api/user/add-cart-product",{newCartProduct: _id},{
        headers: {auth_cookie: cookie}
      })
      toast.success("به سبد خرید اضافه شد",{position: "top-right",autoClose: 5000,rtl: true,className: 'toast-message'})
      setCartNumber(cartNumber+1)
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.msg ? error.response.data.msg :"خطا در اضافه کردن محصول به سبد خرید",{position: "top-right",autoClose: 5000,rtl: true,className: 'toast-message'})
    }
  }

  return (
    <article className="sliderItem w-full min-w-[100%] sm:w-1/2 sm:min-w-[50%] lg:w-1/3 lg:min-w-[33.33%] xl:w-1/4 sm:px-2 lg:px-4 xl:px-2 xl:min-w-[25%]">
      <div className="w-[280px] xs:w-[300px] sm:w-full md:w-[350px] lg:w-[310px] xl:w-72 mx-auto h-[28rem] xs:h-[29rem] sm:h-[485px] lg:h-[470px] bg-white relative px-2 py-3 rounded-xl shadow-[1px_1px_4px_rgba(0,0,0,0.25)] transition-all duration-300 hover:-translate-y-1">
        <Link target="_blank" href={`/shop/${slug}`}>
          <Image
            priority={true}
            width={460}
            height={160}
            src={image}
            alt={imageAlt}
            title={imageAlt}
            className="rounded-lg mx-auto"
          />
        </Link>
        <div>
          <Link target="_blank" href={`/shop/${slug}`}>
            <h3 className="h-[75px] mb-4 mt-10 font-semibold line-clamp-3">{title}</h3>
          </Link>
          <div className="flex items-start flex-wrap gap-1 max-h-[105px] overflow-y-hidden">
            {categories.map((d, i) =>
              i < 4 ? (
              <Link
                target="_blank"
                href={`/shop?orderBy=date&categories=${d.slug}`}
                key={i}
                className="py-1 px-2 bg-zinc-200 rounded-md"
              >
                {d.title}
              </Link>
              ) : (
                <></>
              )
            )}
          </div>
          <div className="absolute bottom-4 right-0 w-full flex justify-between items-center">
            <div className="flex">
              <BsBookmark onClick={addFav} className="cursor-pointer mr-2 w-10 h-10 p-[10px] rounded bg-zinc-200 transition-all duration-300 hover:bg-orange-500 hover:text-white" />
              <AiOutlineSearch className="mr-2 w-10 h-10 p-[10px] rounded bg-zinc-200 transition-all duration-300 hover:bg-orange-500 hover:text-white" />
            </div>
            <div className="flex gap-2">
              <HiOutlineShoppingCart onClick={addToCart} className="cursor-pointer mr-2 w-10 h-10 p-[10px] rounded bg-[#3da6cc] transition-all duration-300 hover:bg-[#30748d] text-white" />
              <span className="bg-zinc-400 text-white p-2 rounded-tr-md rounded-br-md">
                <span className="fa-num">{priceChanger(price)}</span> تومان
              </span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default SlideBox;
