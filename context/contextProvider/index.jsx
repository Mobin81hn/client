"use client";
import { AppContext } from "../appContext";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const ContextProvider = ({children}) => {
    const [cartNumber , setCartNumber] = useState(0);
    const [cartNumberLoading , setCartNumberLoading] = useState(true);

    useEffect(() => {
        const cookie = Cookies.get("auth_cookie");
        axios.get("https://mernfa-fileshop-server.iran.liara.run/api/user/cart-number",{
            headers: {auth_cookie: cookie}
        }).then((d) => {
            setCartNumber(d.data.cartNumber);
        }).catch((e) => {
            console.log(e);
            setCartNumber(0)
        })
        setCartNumberLoading(false);
    },[])

    return ( 
        <AppContext.Provider value={{cartNumber,setCartNumber,cartNumberLoading}}>
            {children}
        </AppContext.Provider>
     );
}
 
export default ContextProvider;