"use client";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const FavoriteProduct = ({id}) => {

    const addFav = async () => {
        const cookie = Cookies.get("auth_cookie");
        
        try {
          await axios.post("https://mernfa-fileshop-server.iran.liara.run/api/user/add-favorite-product",{newFavProducts: id},{
            headers: {auth_cookie: cookie}
          })
          toast.success("به محصولات مورد علاقه اضافه شد",{position: "top-right",autoClose: 5000,rtl: true,className: 'toast-message'})
        } catch (error) {
          console.log(error);
          toast.error(error.response?.data?.msg ? error.response.data.msg :"خطا در اضافه کردن محصول به علاقه مندی ها",{position: "top-right",autoClose: 5000,rtl: true,className: 'toast-message'})
        }
    }

    return ( 
        <button onClick={addFav} className="w-full py-4 rounded-lg bg-blue-500 text-white transition-all duration-300 hover:bg-blue-600">
            افزودن به علاقه مندی ها
        </button>
     );
}
 
export default FavoriteProduct;