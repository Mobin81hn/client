"use client";
import { useEffect, useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import AllUsers from "./allUsers";
import UserDetails from "./userDetails";

const UserMain = () => {
    const [userDetCtrl , setUserDetCtrl] = useState("")
    const [detail,setDetail] = useState(<AllUsers setUserDetCtrl={setUserDetCtrl}/>);

    useEffect(()=>{
        if(userDetCtrl != ""){
            setDetail(<UserDetails id={userDetCtrl} setUserDetCtrl={setUserDetCtrl}/>)
        }else{
            setDetail(<AllUsers setUserDetCtrl={setUserDetCtrl}/>)
        }
    },[userDetCtrl])
    return ( 
        <div className="flex flex-col gap-4">
            <section className="flex justify-between">
                <h1 className="text-blue-500 text-xl">کاربران وبسایت</h1>
                <div className="flex items-center gap-2">
                    {
                        userDetCtrl ? (
                            <>
                                <span>بازگشت</span>
                                <button onClick={() => {
                                   setUserDetCtrl("")
                                }} className="flex justify-center items-center bg-orange-500 text-white w-8 h-8 rounded-md transition-colors duration-300 hover:bg-blue-600"><BsArrowLeft className="w-5 h-5"/></button> 
                            </>
                        ) : <></>
                    }
                </div>
            </section>
            <section>
                {detail}
            </section>
        </div>
        
     );
}
 
export default UserMain;
