"use client";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

// USING CONTEXT
import { useAppContext } from "@/context/appContext";

const AddToCart = ({id,price}) => {
    function priceChanger(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const {cartNumber , setCartNumber} = useAppContext();

    const addToCart = async () => {
        const cookie = Cookies.get("auth_cookie");
        
        try {
          await axios.post("https://mernfa-fileshop-server.iran.liara.run/api/user/add-cart-product",{newCartProduct: id},{
            headers: {auth_cookie: cookie}
          })
          toast.success("به سبد خرید اضافه شد",{position: "top-right",autoClose: 5000,rtl: true,className: 'toast-message'})
          setCartNumber(cartNumber+1)
        } catch (error) {
          console.log(error);
          toast.error(error.response?.data?.msg ? error.response.data.msg :"خطا در اضافه کردن محصول به سبد خرید",{position: "top-right",autoClose: 5000,rtl: true,className: 'toast-message'})
        }
    }

    return ( 
      <button onClick={addToCart} className="w-full fixed bottom-0 right-0 xs:static py-4 rounded-md xs:rounded-lg bg-orange-500 text-white transition-all duration-300 hover:bg-orange-600">
        <span className="fa-num">{priceChanger(price)}</span> تومان - افزودن به سبد
      </button>
     );
}
 
export default AddToCart;