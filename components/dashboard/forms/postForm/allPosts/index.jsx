"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import Box from "./box";
import Image from "next/image";
import Pagination from "../../formsPagination";

const AllPosts = ({setPostDetCtrl}) => {
    const [posts , setPosts] = useState([]);
    const [pageNumber , setPageNumber] = useState(1);
    const [postsCount , setPostsCount] = useState(0);
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
        axios.get(`https://mernfa-fileshop-server.iran.liara.run/api/post/all-posts?pn=${pageNumber}`)
        .then(d => {
            setPosts(d.data.data)
            setPostsCount(d.data.postsCount)
            setPagesCount(Math.ceil(d.data.postsCount/10))
            setLoading(false)
        })
        .catch(e => console.log(e))
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
                            {postsCount ? <div className="text-slate-600-500 text-lg">تعداد پست ها : <span className="fa-num">{postsCount}</span> عدد</div> : <></>}
                            {
                                postsCount == 0 ?
                                <div className="text-lg text-zinc-500 text-center my-10">پستی وجود ندارد.</div> :
                                posts.map((b,i)=>{
                                    return <Box key={i} {...b} setPostDetCtrl={setPostDetCtrl}/>
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
 
export default AllPosts;