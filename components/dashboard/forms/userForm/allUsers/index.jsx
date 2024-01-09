"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import Box from "./box";
import Image from "next/image";
import Pagination from "../../formsPagination";

const AllUsers = ({setUserDetCtrl}) => {
    const [users , setUsers] = useState([]);
    const [pageNumber , setPageNumber] = useState(1);
    const [usersCount , setUsersCount] = useState(0);
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
        axios.get(`https://mernfa-fileshop-server.iran.liara.run/api/user/all-users?pn=${pageNumber}`)
        .then(d => {
            setUsers(d.data.data)
            setUsersCount(d.data.UsersCount)
            setPagesCount(Math.ceil(d.data.UsersCount/10))
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
                            {usersCount ? <div className="text-slate-600-500 text-lg">تعداد کاربران : <span className="fa-num">{usersCount}</span> نفر</div> : <></>}
                            {
                                usersCount == 0 ?
                                <div className="text-lg text-zinc-500 text-center my-10">کاربری وجود ندارد.</div> :
                                users.map((b,i)=>(
                                    <Box key={i} {...b} setUserDetCtrl={setUserDetCtrl}/>
                                ))
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
 
export default AllUsers;