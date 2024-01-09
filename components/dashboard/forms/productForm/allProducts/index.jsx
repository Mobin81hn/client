"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import Box from "./box";
import Image from "next/image";
import Pagination from "../../formsPagination";

const AllProducts = ({setProductDetCtrl}) => {
    const [products , setProducts] = useState([]);
    const [pageNumber , setPageNumber] = useState(1);
    const [productsCount , setProductsCount] = useState(0);
    const [pagesCount , setPagesCount] = useState(0);
    const [loading , setLoading] = useState(true)
    const [category , setCategory] = useState("all")

    const goTopCtrl = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    useEffect(()=>{
        goTopCtrl()
        setLoading(true)
        let targetUrl;
        switch (category) {
            case "all":
                targetUrl = "all-products"
                break;
            case "books":
                targetUrl = "get-products-of-type/book"
                break;
            case "apps":
                targetUrl = "get-products-of-type/app"
                break;
            case "gr":
                targetUrl = "get-products-of-type/gr"
                break;
            default:
                targetUrl = "all-products"
                break;
        }
        axios.get(`https://mernfa-fileshop-server.iran.liara.run/api/product/${targetUrl}?pn=${pageNumber}`)
        .then(d => {
            setProducts(d.data.data)
            setProductsCount(d.data.productsCount)
            setPagesCount(Math.ceil(d.data.productsCount/10))
            setLoading(false)
        })
        .catch(e => console.log(e))
    },[pageNumber,category])

    return ( 
        <div className="flex flex-col gap-14 my-2">
            <div className="flex gap-2 text-white">
                <button onClick={() => {
                    setPageNumber(1)
                    setCategory("all") 
                }} className={category == "all" ? "bg-blue-500 px-3 py-1 rounded-md" : "bg-orange-500 text-white px-3 py-1 rounded-md"}>همه محصولات</button>
                <button onClick={() => {
                    setPageNumber(1)
                    setCategory("books")
                }} className={category == "books" ? "bg-blue-500 px-3 py-1 rounded-md" : "bg-orange-500 text-white px-3 py-1 rounded-md"}>کتاب ها</button>
                <button onClick={() => {
                    setPageNumber(1)
                    setCategory("apps")
                }} className={category == "apps" ? "bg-blue-500 px-3 py-1 rounded-md" : "bg-orange-500 text-white px-3 py-1 rounded-md"}>اپلیکیشن ها</button>
                <button onClick={() => {
                    setPageNumber(1)
                    setCategory("gr")
                }} className={category == "gr" ? "bg-blue-500 px-3 py-1 rounded-md" : "bg-orange-500 text-white px-3 py-1 rounded-md"}>فایل های گرافیکی</button>
            </div>
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
                            {productsCount ? <div className="text-slate-600-500 text-lg">تعداد محصولات  : <span className="fa-num">{productsCount}</span> عدد</div> : <></>}
                            {
                                productsCount == 0 ?
                                <div className="text-lg text-zinc-500 text-center my-10">محصولی وجود ندارد.</div> :
                                products.map((b,i)=>{
                                    return <Box key={i} {...b} setProductDetCtrl={setProductDetCtrl}/>
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
 
export default AllProducts;