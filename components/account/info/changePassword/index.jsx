"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import axios from "axios";
import { useRouter } from "next/navigation";

const ChangePassword = () => {
    const router = useRouter();
    const schema = yup.object().shape({
        password: yup.string().required("رمز عبور وارد نشده است.").min(8,'رمز عبور باید بیشتر از 8 کارکتر باشد.').max(15,'رمز عبور باید کمتر از 15 کارکتر باشد.'),
        confirm: yup.string().oneOf([yup.ref("password")],"تکرار رمز عبور مطابقت ندارد.").required("تکرار رمز عبور وارد نشده است.")
    });
    const {register, handleSubmit , formState: { errors }} = useForm({resolver : yupResolver(schema)});

    const passwordChanger = async (data) => {
        try {
            const cookie = Cookies.get("auth_cookie");
            if(!cookie){
                toast.error("لطفا ابتدا وارد حساب کاربری خود شوید",{position: "top-right",autoClose: 5000,rtl: true,className: 'toast-message'})
                return router.push("/login")
            }
            await axios.put(`https://mernfa-fileshop-server.iran.liara.run/api/user/update-user-password`,data,{
                headers: {auth_cookie: cookie}
            })
            
            toast.success("رمز عبور با موفقیت تغییر کرد.",{position: "top-right",autoClose: 5000,rtl: true,className: 'toast-message'})
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.msg ? error.response.data.msg : "خطا در تغییر رمز عبور",{position: "top-right",autoClose: 5000,rtl: true,className: 'toast-message'})
        }
    }

    return ( 
        <div className="w-5/6 sm:w-auto flex flex-col items-start gap-4">
            <h2>تغییر رمز عبور</h2>
            <form className="w-full sm:w-96 flex flex-col gap-4" onSubmit={handleSubmit(passwordChanger)}>
                <div className="flex flex-col items-start gap-2">
                    <input 
                        className="w-full bg-transparent outline-none px-2 py-3 rounded-md border-2 border-zinc-300 focus:border-blue-500" 
                        type="password" 
                        placeholder="رمز عبور جدید"
                        {...register("password")}
                    />
                    {errors.password && <p className="text-red-500 text-base sm:text-sm px-1">{errors.password.message}</p>}
                </div>
                <div className="flex flex-col items-start gap-2">
                    <input 
                        className="w-full bg-transparent outline-none px-2 py-3 rounded-md border-2 border-zinc-300 focus:border-blue-500" 
                        type="password" 
                        placeholder="تکرار رمز عبور جدید"
                        {...register("confirm")}
                    />
                    {errors.confirm && <p className="text-red-500 text-base sm:text-sm px-1">{errors.confirm.message}</p>}
                </div>
                <button type="submit" className="bg-slate-200 py-2 px-3 rounded-md border-2 transition-all duration-300 hover:border-blue-500">تغییر رمز عبور</button>
            </form>
        </div>
     );
}
 
export default ChangePassword;