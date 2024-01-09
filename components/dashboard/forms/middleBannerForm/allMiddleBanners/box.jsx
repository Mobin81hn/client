import Image from "next/image";

const Box = ({_id,image,imageAlt,situation,date,setMidBanDetCtrl}) => {
    return ( 
        <div onClick={() => setMidBanDetCtrl(_id)} className="flex justify-between h-64 p-6 cursor-pointer bg-zinc-100 border-2 border-zinc-200 rounded-md transition-all duration-300 hover:border-orange-400">
            <Image className="rounded-lg h-44" priority={true} alt={imageAlt} src={image} width={400} height={200} />
            <div className="self-end flex gap-3">
                <span className={situation ? 'bg-green-700 text-white text-base sm:text-sm px-3 py-1 rounded-md' : 'bg-red-600 text-white text-base sm:text-sm px-3 py-1 rounded-md'}>
                    {situation ? 'روشن' : 'خاموش'}
                </span>
                <span className="bg-orange-500 text-white text-base sm:text-sm px-3 py-1 rounded-md">{date}</span>
            </div>
        </div>
     );
}
 
export default Box;