import Image from "next/image";
import Link from "next/link";

const CatBox = ({title,slug,image,imageAlt,shortDesc}) => {
  return (
    <Link className="w-full px-2 xs:w-auto xs:px-0" href={`/shop?orderBy=date&categories=${slug}`}>
      <div className="flex justify-between items-center w-full xs:w-96 md:w-80 px-3 py-4 rounded-lg bg-slate-200 transition-all duration-300 hover:bg-zinc-300">
        <div className="flex flex-col gap-2">
          <h3 className="text-black">{title}</h3>
          <p className="text-base sm:text-sm">{shortDesc}</p>
        </div>
        <div>
          <Image
            alt={imageAlt}
            width={50}
            height={50}
            src={image}
          />
        </div>
      </div>
    </Link>
  );
};

export default CatBox;
