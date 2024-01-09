"use client";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { useEffect , useState } from "react";
import Image from "next/image";
import ChangeDisplayname from "./changeDisplayname";
import ChangePassword from "./changePassword";
import InfoEmailConfirm from "./infoEmailConfirm";
import { BiLogOut } from "react-icons/bi";
import { useRouter } from "next/navigation";

const Info = () => {
    const [data,setData] = useState("");
    const [userIsActive , setUserIsActive] = useState(false);
    const [emailSend , setEmailSend] = useState(true);
    const [emailSendButtonDisabled , setEmailSendButtonDisabled] = useState(false);
    const router = useRouter();
    
    useEffect(()=>{
        const cookie = Cookies.get("auth_cookie");
        axios.get("https://mernfa-fileshop-server.iran.liara.run/api/user/get-part-of-user-data/info",{
            headers: {auth_cookie: cookie}
        })
        .then((d) => {
            /*
            checking data or msg
            */
            setData(d.data.data)
            setEmailSend(d.data.data.emailSend)
            setUserIsActive(d.data.data.userIsActive)
        })
        .catch((e) => {
            console.log(e);
            toast.error("خطا در لود اطلاعات",{position: "top-right",autoClose: 5000,rtl: true,className: 'toast-message'})
        })
    },[]) 

    const logout = () => {
        Cookies.set("auth_cookie","",{expires:0})
        router.push("/login")
    }

    const emailSendChanger = async () => {
        try {
            const cookie = Cookies.get("auth_cookie");
            setEmailSendButtonDisabled(true);
            if(emailSend == true){
                await axios.put("https://mernfa-fileshop-server.iran.liara.run/api/user/update-emailSend",{emailSend: false},{
                    headers: {auth_cookie: cookie}
                })
                setEmailSend(false);
            }else{
                await axios.put("https://mernfa-fileshop-server.iran.liara.run/api/user/update-emailSend",{emailSend: true},{
                    headers: {auth_cookie: cookie}
                })
                setEmailSend(true);
            }
            setEmailSendButtonDisabled(false)
        } catch (error) {
            console.log(error);
            toast.error('خطا در تغییر وضعیت ایمیل',{position: "top-right",autoClose: 5000,rtl: true,className: 'toast-message'})
            setEmailSendButtonDisabled(false)
        }
    }

    return ( 
        <>
            {
                !data ? (
                    <div className="flex justify-center py-5 my-10">
                        <Image alt="loading gif" src={"/loading.gif"} width={140} height={140} /> 
                    </div>
                ) : (
                    <div className="flex flex-col gap-8 text-base sm:text-sm">
                        {
                            userIsActive ? <></> : <InfoEmailConfirm setUserIsActive={setUserIsActive}/>
                        }
                        <div className="flex flex-col gap-4 bg-zinc-100 rounded-md py-6 px-4">
                            <div className="flex justify-between items-center">
                                <h1 className="text-orange-500 text-lg mb-2">اطلاعات من</h1>
                                <button onClick={logout} className="hidden sm:flex items-center gap-2 bg-transparent border-2 border-blue-500 py-1 px-2 mx-2 rounded-xl transition-all duration-500 hover:bg-blue-500 hover:text-white">خروج از حساب <BiLogOut className="w-4 h-4"/></button>
                            </div>
                            <div>نام کاربری : {data.username}</div>
                            <div>نام نمایشی : {data.displayname}</div>
                            <div>ایمیل : {data.email}</div>
                            <div>تاریخ ثبت نام : {data.createdAt}</div>
                            {
                                data.createdAt == data.updatedAt ? <></> : <div className="leading-8">تاریخ بروزرسانی اطلاعات : {data.updatedAt}</div>
                            }
                            <div className="flex justify-between items-end">
                                <div className="flex flex-col items-start gap-2">
                                    <div className="text-indigo-500 text-base my-2">اطلاع رسانی ها :</div>
                                    <button disabled={emailSendButtonDisabled} onClick={emailSendChanger} className={emailSend ?
                                    (emailSendButtonDisabled ? 
                                        "bg-green-600 opacity-50 text-white w-24 py-1 rounded-md" : 
                                        "bg-green-600 text-white w-24 py-1 rounded-md"
                                    ) :
                                    (emailSendButtonDisabled ? 
                                        "bg-rose-600 opacity-50 text-white w-24 py-1 rounded-md" : 
                                        "bg-rose-600 text-white w-24 py-1 rounded-md"
                                    )
                                    }>{emailSend ? "فعال" : "غیر فعال"}</button>
                                </div>
                                <div>
                                    <button onClick={logout} className="flex sm:hidden items-center gap-2 bg-transparent border-2 border-blue-500 py-1 px-2 mx-2 rounded-xl transition-all duration-500 hover:bg-blue-500 hover:text-white">خروج از حساب <BiLogOut className="w-4 h-4 hidden sm:inline"/></button>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-6 mt-4 bg-zinc-100 rounded-md py-6 px-4">
                            <h1 className="text-orange-500 text-lg mb-2">تغییر اطلاعات</h1>
                            <div className="flex flex-col gap-8 items-center xl:flex-row justify-around xl:items-start">
                                <ChangeDisplayname/>
                                <ChangePassword/>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
     );
}
 
export default Info;