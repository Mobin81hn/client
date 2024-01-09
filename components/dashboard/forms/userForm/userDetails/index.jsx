"use client";
import { useEffect , useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Image from "next/image";
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import Link from "next/link";

const UserDetails = ({id , setUserDetCtrl}) => {
    const [updateButtonDisabled , setUpdateButtonDisabled] = useState(false);
    const [removeButtonDisabled , setRemoveButtonDisabled] = useState(false);
    const [loading , setLoading] = useState(true);
    const [showDialog , setShowDialog] = useState(false);

    const [username , setUsername] = useState("");
    const [displayname , setDisplayname] = useState("");
    const [email , setEmail] = useState("");
    const [favoriteProducts , setFavoriteProducts] = useState([]);
    const [cart , setCart] = useState([]);
    const [userIsActive , setUserIsActive] = useState(false);
    const [emailSend , setEmailSend] = useState(true);
    const [createdAt , setCreatedAt] = useState("");
    const [updatedAt , setUpdatedAt] = useState("");
    
    const onOpenModal = () => setShowDialog(true);
    const onCloseModal = () => setShowDialog(false);
    
    const goTopCtrl = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }; 

    function priceChanger(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const removeUser = async () => {
        try {
            setRemoveButtonDisabled(true)
            await axios.delete(`https://mernfa-fileshop-server.iran.liara.run/api/user/remove-user/${id}`)
            setRemoveButtonDisabled(false)
            onCloseModal()
            toast.success("کاربر با موفقیت حذف شد.",{position: "top-right",autoClose: 5000,rtl: true,className: 'toast-message'})
            setTimeout(() => {
                setUserDetCtrl("")
            }, 500);
        } catch (error) {
            setRemoveButtonDisabled(false)
            onCloseModal()
            toast.error("خطا در حذف کاربر",{position: "top-right",autoClose: 5000,rtl: true,className: 'toast-message'})
        }
    }    

    const formSubmit = async (e) => {
        e.preventDefault();
        if(username == "" || displayname == "" || email == ""){
            return toast.error("خطا در بروزرسانی کاربر",{position: "top-right",autoClose: 5000,rtl: true,className: 'toast-message'})
        }

        setUpdateButtonDisabled(true);
        
        const formData = {
            username,
            displayname,
            email,
            emailSend,
            userIsActive,
            createdAt
        }
        try {
            await axios.put(`https://mernfa-fileshop-server.iran.liara.run/api/user/update-user/${id}`,formData);
            toast.success("کاربر با موفقیت بروزرسانی شد.",{position: "top-right",autoClose: 5000,rtl: true,className: 'toast-message'})
        } catch (error) {
            console.log(error)
            toast.error(error.response?.data?.msg ? error.response.data.msg : "خطا در بروزرسانی کاربر",{position: "top-right",autoClose: 5000,rtl: true,className: 'toast-message'})
        }

        setUpdateButtonDisabled(false);
    }

    useEffect(()=>{
        goTopCtrl();
        axios.get(`https://mernfa-fileshop-server.iran.liara.run/api/user/get-user/${id}`)
        .then((d) => {
            setUsername(d.data.data.username)
            setDisplayname(d.data.data.displayname)
            setEmail(d.data.data.email)
            setFavoriteProducts(d.data.data.favoriteProducts)
            setCart(d.data.data.cart)
            setEmailSend(d.data.data.emailSend)
            setUserIsActive(d.data.data.userIsActive)
            setCreatedAt(d.data.data.createdAt)
            setUpdatedAt(d.data.data.updatedAt)
            setLoading(false)
        })
        .catch(e => console.log(e))
    },[])

    return ( 
        <div className="flex flex-col gap-6">
            {
                loading ? (
                    <div className="flex justify-center py-5">
                        <Image alt="loading gif" src={"/loading.gif"} width={120} height={120} /> 
                    </div>
                ) : (
                    <>
                        <div className="flex justify-between items-center mt-4">
                            <h2 className="text-orange-500 text-xl">اطلاعات کاربر</h2>
                            <button className="bg-red-500 text-white px-4 py-1 rounded-md transition-all duration-300 hover:bg-red-600" onClick={onOpenModal}>حذف کاربر</button>
                            <Modal open={showDialog} onClose={onCloseModal} center>
                              <div>
                                <h1 className="py-10">آیا مطمئن هستید که می خواهید این کاربر را حذف کنید؟</h1>
                                <div className="flex flex-row-reverse gap-2">
                                    <button onClick={removeUser} className="flex items-center px-4 py-1 outline-none rounded-md bg-red-500 text-white transition-all duration-300 hover:shadow-[0px_1px_8px_rgba(200,0,0,0.75)]">
                                        حذف
                                        {
                                            removeButtonDisabled
                                            &&
                                            <svg aria-hidden="true" className="inline w-4 h-4 mr-2 text-gray-400 animate-spin dark:text-gray-600 fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                            </svg>
                                        }
                                    </button>
                                    <button onClick={onCloseModal} className="px-4 py-1 outline-none rounded-md bg-gray-300 text-slate-600 transition-all duration-300 hover:shadow-[0px_1px_6px_rgba(0,0,0,0.25)]">لغو</button>
                                </div>
                              </div>
                            </Modal>
                        </div>
                        <div className="flex  gap-2">
                            <span className="bg-slate-200 px-2 py-1 rounded-md text-zinc-500">تاریخ ایجاد : {createdAt}</span>
                            <span className="bg-slate-200 px-2 py-1 rounded-md text-zinc-500">آخرین بروزرسانی : {updatedAt}</span>
                        </div>
                        <form onSubmit={formSubmit} className="flex flex-col gap-6">
                            <div className="flex flex-col gap-2">
                                <label htmlFor="username">نام کاربری</label>
                                <input id="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)}  className="p-2 rounded-md w-full outline-none border-2 border-zinc-300 focus:border-orange-400"/>
                                {username ? <></> :<p className="text-base sm:text-sm text-red-600">نام کاربری را وارد نکرده اید.</p>}
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="displayname">نام نمایشی</label>
                                <input id="displayname" type="text" value={displayname} onChange={(e) => setDisplayname(e.target.value)}  className="p-2 rounded-md w-full outline-none border-2 border-zinc-300 focus:border-orange-400"/>
                                {displayname ? <></> :<p className="text-base sm:text-sm text-red-600">نام نمایشی را وارد نکرده اید.</p>}
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="email">ایمیل</label>
                                <input id="email" type="text" value={email} onChange={(e) => setEmail(e.target.value)}  className="p-2 rounded-md w-full outline-none border-2 border-zinc-300 focus:border-orange-400"/>
                                {email ? <></> :<p className="text-base sm:text-sm text-red-600">ایمیل را وارد نکرده اید.</p>}
                            </div>
                            <div>
                                <h1 className="text-blue-500 text-lg">محصولات مورد علاقه :</h1>
                                <div className="mt-4">
                                    {
                                        favoriteProducts.length == 0 ? <p className="text-zinc-500 text-center my-8">محصولی موجود نیست...</p> : (
                                            <div className="flex flex-wrap gap-2">
                                                {
                                                    favoriteProducts.map((p,i) => (
                                                        <Link href={`/shop/${p.slug}`} target="_blank" className="w-48 flex flex-col gap-2 bg-slate-200 px-3 py-2 rounded-md transition-all duration-300 hover:bg-slate-300 text-base sm:text-sm" key={i}>
                                                            <div className="flex justify-between items-center">
                                                                <div>عنوان :</div>
                                                                <div>{p.title}</div>
                                                            </div>
                                                            <div className="flex justify-between items-center">
                                                                <div>قیمت :</div>
                                                                <div>{priceChanger(p.price)} تومان</div>
                                                            </div>
                                                        </Link>
                                                    ))
                                                }
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                            <div>
                                <h1 className="text-blue-500 text-lg">سبد خرید :</h1>
                                <div className="mt-4">
                                    {
                                        cart.length == 0 ? <p className="text-zinc-500 text-center my-8">محصولی موجود نیست...</p> : (
                                            <div className="flex flex-wrap gap-2">
                                                {
                                                    cart.map((p,i) => (
                                                        <Link href={`/shop/${p.slug}`} target="_blank" className="w-48 flex flex-col gap-2 bg-slate-200 px-3 py-2 rounded-md transition-all duration-300 hover:bg-slate-300 text-base sm:text-sm" key={i}>
                                                            <div className="flex justify-between items-center">
                                                                <div>عنوان :</div>
                                                                <div>{p.title}</div>
                                                            </div>
                                                            <div className="flex justify-between items-center">
                                                                <div>قیمت :</div>
                                                                <div>{priceChanger(p.price)} تومان</div>
                                                            </div>
                                                        </Link>
                                                    ))
                                                }
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="emailSend">وضعیت ارسال ایمیل</label>
                                <select id="emailSend" value={emailSend} onChange={(e) => setEmailSend(e.target.value)}  className="p-2 rounded-md w-full outline-none border-2 border-zinc-300 focus:border-orange-400">
                                    <option value={true}>ارسال شود</option>
                                    <option value={false}>ارسال نشود</option>
                                </select>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="userIsActive">وضعیت حساب</label>
                                <select id="userIsActive" value={userIsActive} onChange={(e) => setUserIsActive(e.target.value)}  className="p-2 rounded-md w-full outline-none border-2 border-zinc-300 focus:border-orange-400">
                                    <option value={true}>فعال</option>
                                    <option value={false}>غیرفعال</option>
                                </select>
                            </div>
                            <button type="submit" disabled={updateButtonDisabled} className="w-full flex justify-center gap-1 py-3 mt-8 bg-blue-600 text-white rounded-md transition-all duration-500 hover:bg-blue-700">
                                بروزرسانی
                                {
                                    updateButtonDisabled
                                    &&
                                    <svg aria-hidden="true" className="inline w-6 h-6 mr-2 text-gray-400 animate-spin dark:text-gray-600 fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                    </svg>
                                }
                            </button>
                        </form>
                    </>
                )
            }
        </div>
     );
}
 
export default UserDetails;