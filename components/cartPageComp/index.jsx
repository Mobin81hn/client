"use client";
import axios from "axios";
import Cookies from "js-cookie";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import CartBox from "./box";


const CartPageComp = () => {
    const [data , setData] = useState([]);
    const [needToRefresh , setNeedToRefresh] = useState(false);
    const [loading , setLoading] = useState(true);
    
    function priceChanger(x){
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    function sumNumber(){
        const sum = data.reduce((a,b) => a + Number(b.price) , 0)
        const num = priceChanger(sum);
        return num;
    }

    useEffect(() => {
        const cookie = Cookies.get("auth_cookie");
        axios.get("https://mernfa-fileshop-server.iran.liara.run/api/user/get-user-cart-product",{
            headers: {auth_cookie: cookie}
        }).then((d) => {
            setData(d.data.data)
            setLoading(false);;
        }).catch((e) => {
            console.log(e);
            toast.error('خطا در لود اطلاعات',{position: "top-right",autoClose: 5000,rtl: true,className: 'toast-message'})
        })
    },[needToRefresh])

    return ( 
        <section className="container mx-auto px-6">
            <div className="flex flex-col gap-8 my-12">
                <h1 className="text-indigo-500 text-xl mb-4">سبد خرید</h1>
                {
                    loading ? (
                        <div className="flex justify-center py-5 my-10">
                            <Image alt="loading gif" src={"/loading.gif"} width={140} height={140} /> 
                        </div>
                    ) : (
                        <div className="flex flex-col items-center md:flex-row justify-between md:items-start gap-6">
                            {data.length == 0 ? <p className="flex justify-center w-full my-16 text-lg text-zinc-500">سبد خرید خالی است...</p> : (
                                <div className="flex flex-col gap-4 w-full sm:w-2/3 md:w-1/2 xl:w-full">
                                    {data.map((d,i) => (
                                        <CartBox {...d} needToRefresh={needToRefresh} setNeedToRefresh={setNeedToRefresh} key={i}/>
                                    ))}
                                </div>
                            )}
                            <div className="flex flex-col gap-6 w-full sm:w-2/3 md:w-80 lg:w-[400px] xl:w-80 sm:min-w-[320px] md:sticky md:top-10 bg-zinc-100 rounded-md px-3 py-3">
                                <div className="flex justify-between items-center">
                                    <div>مجموع قیمت :</div>
                                    <div><span className="fa-num mx-1">{sumNumber()}</span> تومان</div>
                                </div>
                                <button className="bg-green-600 text-white py-2 rounded-md transition-all duration-300 hover:bg-green-700">پرداخت</button>
                            </div>
                        </div>
                    )
                }
            </div>
        </section>
     );
}
 
export default CartPageComp;