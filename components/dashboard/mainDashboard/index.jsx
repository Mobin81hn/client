"use client";
import { useEffect, useState } from "react";
import DashboardCtrl from "../dashboard-ctrl";
import MiddleBannerMain from "../forms/middleBannerForm";
import PostMain from "../forms/postForm";
import SliderMain from "../forms/slidersForm";
import CategoryMain from "../forms/categoryForm";
import ProductMain from "../forms/productForm";
import UserMain from "../forms/userForm";
import AdminForm from "../forms/welcomeForm";

const MainDashboard = () => {
    const [contentChanger , setContentChanger] = useState("")
    const [details , setDetails] = useState(<AdminForm/>)

    useEffect(() => {
        if(contentChanger == "middleBanners"){
            setDetails(<MiddleBannerMain/>)
        }else if(contentChanger == "sliders"){
            setDetails(<SliderMain/>)
        }else if(contentChanger == "posts"){
            setDetails(<PostMain/>)
        }else if(contentChanger == "categories"){
            setDetails(<CategoryMain/>)
        }else if(contentChanger == "products"){
            setDetails(<ProductMain/>)
        }else if(contentChanger == "users"){
            setDetails(<UserMain/>)
        }
    },[contentChanger])

    return ( 
        <div className="flex justify-between items-start gap-8 px-10">
            <DashboardCtrl setContentChanger={setContentChanger}/>
            <div className="w-full">
                {details}
            </div>
        </div>
     );
}
 
export default MainDashboard;