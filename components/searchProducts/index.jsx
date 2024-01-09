"use client";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { BiSearchAlt } from "react-icons/bi";

const SearchProducts = () => {
    const inputRef = useRef();
    const router = useRouter();

    const searchHandler = () => {
        if(!inputRef.current.value) return;
        const keywordUrl = inputRef.current.value.replace(/ /g,"_").toLowerCase();
        const url = `/shop?keyword=${keywordUrl}&pn=1&orderBy=date`;
        router.push(url);
        inputRef.current.value = "";
    }

    return (
        <div className="flex justify-start items-center w-72 mx-auto sm:w-full py-2 px-3 rounded-md bg-[#f1f1f1] transition-all duration-500 shadow-[0px_0px_5px_rgba(0,0,0,.15)] hover:shadow-[0px_0px_5px_rgba(0,0,0,.35)]">
            <input className="outline-none w-full h-8 bg-[#f1f1f1]" ref={inputRef} type="text" placeholder="جستوجو بین محصولات..."/>
            <button onClick={searchHandler} className="mr-3">
              <BiSearchAlt className="w-6 h-6 sm:w-8 sm:h-8" />
            </button>
        </div>
    );
};

export default SearchProducts;
