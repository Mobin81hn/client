"use client";
import Image from "next/image";
import Link from "next/link";
import { BsTelegram ,BsTelephoneFill } from 'react-icons/bs';
import { AiFillTwitterCircle , AiOutlineYoutube } from 'react-icons/ai';
import { MdMail } from 'react-icons/md';
import { IoPerson } from 'react-icons/io5';
import { HiShoppingCart } from 'react-icons/hi';
import SearchProducts from "../searchProducts";
import { useState } from "react";

// USING CONTEXT
import { useAppContext } from "@/context/appContext";

const Header = () => {
    const [logoHover , setLogoHover] = useState(false);
    const {cartNumber,cartNumberLoading} = useAppContext();

    return ( 
        <header className="container mx-auto p-2">
            <div className="flex flex-col lg:flex-row justify-between items-center">
                <div onMouseEnter={() => setLogoHover(true)} onMouseLeave={() => setLogoHover(false)} className="relative w-52">
                    <Link href={"/"} className="logo z-10 relative lg:p-4 p-4 flex flex-col items-center rounded-lg bg-white shadow-[0px_1px_10px_rgba(0,0,0,0.25)]
                     transition-all duration-500 hover:shadow-[0px_1px_10px_rgba(0,0,0,0.5)]">
                        <Image className="mb-3" alt="mernfa logo" width={100} height={100} src={"/images/logo.png"}/>
                        <div>فروشگاه فایل شاپ</div>
                    </Link>
                    <div className={
                        logoHover 
                        ? "flex justify-around items-center absolute w-full top-[170px] transition-all duration-500 z-5 text-indigo-600 p-2 rounded-b-md"
                        : "flex justify-around items-center absolute w-full top-28 transition-all duration-500 z-5 text-indigo-600 p-2 rounded-b-md"
                    }>
                        <Link className="hover:text-orange-500 text-[1.5rem] transition-all duration-500" href={"https://telegram.me"} target={"_blank"}><BsTelegram/></Link>
                        <Link className="hover:text-orange-500 text-[1.7rem] transition-all duration-500" href={"https://twitter.com"} target={"_blank"}><AiFillTwitterCircle/></Link>
                        <Link className="hover:text-orange-500 text-[1.7rem] transition-all duration-500" href={"https://www.youtube.com"} target={"_blank"}><AiOutlineYoutube/></Link>
                    </div>
                </div>
                <div className="flex flex-col gap-4 w-full lg:mr-6">
                    <div className="flex mt-14 mb-4 justify-center md:justify-between items-center lg:mt-0 lg:mb-0">
                        <nav>
                            <ul className="flex flex-col sm:flex-row gap-2">
                                <li>
                                    <Link href={"/"} className="w-32 lg:w-36 h-10 rounded-md bg-zinc-100 flex justify-center items-center transition-all duration-300 hover:bg-orange-400 hover:text-white">خانه</Link>
                                </li>
                                <li>
                                    <Link href={"/shop"} className="w-32 lg:w-36 h-10 rounded-md bg-zinc-100 flex justify-center items-center transition-all duration-300 hover:bg-orange-400 hover:text-white">فروشگاه</Link>
                                </li>
                                <li>
                                    <Link href={"/blog"} className="w-32 lg:w-36 h-10 rounded-md bg-zinc-100 flex justify-center items-center transition-all duration-300 hover:bg-orange-400 hover:text-white">وبلاگ</Link>
                                </li>
                            </ul>
                        </nav>
                        <div className="hidden md:flex md:flex-col gap-5 items-end">
                            <div className="flex gap-4 items-center">
                                <div>09352494933</div>
                                <span className="bg-slate-200 rotate-12 rounded">
                                    <BsTelephoneFill className="w-8 h-8 p-2"/>
                                </span>
                            </div>
                            <div className="flex gap-4 items-center">
                                <div>mobinhamidi02th@gmail.com</div>
                                <span className="bg-slate-200 rotate-12 rounded">
                                    <MdMail className="w-8 h-8 p-2 -rotate-12"/>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col-reverse items-center gap-8 sm:flex-row sm:gap-4">
                        <SearchProducts/>
                        <div className="flex gap-2 items-center">
                            <Link href={"/account/info"}>
                                <IoPerson className="bg-zinc-400 text-white rounded p-2 w-12 h-12"/>
                            </Link>
                            <Link href={"/cart"} className="w-44 min-w-[176px] flex gap-2 justify-between items-center bg-orange-400 text-orange-400 p-2 rounded-md">
                                <div className="bg-white fa-num rounded-full w-6 h-6 flex justify-center items-center pt-[3px]">
                                    {
                                        cartNumberLoading ? (
                                        <svg aria-hidden="true" className="inline w-4 h-4 text-gray-400 animate-spin dark:text-gray-600 fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                        </svg> ) : cartNumber
                                    }
                                </div>
                                <div className="text-white">سبد خرید</div>
                                <div className="bg-white rounded-lg p-1"><HiShoppingCart className="w-6 h-6"/></div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </header>
     );
}
 
export default Header;