"use client";
import { useState } from "react";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineDelete } from "react-icons/ai";
import axios from "axios";

// USING CONTEXT
import { useAppContext } from "@/context/appContext";

const CartBox = ({_id,title,shortDesc,image,imageAlt,buyNumber,price,slug,features,needToRefresh,setNeedToRefresh}) => {
    const [removeButtonDisabled , setRemoveButtonDisabled] = useState(false);
    const spliterForFeatures = (value) => {
        return value.split(":");
      };
    function priceChanger(x){
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const {cartNumber , setCartNumber} = useAppContext();

    const deleteCartProduct = async () => {
        const cookie = Cookies.get("auth_cookie");
        try {
            setRemoveButtonDisabled(true);
            await axios.delete(`https://mernfa-fileshop-server.iran.liara.run/api/user/remove-cart-product/${_id}`,{
                headers: {auth_cookie: cookie}
            })
            
            setNeedToRefresh(!needToRefresh)
            setCartNumber(cartNumber-1)
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.msg ? error.response.data.msg : "خطا در حذف محصول از سبد خرید",{position: "top-right",autoClose: 5000,rtl: true,className: 'toast-message'})
        }
        setRemoveButtonDisabled(false);
    }

    return ( 
        <div className="flex gap-4 flex-col 2xl:flex-row bg-zinc-100 p-3 border-2 border-zinc-200 rounded-md">
            <div className="flex justify-center my-2 xl:justify-start xl:my-0">
                <Image className="rounded-md" width={380} height={150} src={image} alt={imageAlt} title={imageAlt} />
            </div>
            <div className="w-full flex flex-col xl:flex-row justify-between gap-4">
                <div className="w-full flex flex-col gap-4 pt-1">
                    <div className="text-lg">{title}</div>
                    <div className="line-clamp-5 sm:line-clamp-3 leading-7">{shortDesc}</div>
                </div>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-wrap xl:flex-nowrap items-center gap-2 text-base sm:text-sm">
                        <span className="min-w-[75px] flex justify-between items-center gap-1 bg-green-600 text-white px-2 py-1 rounded-md"><span className="fa-num">{priceChanger(price)}</span> تومان</span>
                        {
                            buyNumber < 10 ? <></> : (
                                <span className="min-w-[65px] flex justify-between items-center gap-1 bg-blue-600 text-white px-2 py-1 rounded-md"><span className="fa-num">{buyNumber}</span> فروش</span>
                            )
                        }
                        <Link className="w-32 bg-orange-500 text-white text-center px-2 py-1 rounded-md transition-all duration-300 hover:bg-orange-600" href={`/shop/${slug}`} target="_blank">مشاهده محصول</Link>
                        <button disabled={removeButtonDisabled} onClick={deleteCartProduct} className={
                            removeButtonDisabled ? 
                            "flex items-center gap-1 bg-red-400 text-white px-2 py-1 rounded-md":
                            "flex items-center gap-1 bg-red-600 text-white px-2 py-1 rounded-md"
                        }><AiOutlineDelete className="w-4 h-4"/>حذف</button>
                    </div>
                    <div className="flex flex-col gap-2 mb-8 text-base sm:text-sm">
                        {features.map((d, i) => (
                            <div key={i} className="flex justify-between items-center text-zinc-500">
                                <span>{spliterForFeatures(d)[0]}:</span>
                                <span>{spliterForFeatures(d)[1]}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default CartBox;