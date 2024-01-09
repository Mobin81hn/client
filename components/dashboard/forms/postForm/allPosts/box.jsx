import Image from "next/image";

const Box = ({_id,title,image,imageAlt,published,pageView,updatedAt,setPostDetCtrl}) => {
    return ( 
        <div onClick={() => setPostDetCtrl(_id)} className="flex justify-between gap-6 h-64 p-6 cursor-pointer bg-zinc-100 border-2 border-zinc-200 rounded-md transition-all duration-300 hover:border-orange-400">
            <Image className="rounded-lg w-1/3 h-44" priority={true} alt={imageAlt} src={image} width={400} height={200} />
            <div className="w-2/3 flex justify-between">
                <div className="mt-1">
                    <h1 className="text-lg">{title}</h1>
                </div>
                <div className="flex flex-col justify-between items-end">
                    <div>
                        <span className="bg-blue-500 text-white text-base sm:text-sm px-3 py-1 rounded-md">{updatedAt}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="min-w-[100px] flex items-center justify-center gap-1 bg-orange-500 text-white text-base sm:text-sm px-3 py-2 rounded-md"><span className="fa-num ">{pageView}</span> بازدید</div>
                        <span className={published ? 'bg-green-700 text-white text-base sm:text-sm px-3 py-2 rounded-md' : 'bg-yellow-500 text-white text-base sm:text-sm px-3 py-2 rounded-md'}>
                            {published ? 'منتشر شده' : 'پیش نویس شده'}
                        </span>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default Box;