"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import Info from "../info";
import Files from "../files";
import Favorites from "../favorites";
import Comments from "../comments";
import Payments from "../payments";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { MdClose, MdMenu } from "react-icons/md";

const Account = ({items}) => {
    const [details , setDetails] = useState("");
    const [menuIsOpen , setMenuIsOpen] = useState(false);
    const router = useRouter();
    useEffect(() => {
        if(items.slug[0] == "info"){
            setDetails(<Info/>)
        }else if(items.slug[0] == "products"){
            setDetails(<Files/>)
        }else if(items.slug[0] == "favorites"){
            setDetails(<Favorites/>)
        }else if(items.slug[0] == "comments"){
            setDetails(<Comments/>)
        }else if(items.slug[0] == "payments"){
            setDetails(<Payments/>)
        }else{
            router.push("/account/info")
        }
    },[])

    return ( 
            <div className="w-full sm:w-2/3 md:w-full mx-auto flex flex-col lg:flex-row justify-between items-start gap-8 px-2">
                <div className="md:hidden">
                    {
                        menuIsOpen ? ( 
                            <MdClose onClick={() => setMenuIsOpen(false)} className="w-10 h-10 bg-slate-200 p-1 rounded-sm cursor-pointer"/>
                        ) : (
                            <MdMenu onClick={() => setMenuIsOpen(true)} className="w-10 h-10 bg-slate-200 p-1 rounded-sm cursor-pointer"/>
                        )
                    }
                </div>
                <div className={
                    menuIsOpen ?
                    "w-full h-[345px] xs:h-52 overflow-hidden md:h-auto md:w-full lg:w-60 min-w-[244px] bg-zinc-100 transition-all duration-500 p-3 md:p-6 rounded-md lg:sticky top-4":
                    "w-full h-0 overflow-hidden md:h-auto md:w-full lg:w-60 min-w-[244px] bg-zinc-100 transition-all duration-500 md:p-3 lg:p-6 rounded-md lg:sticky top-4"
                }>
                    <nav>
                        <ul className="flex flex-wrap justify-center md:justify-between lg:gap-4">
                            <li className="w-64 xs:w-1/2 md:w-32 lg:w-full">
                                <Link className={
                                    items.slug[0] == "info" ?
                                    "bg-blue-500 m-2 md:m-0 text-white h-12 flex justify-center items-center rounded-md" :
                                    "bg-orange-500 m-2 md:m-0 text-white transition-all duration-300 hover:bg-orange-600 h-12 flex justify-center items-center rounded-md" 
                                } href={"/account/info"}>اطلاعات</Link>
                            </li>
                            <li className="w-64 xs:w-1/2 md:w-32 lg:w-full">
                                <Link className={
                                    items.slug[0] == "favorites" ?
                                    "bg-blue-500 m-2 md:m-0 text-white h-12 flex justify-center items-center rounded-md" :
                                    "bg-orange-500 m-2 md:m-0 text-white transition-all duration-300 hover:bg-orange-600 h-12 flex justify-center items-center rounded-md" 
                                } href={"/account/favorites"}>مورد علاقه ها</Link>
                            </li>
                            <li className="w-64 xs:w-1/2 md:w-32 lg:w-full">
                                <Link className={
                                    items.slug[0] == "products" ?
                                    "bg-blue-500 m-2 md:m-0 text-white h-12 flex justify-center items-center rounded-md" :
                                    "bg-orange-500 m-2 md:m-0 text-white transition-all duration-300 hover:bg-orange-600 h-12 flex justify-center items-center rounded-md" 
                                } href={"/account/products"}>فایل ها</Link>
                            </li>
                            <li className="w-64 xs:w-1/2 md:w-32 lg:w-full">
                                <Link className={
                                    items.slug[0] == "comments" ?
                                    "bg-blue-500 m-2 md:m-0 text-white h-12 flex justify-center items-center rounded-md" :
                                    "bg-orange-500 m-2 md:m-0 text-white transition-all duration-300 hover:bg-orange-600 h-12 flex justify-center items-center rounded-md" 
                                } href={"/account/comments"}>دیدگاه ها</Link>
                            </li>
                            <li className="w-64 xs:w-1/2 md:w-32 lg:w-full">
                                <Link className={
                                    items.slug[0] == "payments" ?
                                    "bg-blue-500 m-2 md:m-0 text-white h-12 flex justify-center items-center rounded-md" :
                                    "bg-orange-500 m-2 md:m-0 text-white transition-all duration-300 hover:bg-orange-600 h-12 flex justify-center items-center rounded-md" 
                                } href={"/account/payments"}>سفارش ها</Link>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div className="w-full">
                    {
                        details ? details : (
                            <div className="flex justify-center py-5 my-10">
                                <Image alt="loading gif" src={"/loading.gif"} width={140} height={140} /> 
                            </div>
                        )
                    }
                </div>
            </div>
     );
}
 
export default Account;