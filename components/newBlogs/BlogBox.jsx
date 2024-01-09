import Image from "next/image";
import Link from "next/link";

const BlogBox = ({title,slug,image,imageAlt,shortDesc,pageView,updatedAt}) => {
    return ( 
        <article className="relative w-full sm:w-1/2 lg:w-auto mb-4">
            <Link className="px-2 xs:px-10 sm:px-6 lg:px-2 w-full inline-block" target="_blank" href={`/blog/${slug}`}>
                <div className="w-full   px-2 pt-2 pb-3 bg-white rounded-xl shadow-[0px_1px_8px_rgba(0,0,0,0.25)] transition-all duration-300 hover:-translate-y-1">
                    <div>
                        <Image
                            width={440}
                            height={160}
                            src={image}
                            alt={imageAlt}
                            title={imageAlt}
                            className="rounded-lg mx-auto"
                        />
                    </div>
                    <div className="px-2">
                        <h3 className="h-12 mt-6 mb-8 font-semibold line-clamp-2">
                            {title}
                        </h3>
                        <p className="text-base sm:text-sm text-justify h-[60px] mb-6 line-clamp-3">
                            {shortDesc}
                        </p>
                        <div className="w-[90%] h-[1px] mx-auto bg-zinc-300"></div>
                        <div className="flex justify-between flex-wrap items-center gap-2 mt-4">
                            <div className="text-base sm:text-sm bg-zinc-200 rounded-md py-1 px-3">{updatedAt}</div>
                            <div className="text-base sm:text-sm bg-zinc-200 rounded-md py-1 px-3"><span className="fa-num">{pageView}</span> بازدید</div>
                        </div>
                    </div>
                </div>
            </Link>
        </article>
     );
}
 
export default BlogBox;