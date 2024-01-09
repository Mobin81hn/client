import BreadCrumb from "@/components/breadCrumb";
import Image from "next/image";
import { BsPatchCheck } from "react-icons/bs";
import Link from "next/link";
import RelatedProductsSlider from "@/components/sliders/relatedProducts-slider";
import FavoriteProduct from "@/components/favoriteProduct";
import AddToCart from "@/components/addToCart";

const getData = async (slug) => {
  const data = await fetch(
    `https://mernfa-fileshop-server.iran.liara.run/api/product/one-product/${slug}`,
    { cache: "no-store" }
  );
  return data.json();
};

const SingleProduct = async ({ params }) => {
  const { data } = await getData(params.slug);

  const spliterForFeatures = (value) => {
    return value.split(":");
  };
  
  return (
    <>
      <div className="container mx-auto flex flex-col items-center px-2 sm:flex-row justify-between sm:items-start gap-2 sm:gap-4 mt-12 md:px-8">
        <main className="w-full sm:w-3/5 xl:w-2/3">
          <div className="flex flex-col gap-8">
            <BreadCrumb
              secondTitle={"فروشگاه"}
              secondLink={"/shop"}
              title={data.title}
            />
            <section className="flex flex-col xl:flex-row gap-6 shadow-[0px_0px_8px_rgba(0,0,0,0.25)] p-2 xs:p-4 rounded-xl">
              <Image
                className="rounded-lg mx-auto"
                alt={data.imageAlt}
                title={data.imageAlt}
                width={500}
                height={250}
                src={data.image}
                priority={true}
              />
              <div className="w-full flex flex-col gap-8 pt-3 px-2">
                <h2 className="text-lg">{data.title}</h2>
                <div className="flex flex-col gap-4 mb-8 text-base sm:text-sm">
                  {data.features.map((d, i) => (
                    <div key={i} className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <BsPatchCheck className="w-5 h-5" />
                        <span>{spliterForFeatures(d)[0]}</span>
                      </div>
                      <div>{spliterForFeatures(d)[1]}</div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
            <section className="xs:hidden my-2">
              <FavoriteProduct id={data._id} />
            </section>
            <section className="flex flex-wrap gap-2 justify-center xl:justify-between items-center my-4">
              <div className="flex items-center w-full sm:w-[250px] 2xl:w-[300px] h-28 px-3 gap-3 bg-slate-200 rounded-xl">
                <Image
                  alt="آیکون"
                  width={70}
                  height={70}
                  src={"/images/icons/trophy.png"}
                />
                <div className="flex flex-col gap-3">
                  <h2 className="text-zinc-600 font-semibold">
                    محصولات اورجینال
                  </h2>
                  <p className="text-base sm:text-sm">برترین های دنیای وب</p>
                </div>
              </div>
              <div className="flex items-center w-full sm:w-[250px] 2xl:w-[300px] h-28 px-3 gap-3 bg-slate-200 rounded-xl">
                <Image
                  alt="آیکون"
                  width={70}
                  height={70}
                  src={"/images/icons/feedback.png"}
                />
                <div className="flex flex-col gap-3">
                  <h2 className="text-zinc-600 font-semibold">
                    بالاترین کیفیت
                  </h2>
                  <p className="text-base sm:text-sm">
                    تاثیر گذارترین مورد در موفقیت
                  </p>
                </div>
              </div>
              <div className="flex items-center w-full sm:w-[250px] 2xl:w-[300px] h-28 px-3 gap-6 bg-slate-200 rounded-xl">
                <Image
                  alt="آیکون"
                  width={70}
                  height={70}
                  src={"/images/icons/target1.png"}
                />
                <div className="flex flex-col gap-3">
                  <h2 className="text-zinc-600 font-semibold">
                    پشتیبانی فوق سریع
                  </h2>
                  <p className="text-base sm:text-sm">کمتر از 30 دقیقه</p>
                </div>
              </div>
            </section>
            <section className="flex flex-col gap-6 p-6 shadow-[0px_0px_4px_rgba(0,0,0,0.25)] rounded-lg">
              <h2 className="text-xl">توضیحات کامل</h2>
              <p className="leading-10">{data.longDesc}</p>
            </section>
            <RelatedProductsSlider
              relProducts={data.relatedProducts}
              title="محصولات مرتبط"
            />
          </div>
        </main>
        <article className="w-full sm:w-80 flex flex-col gap-8 px-2 mb-20 xs:mb-0 sm:px-0 sm:py-14 sticky top-[-25%]">
          <div className="flex flex-col gap-6">
            <AddToCart id={data._id} price={data.price} />
            <div className="hidden xs:block">
              <FavoriteProduct id={data._id} />
            </div>
          </div>
          <div className="p-5 shadow-[0px_0px_8px_rgba(0,0,0,0.25)] rounded-xl">
            <ul className="flex flex-col gap-6">
              <li className="flex justify-between items-center">
                <span>تعداد خرید</span>
                <span>{data.buyNumber}</span>
              </li>
              <li className="flex justify-between items-center">
                <span>تعداد بازدید</span>
                <span>{data.pageView}</span>
              </li>
              <li className="flex justify-between items-center">
                <span>تعداد دیدگاه</span>
                <span>{data.comments.length}</span>
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-3 rounded-lg shadow-[0px_0px_8px_rgba(0,0,0,0.25)] p-4">
            <h3 className="text-lg text-blue-500">معرفی کوتاه</h3>
            <p className="text-justify text-zinc-500 leading-8 text-base sm:text-sm sm:leading-8">
              {data.shortDesc}
            </p>
          </div>
          <div className="flex flex-col gap-5 rounded-lg shadow-[0px_0px_8px_rgba(0,0,0,0.25)] p-4">
            <h3 className="text-lg text-blue-500">دسته بندی ها</h3>
            <div className="flex items-center flex-wrap gap-2">
              {data.categories.map((d, i) => (
                <Link
                  key={i}
                  href={`/shop?orderBy=date&categories=${d.slug}`}
                  className="bg-zinc-100 text-zinc-500 px-3 py-1 rounded-md transition-all duration-300 hover:bg-zinc-200"
                >
                  {d.title}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-5 rounded-lg shadow-[0px_0px_8px_rgba(0,0,0,0.25)] p-4">
            <h3 className="text-lg text-blue-500">برچسب ها</h3>
            <div className="flex items-center flex-wrap gap-2">
              {data.tags.map((t, i) => (
                <Link
                  key={i}
                  href={`/shop?keyword=${t}`}
                  className="bg-zinc-100 text-zinc-500 px-3 py-1 rounded-md transition-all duration-300 hover:bg-zinc-200"
                >
                  # {t}
                </Link>
              ))}
            </div>
          </div>
        </article>
      </div>
    </>
  );
};

export default SingleProduct;
