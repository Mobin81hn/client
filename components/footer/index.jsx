"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { HiOutlineArrowUp } from "react-icons/hi";
import { TfiAngleLeft } from "react-icons/tfi";

const Footer = () => {
    const [showArrowUp , setShowArrowUp] = useState(false)

    const goTopCtrl = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    const arrowUpHandler = () => {
        if(scrollY > 1200){
            setShowArrowUp(true)
        }else{
            setShowArrowUp(false)
        }
    }

    useEffect(()=>{
        window.addEventListener('scroll',arrowUpHandler)
    },[])

    return ( 
        <footer className="container mx-auto px-2 flex flex-col gap-8 py-6 mt-8">
            <div className="flex flex-col gap-10 lg:flex-row justify-between items-center bg-zinc-100 px-8 py-8 rounded-md">
                <div className="flex flex-col items-center min-[425px]:w-96 gap-2 lg:w-72">
                    <Image alt="mernfa logo" width={120} height={120} src={"/images/logo.png"}/>
                    <p className="mt-3 text-center">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است</p>
                </div>
                <div className="flex flex-col min-[425px]:flex-row gap-12 items-start">
                    <div className="w-40">
                        <h2 className="text-xl mb-6">دسترسی سریع</h2>
                        <ul className="flex flex-col gap-1 text-base sm:text-sm">
                            <li>
                                <Link href={"/about"} className="flex items-center gap-1 py-1 transition-all duration-500 hover:text-orange-400 hover:-translate-x-2"><TfiAngleLeft/><span>درباره ما</span></Link>
                            </li>
                            <li>
                                <Link href={"/blog"} className="flex items-center gap-1 py-1 transition-all duration-500 hover:text-orange-400 hover:-translate-x-2"><TfiAngleLeft/><span>وبلاگ</span></Link>
                            </li>
                            <li>
                                <Link href={"/help"} className="flex items-center gap-1 py-1 transition-all duration-500 hover:text-orange-400 hover:-translate-x-2"><TfiAngleLeft/><span>حریم خصوصی</span></Link>
                            </li>
                            <li>
                                <Link href={"/contact"} className="flex items-center gap-1 py-1 transition-all duration-500 hover:text-orange-400 hover:-translate-x-2"><TfiAngleLeft/><span>تماس باما</span></Link>
                            </li>
                        </ul>
                    </div>
                    <div className="w-44">
                        <h2 className="text-xl mb-6">راهنمای خرید</h2>
                        <ul className="flex flex-col gap-1 text-base sm:text-sm">
                            <li>
                                <Link href={"/help"} className="flex items-center gap-1 py-1 transition-all duration-500 hover:text-orange-400 hover:-translate-x-2"><TfiAngleLeft/><span>سوالات متداول</span></Link>
                            </li>
                            <li>
                                <Link href={"/help"} className="flex items-center gap-1 py-1 transition-all duration-500 hover:text-orange-400 hover:-translate-x-2"><TfiAngleLeft/><span>چگونه خرید کنم؟</span></Link>
                            </li>
                            <li>
                                <Link href={"/help"} className="flex items-center gap-1 py-1 transition-all duration-500 hover:text-orange-400 hover:-translate-x-2"><TfiAngleLeft/><span>قوانین استفاده از محصولات</span></Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="flex gap-4">
                    <Image alt="logo" width={120} height={120} src={"/images/1.png"}/>
                    <Image alt="logo" width={120} height={120} src={"/images/2.png"}/>
                </div>
            </div>
            <div className="text-center">
                <p className="px-4">تمامی حقوق مادی و معنوی این وبسایت متعلق به مرن فا می باشد. mernfa.ir</p>
                <HiOutlineArrowUp onClick={goTopCtrl} className={
                    showArrowUp 
                    ? "fixed bottom-10 right-8 w-12 h-12 opacity-70 translate-y-0 pointer-events-auto p-2 rounded-md border-2 border-indigo-400 bg-zinc-200 cursor-pointer transition-all duration-500 hover:bg-indigo-400 hover:text-white hover:opacity-100"
                    : "fixed bottom-10 right-8 w-12 h-12 opacity-0 translate-y-10 pointer-events-none p-2 rounded-md border-2 border-indigo-400 bg-zinc-200 cursor-pointer transition-all duration-500 hover:bg-indigo-400 hover:text-white"
                }
                />
            </div>
        </footer>
     );
}
 
export default Footer;