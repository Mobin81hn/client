"use client";
import axios from "axios";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { toast } from "react-toastify";

const Favorites = () => {
    const [data , setData] = useState([]);
    const [loading , setLoading] = useState(true);
    const [removeButtonDisabled , setRemoveButtonDisabled] = useState(false);
    
    const spliterForFeatures = (value) => {
        return value.split(":");
      };
    function priceChanger(x){
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    const deleteFavProduct = async (id) => {
        const cookie = Cookies.get("auth_cookie");
        try {
            setRemoveButtonDisabled(true);
            await axios.delete(`https://mernfa-fileshop-server.iran.liara.run/api/user/remove-favorite-product/${id}`,{
                headers: {auth_cookie: cookie}
            })
            const newFavProducts = data.filter((d) => d._id !== id);
            setData(newFavProducts);
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.msg ? error.response.data.msg : "خطا در حذف محصول از علاقه مندی ها",{position: "top-right",autoClose: 5000,rtl: true,className: 'toast-message'})
        }
        setRemoveButtonDisabled(false);
    }
    useEffect(() => {
        const cookie = Cookies.get("auth_cookie");
        axios.get("https://mernfa-fileshop-server.iran.liara.run/api/user/get-part-of-user-data/favorites",{
            headers: {auth_cookie: cookie}
        }).then((d) => {
            setData(d.data.data);
            setLoading(false);
        }).catch((e) => {
            console.log(e);
            toast.error('خطا در لود اطلاعات',{position: "top-right",autoClose: 5000,rtl: true,className: 'toast-message'})
        })
    },[])
    return ( 
        <section>
            <div className="flex flex-col gap-8">
                <h1 className="text-indigo-500 text-lg">محصولات مورد علاقه شما</h1>
                <div>
                    {
                        loading ? (
                            <div className="flex justify-center py-5 my-10">
                                <Image alt="loading gif" src={"/loading.gif"} width={140} height={140} /> 
                            </div>
                        ) : (
                            data.length == 0 ? <p className="flex justify-center my-16 text-lg text-zinc-500">محصولی موجود نیست.</p> : (
                                <div className="flex flex-col items-center gap-4">
                                    {data.map((d,i) => (
                                        <div className="w-full flex flex-col items-center md:flex-row md:items-stretch gap-4 bg-zinc-100 p-3 border-2 border-zinc-200 rounded-lg" key={i}>
                                            <div>
                                                <Image className="rounded-md" width={380} height={150} src={d.image} alt={d.imageAlt} title={d.imageAlt} />
                                            </div>
                                            <div className="w-full flex flex-col xl:flex-row justify-between gap-4">
                                                <div className="w-full flex flex-col gap-4 pt-1">
                                                    <div className="text-lg">{d.title}</div>
                                                    <div className="line-clamp-3 leading-7">{d.shortDesc}</div>
                                                </div>
                                                <div className="flex flex-col gap-4">
                                                    <div className="flex items-center flex-wrap sm:flex-nowrap gap-2 my-4 sm:my-0 text-base sm:text-sm">
                                                        <span className="min-w-[75px] flex justify-between items-center gap-1 bg-green-600 text-white px-2 py-1 rounded-md"><span className="fa-num">{priceChanger(d.price)}</span> تومان</span>
                                                        {
                                                            d.buyNumber < 10 ? <></> : (
                                                                <span className="min-w-[65px] flex justify-between items-center gap-1 bg-blue-600 text-white px-2 py-1 rounded-md"><span className="fa-num">{d.buyNumber}</span> فروش</span>
                                                            )
                                                        }
                                                        <Link className="w-32 bg-orange-500 text-white text-center px-2 py-1 rounded-md transition-all duration-300 hover:bg-orange-600" href={`/shop/${d.slug}`} target="_blank">مشاهده محصول</Link>
                                                        <button disabled={removeButtonDisabled} onClick={()=>{deleteFavProduct(d._id)}} className="flex items-center gap-1 bg-red-600 text-white px-2 py-1 rounded-md"><AiOutlineDelete className="w-4 h-4"/>حذف</button>
                                                    </div>
                                                    <div className="flex flex-col gap-2 mb-4 sm:mb-8 text-base sm:text-sm">
                                                        {d.features.map((d, i) => (
                                                            <div key={i} className="flex justify-between items-center text-zinc-500">
                                                                <span>{spliterForFeatures(d)[0]}:</span>
                                                                <span>{spliterForFeatures(d)[1]}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )
                        )
                    }
                </div>
            </div>
        </section>
     );
}
 
export default Favorites;