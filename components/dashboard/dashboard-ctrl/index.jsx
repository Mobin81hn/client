"use client";
import { useState } from "react";
import DashboardCtrlBtn from "./btn";

const DashboardCtrl = ({setContentChanger}) => {
    const [currentButton , setCurrentButton] = useState("")
    return ( 
        <div className="sticky top-6 w-56 min-w-[224px] flex flex-col items-center gap-6 rounded-lg bg-zinc-200 p-4">
            <DashboardCtrlBtn title={"بنر های تبلیغاتی"} content={"middleBanners"} currentButton={currentButton} setCurrentButton={setCurrentButton} setContentChanger={setContentChanger}/>
            <DashboardCtrlBtn title={"اسلایدر ها"} content={"sliders"} currentButton={currentButton} setCurrentButton={setCurrentButton} setContentChanger={setContentChanger}/>
            <DashboardCtrlBtn title={"پست ها"} content={"posts"} currentButton={currentButton} setCurrentButton={setCurrentButton} setContentChanger={setContentChanger}/>
            <DashboardCtrlBtn title={"دسته محصول"} content={"categories"} currentButton={currentButton} setCurrentButton={setCurrentButton} setContentChanger={setContentChanger}/>
            <DashboardCtrlBtn title={"محصولات"} content={"products"} currentButton={currentButton} setCurrentButton={setCurrentButton} setContentChanger={setContentChanger}/>
            <DashboardCtrlBtn title={"کاربران"} content={"users"} currentButton={currentButton} setCurrentButton={setCurrentButton} setContentChanger={setContentChanger}/>
        </div>
     );
}
 
export default DashboardCtrl;