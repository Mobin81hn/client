"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import Link from "next/link";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { useState } from "react";
import EmailConfirm from "./emailConfirm";

const RegisterForm = () => {
  const [userRegistered , setUserRegistered] = useState(false);
  const [disabledButton , setDisabledButton] = useState(false);

  const schema = yup.object().shape({
    username: yup.string().required('نام کاربری وارد نشده است.').min(5,'نام کاربری باید بیشتر از 5 کارکتر باشد.').max(20,'نام کاربری باید کمتر از 20 کارکتر باشد.'),
    displayname: yup.string().required('نام نمایشی وارد نشده است.').min(5,'نام نمایشی باید بیشتر از 5 کارکتر باشد.').max(20,'نام نمایشی باید کمتر از 20 کارکتر باشد.'),
    email: yup.string().required('ایمیل وارد نشده است.').email('فرمت ایمیل صحیح نیست.'),
    password: yup.string().required("رمز عبور وارد نشده است.").min(8,'رمز عبور باید بیشتر از 8 کارکتر باشد.').max(15,'رمز عبور باید کمتر از 15 کارکتر باشد.'),
    confirm: yup.string().oneOf([yup.ref("password")],"تکرار رمز عبور مطابقت ندارد.").required("تکرار رمز عبور وارد نشده است.")
  });
  const {register, handleSubmit , formState: { errors }} = useForm({resolver : yupResolver(schema)});

  const onSubmitForm = async (data) => {
    setDisabledButton(true); 
    try {
      const result = await axios.post("https://mernfa-fileshop-server.iran.liara.run/api/user/new-user",data)
    
      Cookies.set("auth_cookie",result.data.auth_cookie,{expires:60})
      toast.success(result.data.msg,{position: "top-right",autoClose: 5000,rtl: true,className: 'toast-message'})
      setDisabledButton(false); 

      setTimeout(() => {
        setUserRegistered(true);
      }, 1000);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.msg ? error.response.data.msg : "خطا در ثبت نام",{position: "top-right",autoClose: 5000,rtl: true,className: 'toast-message'})
      setDisabledButton(false); 
    }
  }

  return (
    <section className="container mx-auto flex justify-center">
      {
        !userRegistered ? (
          <form onSubmit={handleSubmit(onSubmitForm)} className="w-full sm:w-96 flex flex-col gap-6 my-16 mx-4 xs:mx-8 px-4 py-6 rounded-lg shadow-[0px_0px_8px_rgba(0,0,0,0.25)]">
            <div className="flex justify-center items-center gap-4">
              <h1 className="text-base sm:text-lg text-center text-blue-400">ثبت نام در سایت</h1>
              <Link href={"/login"} className="bg-blue-500 text-white p-2 rounded-md text-base sm:text-sm">ورود به حساب</Link>
            </div>
            <div className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="نام کاربری"
                autoComplete="off"
                className="p-2 w-full rounded-md outline-none border-zinc-400 border-2 focus:border-orange-400"
                {...register("username")}
              />
              {errors.username && <p className="text-red-500 text-base sm:text-sm">{errors.username.message}</p>}
            </div>
            <div className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="نام نمایشی"
                autoComplete="off"
                className="p-2 w-full rounded-md outline-none border-zinc-400 border-2 focus:border-orange-400"
                {...register("displayname")}
              />
              {errors.displayname && <p className="text-red-500 text-base sm:text-sm">{errors.displayname.message}</p>}
            </div>
            <div className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="ایمیل"
                autoComplete="off"
                className="p-2 w-full rounded-md outline-none border-zinc-400 border-2 focus:border-orange-400"
                {...register("email")}
              />
              {errors.email && <p className="text-red-500 text-base sm:text-sm">{errors.email.message}</p>}
            </div>
            <div className="flex flex-col gap-3">
              <input
                type="password"
                placeholder="رمز عبور"
                autoComplete="off"
                className="p-2 w-full rounded-md outline-none border-zinc-400 border-2 focus:border-orange-400"
                {...register("password")}
              />
              {errors.password && <p className="text-red-500 text-base sm:text-sm">{errors.password.message}</p>}
            </div>
            <div className="flex flex-col gap-3">
              <input
                type="password"
                placeholder="تکرار رمز عبور"
                autoComplete="off"
                className="p-2 w-full rounded-md outline-none border-zinc-400 border-2 focus:border-orange-400"
                {...register("confirm")}
              />
              {errors.confirm && <p className="text-red-500 text-base sm:text-sm">{errors.confirm.message}</p>}
            </div>
            <button type="submit" disabled={disabledButton} className={disabledButton ? 
            "bg-blue-400 w-full p-2 rounded-md text-white" :
            "bg-blue-500 w-full p-2 rounded-md text-white transition-all duration-300 hover:bg-blue-600"
            }>
              ثبت نام
              {
                disabledButton
                &&
                <svg aria-hidden="true" className="inline w-5 h-5 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
              }
            </button>
          </form>
        ) : (
          <EmailConfirm/>
        )
      }
    </section>
  );
};

export default RegisterForm;
