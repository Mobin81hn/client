import BreadCrumb from "@/components/breadCrumb";
import Image from "next/image";
import Link from "next/link";
import { GrFormView } from "react-icons/gr";
import { FaRegComment } from "react-icons/fa";
import { SlCalender } from "react-icons/sl";
import RelatedPostsSlider from "@/components/sliders/relatedPosts-slider";
import MostViewedPosts from "@/components/mostViewedPosts";
import SearchPosts from "@/components/searchPosts";

const getData = async (slug) => {
  const data = await fetch(
    `https://mernfa-fileshop-server.iran.liara.run/api/post/one-post/${slug}`,
    { cache: "no-store" }
  );
  return data.json();
};

const getMostViewedProductsData = async () => {
  const data = await fetch(
    `https://mernfa-fileshop-server.iran.liara.run/api/product/get-most-bought-products`,
    { cache: "no-store" }
  );
  return data.json();
};

const SingleBlog = async ({ params }) => {
  const { data } = await getData(params.slug);
  const mostSoldProducts = await getMostViewedProductsData();

  return (
    <>
      {data ? (
      <div className="container mx-auto flex justify-between items-start flex-col md:flex-row gap-6 lg:gap-4 mt-12 px-2 sm:px-8">
        <main className="md:w-full lg:w-1/2 xl:w-2/3">
            <div className="flex flex-col gap-8">
              <BreadCrumb
                secondTitle={"وبلاگ"}
                secondLink={"/blog"}
                title={data.title}
              />
              <section>
                <Image
                  className="rounded-lg"
                  alt={data.imageAlt}
                  width={800}
                  height={400}
                  src={data.image}
                  priority={true}
                />
              </section>
              <section className="flex flex-col gap-4">
                <h1 className="text-blue-500 text-lg">{data.title}</h1>
                <div className="flex items-center gap-2 md:gap-3 flex-wrap text-base sm:text-sm">
                  <div className="flex justify-center items-center gap-1 pl-3 pr-1 h-12 bg-zinc-100 rounded-md">
                    <GrFormView className="w-6 h-6" />
                    <span>تعداد بازدید :</span>
                    <span>{data.pageView}</span>
                  </div>
                  <div className="flex justify-center items-center gap-2 px-3 h-12 bg-zinc-100 rounded-md">
                    <FaRegComment className="w-4 h-4" />
                    <span>تعداد دیدگاه :</span>
                    <span>{data.comments.length}</span>
                  </div>
                  <div className="flex justify-center items-center gap-0 px-3 h-12 bg-zinc-100 rounded-md">
                    <SlCalender className="hidden xs:inline w-4 h-4" />
                    <span>آخرین به روزرسانی :</span>
                    <span>{data.updatedAt}</span>
                  </div>
                </div>
              </section>
              <section className="flex flex-col gap-6 my-6">
                <h2 className="text-xl">توضیحات کامل</h2>
                <p className="leading-9">{data.longDesc}</p>
              </section>
              <RelatedPostsSlider
                relPosts={data.relatedPosts}
                title="مقالات مرتبط"
              />
            </div>
        </main>
        <aside className="w-full md:w-72 min-w-[288px] lg:w-80 flex flex-col gap-12 mb-20 xs:mb-0">
            <SearchPosts/>
            <div className="flex flex-col gap-3 rounded-lg shadow-[0px_0px_8px_rgba(0,0,0,0.35)] py-3 px-4">
              <h3 className="text-lg">توضیحات خلاصه</h3>
              <p className="text-justify text-zinc-500 leading-8 text-base sm:text-sm sm:leading-7">
                {data.shortDesc}
              </p>
            </div>
            <div className="flex flex-col gap-5 rounded-lg shadow-[0px_0px_8px_rgba(0,0,0,0.25)] p-4">
              <h3 className="text-lg text-blue-500">برچسب ها</h3>
              <div className="flex items-center flex-wrap gap-2">
                {data.tags.map((ta, i) => (
                  <Link
                    key={i}
                    href={`/blog?keyword=${ta}`}
                    className="bg-zinc-100 text-zinc-500 px-3 py-1 rounded-md transition-all duration-300 hover:bg-zinc-200"
                  >
                    # {ta}
                  </Link>
                ))}
              </div>
            </div>
            <MostViewedPosts />
            <div className="flex flex-col gap-6 rounded-lg shadow-[0px_0px_8px_rgba(0,0,0,0.35)] p-4">
              <h3 className="text-lg text-blue-500 ">پرفروش ترین محصولات</h3>
              <ul className="flex flex-col gap-5">
                {
                  mostSoldProducts.data.map((d,i) => (
                    <li key={i}>
                      <Link
                        className="border-r-2 border-zinc-600 pr-2 leading-7 text-base sm:text-sm sm:leading-6"
                        href={`/shop/${d.slug}`}
                      >
                        {d.title}
                      </Link>
                    </li>
                  ))
                }
              </ul>
            </div>
        </aside>
      </div> 
      ) : (
        <div className="text-center my-40">مقاله هنوز منتشر نشده است...</div>
      )}
    </>
  );
};

export default SingleBlog;
