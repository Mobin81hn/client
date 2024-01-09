import RegisterForm from "@/components/auth/registerForm";
import {cookies} from "next/headers";
import { redirect } from "next/navigation";

const getAuthData = async (cookieValue) => {
    if(!cookieValue) return;

    const data = await fetch("https://mernfa-fileshop-server.iran.liara.run/api/user/get-user-data",{cache: "no-store",headers: {auth_cookie: cookieValue}})
    if(data.status == 200){
        return data.json(); 
    };
    return;
}

const Register = async () => {
    const cookieStore = cookies();
    const authCookie = cookieStore.get("auth_cookie");
    const cookieValue = authCookie?.value;
    const data = await getAuthData(cookieValue);
    if(data) return redirect("/account/info");

    return ( 
        <RegisterForm/>
     );
}
 
export default Register;