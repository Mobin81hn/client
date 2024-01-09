"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import axios from "axios";
import { useRouter } from "next/navigation";

const ChangeDisplayname = () => {
    const router = useRouter();
    const schema = yup.object().shape({
        displayname: yup.string().required('نام نمایشی وارد نشده است.').min(5,'نام نمایشی باید بیشتر از 5 کارکتر باشد.').max(20,'نام نمایشی باید کمتر از 20 کارکتر باشد.')
    });
    const {register, handleSubmit , formState: { errors }} = useForm({resolver : yupResolver(schema)});

    const displaynameChanger = async (data) => {
        try {
            const cookie = Cookies.get("auth_cookie");
            if(!cookie){
                toast.error("لطفا ابتدا وارد حساب کاربری خود شوید",{position: "top-right",autoClose: 5000,rtl: true,className: 'toast-message'})
                return router.push("/login")
            }
            await axios.put(`https://mernfa-fileshop-server.iran.liara.run/api/user/update-user-displayname`,data,{
                headers: {auth_cookie: cookie}
            })
            
            toast.success("نام نمایشی با موفقیت تغییر کرد.",{position: "top-right",autoClose: 5000,rtl: true,className: 'toast-message'})
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.msg ? error.response.data.msg : "خطا در تغییر نام نمایشی",{position: "top-right",autoClose: 5000,rtl: true,className: 'toast-message'})
        }
    }

    return ( 
        <div className="w-5/6 sm:w-auto flex flex-col items-start gap-4">
            <h2>تغییر نام نمایشی</h2>
            <form className="w-full sm:w-96 flex flex-col gap-4" onSubmit={handleSubmit(displaynameChanger)}>
                <div className="flex flex-col items-start gap-2">
                    <input 
                        className="w-full bg-transparent outline-none px-2 py-3 rounded-md border-2 border-zinc-300 focus:border-blue-500"
                        type="text" 
                        placeholder="نام نمایشی جدید"
                        {...register("displayname")}
                    />
                    {errors.displayname && <p className="text-red-500 text-base sm:text-sm px-1">{errors.displayname.message}</p>}
                </div>
                <button type="submit" className="bg-slate-200 py-2 px-3 rounded-md border-2 transition-all duration-300 hover:border-blue-500">تغییر نام نمایشی</button>
            </form>
        </div>
     );
}
 
export default ChangeDisplayname;