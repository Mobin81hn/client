"use client";
import { useEffect, useState } from "react";
import AllMiddleBanners from "./allMiddleBanners";
import NewMiddleBanner from "./newMiddleBanner";
import MiddleBannerDetails from "./middleBannerDetails";
import { BsArrowLeft } from "react-icons/bs";

const MiddleBannerMain = () => {
    const [midBanDetCtrl , setMidBanDetCtrl] = useState("")
    const [currentButton , setCurrentButton] = useState("allMidBans")
    const [detail,setDetail] = useState(<AllMiddleBanners setMidBanDetCtrl={setMidBanDetCtrl}/>);

    useEffect(()=>{
        if(midBanDetCtrl != ""){
            setDetail(<MiddleBannerDetails id={midBanDetCtrl} setMidBanDetCtrl={setMidBanDetCtrl}/>)
        }else{
            setDetail(<AllMiddleBanners setMidBanDetCtrl={setMidBanDetCtrl}/>)
        }
    },[midBanDetCtrl])

    return ( 
        <div className="flex flex-col gap-4">
            <section className="flex justify-between">
                <h1 className="text-blue-500 text-xl">بنر های تبلیغاتی</h1>
                <div className="flex items-center gap-2">
                    {
                        midBanDetCtrl ? (
                            <>
                                <span>بازگشت</span>
                                <button onClick={() => {
                                   setMidBanDetCtrl("")
                                   setDetail(<AllMiddleBanners setMidBanDetCtrl={setMidBanDetCtrl}/>)
                                   }} className="flex justify-center items-center bg-orange-500 text-white w-8 h-8 rounded-md transition-colors duration-300 hover:bg-blue-600"><BsArrowLeft className="w-5 h-5"/></button> 
                            </>
                        ) : (
                            <>
                                <button onClick={() => {
                                    setDetail(<AllMiddleBanners setMidBanDetCtrl={setMidBanDetCtrl}/>)
                                    setCurrentButton("allMidBans")
                                }} className={
                                    currentButton == "allMidBans" ?
                                    "px-3 py-1 rounded-md bg-blue-500 text-white transition-colors duration-500" :
                                    "px-3 py-1 rounded-md bg-orange-500 text-white transition-colors duration-500 hover:bg-orange-600"
                                }>
                                    همه
                                </button>
                                <button onClick={() => {
                                    setDetail(<NewMiddleBanner/>)
                                    setCurrentButton("newMidBan")
                                }} className={
                                    currentButton == "newMidBan" ?
                                    "px-3 py-1 rounded-md bg-blue-500 text-white transition-colors duration-500" :
                                    "px-3 py-1 rounded-md bg-orange-500 text-white transition-colors duration-500 hover:bg-orange-600"
                                }>
                                    بنر جدید
                                </button>
                            </>
                        )
                    }
                </div>
            </section>
            <section>
                {detail}
            </section>
        </div>
     );
}
 
export default MiddleBannerMain;