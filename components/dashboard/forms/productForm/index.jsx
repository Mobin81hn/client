"use client";
import { useEffect, useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import AllProducts from "./allProducts";
import NewProduct from "./newProduct";
import ProductDetails from "./productDetails";

const ProductMain = () => {
    const [productDetCtrl , setProductDetCtrl] = useState("")
    const [currentButton , setCurrentButton] = useState("allProducts")
    const [detail,setDetail] = useState(<AllProducts setProductDetCtrl={setProductDetCtrl}/>);

    useEffect(()=>{
        if(productDetCtrl != ""){
            setDetail(<ProductDetails id={productDetCtrl} setProductDetCtrl={setProductDetCtrl}/>)
        }else{
            setDetail(<AllProducts setProductDetCtrl={setProductDetCtrl}/>)
        }
    },[productDetCtrl])

    return ( 
        <div className="flex flex-col gap-4">
            <section className="flex justify-between">
                <h1 className="text-blue-500 text-xl">محصولات</h1>
                <div className="flex items-center gap-2">
                    {
                        productDetCtrl ? (
                            <>
                                <span>بازگشت</span>
                                <button onClick={() => {
                                   setProductDetCtrl("")
                                }} className="flex justify-center items-center bg-orange-500 text-white w-8 h-8 rounded-md transition-colors duration-300 hover:bg-blue-600"><BsArrowLeft className="w-5 h-5"/></button> 
                            </>
                        ) : (
                            <>
                                <button onClick={() => {
                                    setDetail(<AllProducts setProductDetCtrl={setProductDetCtrl}/>)
                                    setCurrentButton("allProducts")
                                }} className={
                                    currentButton == "allProducts" ?
                                    "px-3 py-1 rounded-md bg-blue-500 text-white transition-colors duration-500" :
                                    "px-3 py-1 rounded-md bg-orange-500 text-white transition-colors duration-500 hover:bg-orange-600"
                                }>
                                    همه
                                </button>
                                <button onClick={() => {
                                    setDetail(<NewProduct/>)
                                    setCurrentButton("newProduct")
                                }} className={
                                    currentButton == "newProduct" ?
                                    "px-3 py-1 rounded-md bg-blue-500 text-white transition-colors duration-500" :
                                    "px-3 py-1 rounded-md bg-orange-500 text-white transition-colors duration-500 hover:bg-orange-600"
                                }>
                                    محصول جدید
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
 
export default ProductMain;