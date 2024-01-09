"use client";
import { useEffect, useState } from "react";
import AllCategories from "./allCategories";
import NewCategory from "./newCategory";
import CategoryDetails from "./categoryDetails";
import { BsArrowLeft } from "react-icons/bs";

const CategoryMain = () => {
    const [categoryDetCtrl , setCategoryDetCtrl] = useState("")
    const [currentButton , setCurrentButton] = useState("allCategories")
    const [detail,setDetail] = useState(<AllCategories setCategoryDetCtrl={setCategoryDetCtrl}/>);

    useEffect(()=>{
        if(categoryDetCtrl != ""){
            setDetail(<CategoryDetails id={categoryDetCtrl} setCategoryDetCtrl={setCategoryDetCtrl}/>)
        }else{
            setDetail(<AllCategories setCategoryDetCtrl={setCategoryDetCtrl}/>)
        }
    },[categoryDetCtrl])

    return ( 
        <div className="flex flex-col gap-4">
            <section className="flex justify-between">
                <h1 className="text-blue-500 text-xl">دسته های محصول</h1>
                <div className="flex items-center gap-2">
                    {
                        categoryDetCtrl ? (
                            <>
                                <span>بازگشت</span>
                                <button onClick={() => {
                                   setCategoryDetCtrl("")
                                   setDetail(<AllCategories setCategoryDetCtrl={setCategoryDetCtrl}/>)
                                   }} className="flex justify-center items-center bg-orange-500 text-white w-8 h-8 rounded-md transition-colors duration-300 hover:bg-blue-600"><BsArrowLeft className="w-5 h-5"/></button> 
                            </>
                        ) : (
                            <>
                                <button onClick={() => {
                                    setDetail(<AllCategories setCategoryDetCtrl={setCategoryDetCtrl}/>)
                                    setCurrentButton("allCategories")
                                }} className={
                                    currentButton == "allCategories" ?
                                    "px-3 py-1 rounded-md bg-blue-500 text-white transition-colors duration-500" :
                                    "px-3 py-1 rounded-md bg-orange-500 text-white transition-colors duration-500 hover:bg-orange-600"
                                }>
                                    همه
                                </button>
                                <button onClick={() => {
                                    setDetail(<NewCategory/>)
                                    setCurrentButton("newCategory")
                                }} className={
                                    currentButton == "newCategory" ?
                                    "px-3 py-1 rounded-md bg-blue-500 text-white transition-colors duration-500" :
                                    "px-3 py-1 rounded-md bg-orange-500 text-white transition-colors duration-500 hover:bg-orange-600"
                                }>
                                    دسته جدید
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
 
export default CategoryMain;