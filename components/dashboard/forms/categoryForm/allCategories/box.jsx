import Image from "next/image";

const Box = ({_id,title,image,imageAlt,typeOfProduct,situation,setCategoryDetCtrl}) => {
    return ( 
        <div onClick={() => setCategoryDetCtrl(_id)} className="flex justify-between gap-6 h-64 p-6 cursor-pointer bg-zinc-100 border-2 border-zinc-200 rounded-md transition-all duration-300 hover:border-orange-400">
            <Image className="rounded-lg w-48 h-48" priority={true} alt={imageAlt} src={image} width={80} height={80} />
            <div className="w-full flex justify-between">
                <div className="mt-1">
                    <h1 className="text-lg">{title}</h1>
                </div>
                <div className="flex gap-2 self-end px-2 text-white">
                    <span className='bg-blue-600  text-base sm:text-sm px-3 py-2 rounded-md'>
                        {
                            typeOfProduct == "book" ? "کتاب" : (
                                typeOfProduct == "app" ? "اپلیکیشن" : "فایل های گرافیکی"
                            )
                        }
                    </span>
                    <span className={situation ? 'bg-green-700 text-base sm:text-sm px-3 py-2 rounded-md' : 'bg-yellow-500 text-white text-base sm:text-sm px-3 py-2 rounded-md'}>
                        {situation ? 'منتشر شده' : 'پیش نویس شده'}
                    </span>
                </div>
            </div>
        </div>
     );
}
 
export default Box;