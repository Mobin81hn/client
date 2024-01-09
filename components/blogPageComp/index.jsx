"use client";
import { useEffect, useState } from "react";
import BlogBox from "./box";
import Image from "next/image";
import axios from "axios";
import Pagination from "../blogPagination";

const BlogPageComp = ({url}) => {
    const [blogs , setBlogs] = useState([]);
    const [pagesCount , setPagesCount] = useState(0);
    const [loading , setLoading] = useState(true);

    const goTopCtrl = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }; 

    useEffect(() => {
        setLoading(true)
        goTopCtrl()
        axios.get(`https://mernfa-fileshop-server.iran.liara.run/api/post/search-posts?${url.keyword ? `keyword=${url.keyword}` : ""}${url.pn ? `&pn=${url.pn}` : "&pn=1"}`)
        .then((d) => {
            setBlogs(d.data.data)
            setPagesCount(Math.ceil(d.data.postsCount/10))
            setLoading(false)
        }).catch((e) => console.log(e))
    },[url])
    
    return ( 
        <section className="flex flex-col items-center gap-14">
                <h1 className="text-blue-500 text-xl">وبلاگ فروشگاه فایل مرن فا</h1>
                {
                    loading ? (
                        <div className="flex justify-center py-5">
                            <Image alt="loading gif" src={"/loading.gif"} width={120} height={120} /> 
                        </div>
                    ) : ( 
                        blogs.length == 0 ? (
                            <div className="text-center my-8 text-lg text-zinc-500">
                                مقاله ای موجود نیست...
                            </div>
                        ) : (
                        <div className="flex flex-col gap-12">
                            <div className="flex justify-center flex-wrap gap-6">
                                {
                                    blogs.map((p , i) => (
                                        <BlogBox key={i} {...p}/>
                                    ))
                                }
                            </div>
                            <div className="flex flex-col items-center gap-6">
                                <div className="flex gap-4">
                                    <Pagination keyword={url.keyword} pn={Number(url.pn ? url.pn : "1")} pagesCount={pagesCount}/>
                                </div>
                                {pagesCount > 1 ? <div>صفحه <span className="fa-num">{url.pn ? url.pn : "1"}</span> از <span className="fa-num">{pagesCount}</span></div> : <></>}
                            </div>
                        </div>
                        )
                    )
                }
        </section>
     );
}
 
export default BlogPageComp;