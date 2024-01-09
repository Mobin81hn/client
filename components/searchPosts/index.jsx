"use client";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { BiSearchAlt } from "react-icons/bi";

const SearchPosts = () => {
    const inputRef = useRef();
    const router = useRouter();

    const searchHandler = (e) => {
        e.preventDefault();
        if(!inputRef.current.value) return;
        const keywordUrl = inputRef.current.value.replace(/ /g,"_").toLowerCase();
        const url = `/blog?keyword=${keywordUrl}&pn=1`;
        router.push(url);
    }

    return (
        <form onSubmit={searchHandler} className="flex justify-between items-center gap-2 p-4 rounded-md bg-zinc-100  border-2 border-zinc-200">
            <input
                className="w-full outline-none bg-zinc-100 text-zinc-500"
                type="text"
                ref={inputRef}
                placeholder="جستوجو در وبلاگ..."
            />
            <button type="submit" className="mr-3">
                <BiSearchAlt className="w-6 h-6" />
            </button>
        </form>
    );
};

export default SearchPosts;
