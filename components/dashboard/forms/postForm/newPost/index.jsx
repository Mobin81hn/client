"use client";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Image from "next/image";

const NewPost = () => {
    const [buttonDisabled , setButtonDisabled] = useState(false);
    const [loading , setLoading] = useState(true);

    const titleRef = useRef();
    const slugRef = useRef();
    const imageUrlRef = useRef();
    const imageAltRef = useRef();
    const shortDescRef = useRef();
    const longDescRef = useRef();
    const tagsRef = useRef();
    const publishedRef = useRef();

    // TAG MANAGING
    const [tags, setTags] = useState([]);
    const tagSuber = (e) => {
        if (e.key === "Enter") {
            let tagList = [...tags];
            const data = tagsRef.current.value;
            if (data.length > 0) {
                tagList = [...tags, data.replace(/\s+/g,'_').toLowerCase()];
                setTags(tagList);
            }
            tagsRef.current.value = "";
        }
    };
    const tagDeleter = (indexToRemove) => {
        setTags(tags.filter((_, index) => index !== indexToRemove));
    };

    // RELATED POSTS
    const [posts , setPosts] = useState([]);
    const [relatedPosts , setRelatedPosts] = useState([]);

    useEffect(()=>{
        axios.get("https://mernfa-fileshop-server.iran.liara.run/api/post/posts-rel")
        .then((d) => {setPosts(d.data.data)})
        .catch((e) => console.log("error in loading posts"))
        setLoading(false)
    },[])

    const relatedPostsCtrl = (e) => {
        if(e.target.checked){
            setRelatedPosts([...relatedPosts,e.target.value])
        }else{
            let newRelatedPosts = relatedPosts.filter((id) => id !== e.target.value )
            setRelatedPosts(newRelatedPosts)
        }
    }

    const formKeyNotSuber = (e) => {
        if(e.key == "Enter"){
            e.preventDefault()
        }
    }

    const formSubmit = async (e) => {
        e.preventDefault();
        setButtonDisabled(true);
        const formData = {
            title: titleRef.current.value,
            slug: slugRef.current.value,
            image: imageUrlRef.current.value,
            imageAlt:imageAltRef.current.value, 
            shortDesc: shortDescRef.current.value,
            longDesc: longDescRef.current.value,
            tags,
            relatedPosts,
            published: publishedRef.current.value
        }
        
        try {
            await axios.post(`https://mernfa-fileshop-server.iran.liara.run/api/post/new-post`,formData);
            toast.success("پست با موفقیت ذخیره شد.",{position: "top-right",autoClose: 5000,rtl: true,className: 'toast-message'})
        } catch (error) {
            console.log(error)
            toast.error(error.response?.data?.msg ? error.response.data.msg : 'خطا در ذخیره مقاله',{position: "top-right",autoClose: 5000,rtl: true,className: 'toast-message'})
        }

        setButtonDisabled(false);
    }
    return ( 
        <div className="flex flex-col gap-6">
            <h2 className="text-orange-500 text-xl">پست جدید</h2>
            <form onSubmit={formSubmit} onKeyDown={formKeyNotSuber} className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                    <label htmlFor="title">عنوان مقاله</label>
                    <input id="title" ref={titleRef} type="text" className="p-2 rounded-md w-full outline-none border-2 border-zinc-300 focus:border-orange-400"/>
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="slug">اسلاگ پست</label>
                    <input id="slug" ref={slugRef} type="text" className="p-2 ltr-input rounded-md w-full outline-none border-2 border-zinc-300 focus:border-orange-400"/>
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="imageUrl">آدرس عکس</label>
                    <input id="imageUrl" ref={imageUrlRef} type="text" className="p-2 ltr-input rounded-md w-full outline-none border-2 border-zinc-300 focus:border-orange-400"/>
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="imageAlt">آلت عکس</label>
                    <input id="imageAlt" ref={imageAltRef} type="text" className="p-2 rounded-md w-full outline-none border-2 border-zinc-300 focus:border-orange-400"/>
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="shortDesc">توضیحات کوتاه</label>
                    <input id="shortDesc" ref={shortDescRef} type="text" className="p-2 rounded-md w-full outline-none border-2 border-zinc-300 focus:border-orange-400"/>
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="longDesc">توضیحات کامل</label>
                    <textarea id="longDesc" ref={longDescRef} rows="8" className="p-2 resize-none rounded-md w-full outline-none border-2 border-zinc-300 focus:border-orange-400"></textarea>
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="tags">برچسب ها</label>
                    <div className="flex flex-col gap-2">
                        <input id="tags" onKeyDown={tagSuber} ref={tagsRef} type="text" placeholder="تگ را وارد کنید و انتر بزنید..." className="p-2 rounded-md w-full outline-none border-2 border-zinc-300 focus:border-orange-400"/>
                        <div className="tagResults flex gap-3 justify-start flex-wrap">
                            {tags.map((t, index) => {
                                return (
                                    <div key={index} className="res flex gap-1 text-sm py-1 px-2  rounded-md border border-indigo-900">
                                        <span className="text-zinc-400 text-xs">
                                           {t}
                                        </span>
                                        <i className="text-indigo-500 flex items-center cursor-pointer" onClick={() => tagDeleter(index)}>
                                            <svg
                                               xmlns="http://www.w3.org/2000/svg"
                                               className="h-4 w-4"
                                              fill="none"
                                               viewBox="0 0 24 24"
                                               stroke="currentColor"
                                               strokeWidth={3}
                                            >
                                               <path
                                                  strokeLinecap="round"
                                                  strokeLinejoin="round"
                                                  d="M6 18L18 6M6 6l12 12"
                                               />
                                            </svg>
                                        </i>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
                <div>
                    {
                        loading ? (
                            <div className="flex justify-center py-5">
                                <Image alt="loading gif" src={"/loading.gif"} width={120} height={120} /> 
                            </div>
                        ) : (
                            posts.length == 0 
                            ? <></>
                            : (
                                <div className="flex flex-col gap-4">
                                    <div>پست های مرتبط با این پست را انتخاب کنید</div>
                                    <div className="flex gap-2 flex-wrap">
                                        {posts.map((p , i) => (
                                            <div className="bg-zinc-100 px-2 py-1 rounded-md flex items-center gap-2" key={i}>
                                                <input value={p._id} onChange={relatedPostsCtrl} id={i} type="checkbox" />
                                                <label htmlFor={i}>{p.title}</label>
                                            </div>
                                        ))}
                                    </div>
                                </div> 
                            )
                        )
                    }
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="situation">منتشر شود</label>
                    <select id="situation" ref={publishedRef} className="p-2 rounded-md w-full outline-none border-2 border-zinc-300 focus:border-orange-400">
                        <option value={true}>انتشار</option>
                        <option value={false}>پیش نویس</option>
                    </select>
                </div>
                <button type="submit" disabled={buttonDisabled} className="w-full flex justify-center gap-1 py-3 mt-8 bg-blue-600 text-white rounded-md transition-all duration-500 hover:bg-blue-700">
                    ذخیره 
                    {
                        buttonDisabled
                        &&
                        <svg aria-hidden="true" className="inline w-6 h-6 mr-2 text-gray-400 animate-spin dark:text-gray-600 fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                        </svg>
                    }
                </button>
            </form>
        </div>
     );
}
 
export default NewPost;