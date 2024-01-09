"use client";
import { useEffect, useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import AllPosts from "./allPosts";
import NewPost from "./newPost";
import PostDetails from "./postDetails";

const PostMain = () => {
    const [postDetCtrl , setPostDetCtrl] = useState("")
    const [currentButton , setCurrentButton] = useState("allPosts")
    const [detail,setDetail] = useState(<AllPosts setPostDetCtrl={setPostDetCtrl}/>);

    useEffect(()=>{
        if(postDetCtrl != ""){
            setDetail(<PostDetails id={postDetCtrl} setPostDetCtrl={setPostDetCtrl}/>)
        }else{
            setDetail(<AllPosts setPostDetCtrl={setPostDetCtrl}/>)
        }
    },[postDetCtrl])

    return ( 
        <div className="flex flex-col gap-4">
            <section className="flex justify-between">
                <h1 className="text-blue-500 text-xl">پست ها</h1>
                <div className="flex items-center gap-2">
                    {
                        postDetCtrl ? (
                            <>
                                <span>بازگشت</span>
                                <button onClick={() => {
                                   setPostDetCtrl("")
                                }} className="flex justify-center items-center bg-orange-500 text-white w-8 h-8 rounded-md transition-colors duration-300 hover:bg-blue-600"><BsArrowLeft className="w-5 h-5"/></button> 
                            </>
                        ) : (
                            <>
                                <button onClick={() => {
                                    setDetail(<AllPosts setPostDetCtrl={setPostDetCtrl}/>)
                                    setCurrentButton("allPosts")
                                }} className={
                                    currentButton == "allPosts" ?
                                    "px-3 py-1 rounded-md bg-blue-500 text-white transition-colors duration-500" :
                                    "px-3 py-1 rounded-md bg-orange-500 text-white transition-colors duration-500 hover:bg-orange-600"
                                }>
                                    همه
                                </button>
                                <button onClick={() => {
                                    setDetail(<NewPost/>)
                                    setCurrentButton("newPost")
                                }} className={
                                    currentButton == "newPost" ?
                                    "px-3 py-1 rounded-md bg-blue-500 text-white transition-colors duration-500" :
                                    "px-3 py-1 rounded-md bg-orange-500 text-white transition-colors duration-500 hover:bg-orange-600"
                                }>
                                    پست جدید
                                </button>
                            </>
                        )
                    }
                </div>
            </section>
            <section>
                {detail}
            </section>
        </div>
     );
}
 
export default PostMain;