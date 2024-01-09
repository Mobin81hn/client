"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import Box from "./box";
import Image from "next/image";
import Pagination from "../../formsPagination";
import { toast } from "react-toastify";

const AllSliders = ({setSliderDetCtrl}) => {
    const [sliders , setSliders] = useState([]);
    const [pageNumber , setPageNumber] = useState(1);
    const [slidersCount , setSlidersCount] = useState(0);
    const [pagesCount , setPagesCount] = useState(0);
    const [loading , setLoading] = useState(true)

    const goTopCtrl = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }; 

    useEffect(()=>{
        setLoading(true)
        goTopCtrl()
        axios.get(`https://mernfa-fileshop-server.iran.liara.run/api/slider/all-sliders?pn=${pageNumber}`)
        .then(d => {
            setSliders(d.data.data)
            setSlidersCount(d.data.slidersCount)
            setPagesCount(Math.ceil(d.data.slidersCount/10))
            setLoading(false)
        })
        .catch(e => {
            toast.error("خطا در لود اطلاعات",{position: "top-right",autoClose: 5000,rtl: true,className: 'toast-message'})
            console.log(e)
        })
    },[pageNumber])

    return ( 
        <div className="flex flex-col gap-14 my-6">
            {
                loading ?
                (
                    <div className="flex justify-center py-5">
                        <Image alt="loading gif" src={"/loading.gif"} width={120} height={120} /> 
                    </div>
                )
                : (
                    <>
                        <div className="flex flex-col gap-8">
                            {slidersCount ? <div className="text-slate-600-500 text-lg">تعداد اسلایدرها : <span className="fa-num">{slidersCount}</span> عدد</div> : <></>}
                            {
                                slidersCount == 0 ?
                                <div className="text-lg text-zinc-500 text-center my-10">اسلایدری وجود ندارد.</div> :
                                sliders.map((b,i)=>{
                                    return <Box key={i} {...b} setSliderDetCtrl={setSliderDetCtrl}/>
                                })
                            }
                        </div>
                        <div className="flex flex-col items-center gap-6">
                            <div className="flex gap-4">
                                <Pagination pagesCount={pagesCount} pageNumber={pageNumber} setPageNumber={setPageNumber} />
                            </div>
                            {pagesCount > 1 ? <div>صفحه <span className="fa-num">{pageNumber}</span> از <span className="fa-num">{pagesCount}</span></div> : <></>}
                        </div>
                    </>
                )
            }
        </div>
     );
}
 
export default AllSliders;