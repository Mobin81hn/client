"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import axios from "axios";
import SlideBox from "../sliders/graphic-slider-box";
import Pagination from "../shopPagination";
import { MdClose } from "react-icons/md";
import { BiFilterAlt } from "react-icons/bi";

const ShopComp = ({ url }) => {
  const [result, setResult] = useState([]);
  const [pagesCount, setPagesCount] = useState(0);
  const [productsCount, setProductsCount] = useState(0);
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const minPriceRef = useRef();
  const maxPriceRef = useRef();

  const orderByHandler = (orderBy) => {
    router.push(
      `/shop?${
        url.keyword ? `keyword=${url.keyword}` : ""
      }&pn=1&orderBy=${orderBy}${url.type ? `&type=${url.type}` : ""}${
        url.minP ? `&minP=${url.minP}` : ""
      }${url.maxP ? `&maxP=${url.maxP}` : ""}${
        url.categories ? `&categories=${url.categories}` : ""
      }`
    );
  };
  const typeOfProductHandler = (type) => {
    if (type == "all") {
      return router.push(
        `/shop?${url.keyword ? `keyword=${url.keyword}` : ""}&pn=1${
          url.orderBy ? `&orderBy=${url.orderBy}` : ""
        }${url.minP ? `&minP=${url.minP}` : ""}${
          url.maxP ? `&maxP=${url.maxP}` : ""
        }${url.categories ? `&categories=${url.categories}` : ""}`
      );
    }

    router.push(
      `/shop?${url.keyword ? `keyword=${url.keyword}` : ""}&pn=1${
        url.orderBy ? `&orderBy=${url.orderBy}` : ""
      }&type=${type}${url.minP ? `&minP=${url.minP}` : ""}${
        url.maxP ? `&maxP=${url.maxP}` : ""
      }${url.categories ? `&categories=${url.categories}` : ""}`
    );
  };
  const priceHandler = (e) => {
    setMenuIsOpen(false)
    e.preventDefault();
    let priceUrl = "";
    if (minPriceRef.current.value) {
      priceUrl = `&minP=${minPriceRef.current.value}`;
    }
    if (maxPriceRef.current.value) {
      priceUrl = `${
        minPriceRef.current.value && `&minP=${minPriceRef.current.value}`
      }&maxP=${maxPriceRef.current.value}`;
    }

    router.push(
      `/shop?${url.keyword ? `keyword=${url.keyword}` : ""}&pn=1${
        url.orderBy ? `&orderBy=${url.orderBy}` : ""
      }${url.type ? `&type=${url.type}` : ""}${priceUrl}${
        url.categories ? `&categories=${url.categories}` : ""
      }`
    );
  };

  const [choosedCats, setChoosedCats] = useState([]);

  const categorySubmit = () => {
    setMenuIsOpen(false)
    const catUrl = choosedCats.join();
    router.push(
      `/shop?${url.keyword ? `keyword=${url.keyword}` : ""}&pn=1${
        url.orderBy ? `&orderBy=${url.orderBy}` : ""
      }${url.type ? `&type=${url.type}` : ""}${
        url.minP ? `&minP=${url.minP}` : ""
      }${url.maxP ? `&maxP=${url.maxP}` : ""}${
        choosedCats.length !== 0 ? `&categories=${catUrl}` : ""
      }`
    );
  };
  const categoryHandler = (slug) => {
    if (choosedCats.includes(slug)) {
      const cats = choosedCats.filter((cat) => cat !== slug);
      setChoosedCats(cats);
    } else {
      setChoosedCats([...choosedCats, slug]);
    }
  };

  const goTopCtrl = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    setLoading(true);
    goTopCtrl();
    const mainUrl = `https://mernfa-fileshop-server.iran.liara.run/api/product/search-products?${
      url.keyword ? `keyword=${url.keyword}` : ""
    }${url.pn ? `&pn=${url.pn}` : "&pn=1"}${
      url.orderBy ? `&orderBy=${url.orderBy}` : ""
    }${url.type ? `&type=${url.type}` : ""}${
      url.minP ? `&minP=${url.minP}` : ""
    }${url.maxP ? `&maxP=${url.maxP}` : ""}${
      url.categories ? `&categories=${url.categories}` : ""
    }`;
    console.log(mainUrl);
    axios
      .get(mainUrl)
      .then((d) => {
        setResult(d.data.data);
        setPagesCount(Math.ceil(d.data.productsCount / 10));
        setProductsCount(d.data.productsCount);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
      });

    if (url.categories) {
      setChoosedCats(url.categories.split(","));
    }
  }, [url]);

  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);

  useEffect(() => {
    axios
      .get(
        "https://mernfa-fileshop-server.iran.liara.run/api/product/products-categories-rel"
      )
      .then((d) => {
        setCategories(d.data.data);
        setCategoriesLoading(false);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <section>
      <div className="container mx-auto flex items-start gap-6 xl:gap-4 mt-12">
        <aside
          className={
            menuIsOpen
              ? "shop-sidebar fixed overflow-y-scroll sm:overflow-y-visible top-0 right-0 w-full h-[120vh] sm:h-auto xs:px-4 sm:px-0 sm:mt-20 pb-4 bg-zinc-100 sm:pb-0 sm:bg-transparent sm:mx-2 sm:w-60 lg:w-80 sm:flex flex-col gap-4 z-10 transition-all duration-500 sm:sticky sm:top-[-95%]"
              : "shop-sidebar fixed overflow-y-scroll sm:overflow-y-visible top-0 right-[-105%] w-full h-[120vh] sm:h-auto xs:px-4 sm:px-0 sm:mt-20 pb-4 bg-zinc-100 sm:pb-0 sm:bg-transparent sm:mx-2 sm:w-60 lg:w-80 sm:flex flex-col gap-4 z-10 transition-all duration-500 sm:sticky sm:top-[-95%]"
          }
        >
          <div className="flex flex-col gap-4 bg-zinc-100 rounded-lg px-3 py-4">
            <div className="flex items-center justify-between mb-1">
              مرتب سازی بر اساس
              <MdClose
                onClick={() => setMenuIsOpen(false)}
                className="w-10 h-10 mx-1 bg-slate-200 p-1 sm:hidden rounded-sm cursor-pointer"
              />
            </div>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => {orderByHandler("price");setMenuIsOpen(false)}}
                className={
                  url.orderBy == "price"
                    ? "text-base sm:text-sm bg-blue-600 text-white p-2 rounded"
                    : "text-base sm:text-sm bg-white border-2 border-zinc-200 transition-all duration-300 hover:border-blue-400 p-2 rounded"
                }
              >
                قیمت
              </button>
              <button
                onClick={() => {orderByHandler("date");setMenuIsOpen(false)}}
                className={
                  url.orderBy == "date" || !url.orderBy
                    ? "text-base sm:text-sm bg-blue-600 text-white p-2 rounded"
                    : "text-base sm:text-sm bg-white border-2 border-zinc-200 transition-all duration-300 hover:border-blue-400 p-2 rounded"
                }
              >
                جدیدترین
              </button>
              <button
                onClick={() => {orderByHandler("pageView");setMenuIsOpen(false)}}
                className={
                  url.orderBy == "pageView"
                    ? "text-base sm:text-sm bg-blue-600 text-white p-2 rounded"
                    : "text-base sm:text-sm bg-white border-2 border-zinc-200 transition-all duration-300 hover:border-blue-400 p-2 rounded"
                }
              >
                پربازدید ترین
              </button>
              <button
                onClick={() => {orderByHandler("buyNumber");setMenuIsOpen(false)}}
                className={
                  url.orderBy == "buyNumber"
                    ? "text-base sm:text-sm bg-blue-600 text-white p-2 rounded"
                    : "text-base sm:text-sm bg-white border-2 border-zinc-200 transition-all duration-300 hover:border-blue-400 p-2 rounded"
                }
              >
                پرفروش ترین
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-4 bg-zinc-100 rounded-lg px-3 py-4">
            <div>نوع محصول</div>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => {typeOfProductHandler("all");setMenuIsOpen(false)}}
                className={
                  !url.type
                    ? "text-base sm:text-sm bg-blue-600 text-white p-2 rounded"
                    : "text-base sm:text-sm bg-white border-2 border-zinc-200 transition-all duration-300 hover:border-blue-400 p-2 rounded"
                }
              >
                همه
              </button>
              <button
                onClick={() => {typeOfProductHandler("app");setMenuIsOpen(false)}}
                className={
                  url.type == "app"
                    ? "text-base sm:text-sm bg-blue-600 text-white p-2 rounded"
                    : "text-base sm:text-sm bg-white border-2 border-zinc-200 transition-all duration-300 hover:border-blue-400 p-2 rounded"
                }
              >
                اپلیکیشن
              </button>
              <button
                onClick={() => {typeOfProductHandler("book");setMenuIsOpen(false)}}
                className={
                  url.type == "book"
                    ? "text-base sm:text-sm bg-blue-600 text-white p-2 rounded"
                    : "text-base sm:text-sm bg-white border-2 border-zinc-200 transition-all duration-300 hover:border-blue-400 p-2 rounded"
                }
              >
                کتاب
              </button>
              <button
                onClick={() => {typeOfProductHandler("gr");setMenuIsOpen(false)}}
                className={
                  url.type == "gr"
                    ? "text-base sm:text-sm bg-blue-600 text-white p-2 rounded"
                    : "text-base sm:text-sm bg-white border-2 border-zinc-200 transition-all duration-300 hover:border-blue-400 p-2 rounded"
                }
              >
                فایل گرافیکی
              </button>
            </div>
          </div>
          {categoriesLoading ? (
            <div className="flex justify-center py-5">
              <Image
                alt="loading gif"
                src={"/loading.gif"}
                width={120}
                height={120}
              />
            </div>
          ) : categories.length == 0 ? (
            <></>
          ) : (
            <div className="flex flex-col gap-4 bg-zinc-100 rounded-lg px-3 py-4">
              <div>دسته بندی</div>
              <div className="flex flex-col gap-3">
                {categories.map((c, i) => (
                  <button
                    key={i}
                    onClick={() => categoryHandler(c.slug)}
                    className={
                      choosedCats.includes(c.slug)
                        ? "text-base sm:text-sm bg-blue-600 border-2 border-blue-600 text-white p-2 rounded"
                        : "text-base sm:text-sm bg-white border-2 border-zinc-200 transition-all duration-300 hover:border-blue-400 p-2 rounded"
                    }
                  >
                    {c.title}
                  </button>
                ))}
                <button
                  onClick={categorySubmit}
                  className="w-full bg-orange-400 p-2 my-2 rounded-md text-white text-base sm:text-sm transition-all duration-300 hover:bg-orange-500"
                >
                  اعمال فیلتر دسته بندی
                </button>
              </div>
            </div>
          )}
          <div className="flex flex-col gap-4 bg-zinc-100 rounded-lg px-3 py-4">
            <div>بازه قیمت (تومان)</div>
            <form onSubmit={priceHandler} className="flex flex-col gap-4">
              <div className="flex flex-col gap-3">
                <input
                  ref={minPriceRef}
                  className="fa-num text-base sm:text-sm outline-none border-2 border-zinc-200 rounded p-2 focus:border-blue-400"
                  min="0"
                  type="number"
                  placeholder="حداقل قیمت"
                />
                <input
                  ref={maxPriceRef}
                  className="fa-num text-base sm:text-sm outline-none border-2 border-zinc-200 rounded p-2 focus:border-blue-400"
                  min="0"
                  type="number"
                  placeholder="حداکثر قیمت"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-orange-400 p-2 rounded-md text-white text-base sm:text-sm transition-all duration-300 hover:bg-orange-500"
              >
                اعمال فیلتر قیمت
              </button>
            </form>
          </div>
        </aside>
        <main className="w-full p-2 flex flex-col items-center gap-4">
          <h1 className="text-center text-xl text-indigo-500">
            محصولات فروشگاه فایل مرن فا
          </h1>
          {
            loading ? (
              <div className="flex justify-center py-5 mt-20">
                <Image
                  alt="loading gif"
                  src={"/loading.gif"}
                  width={140}
                  height={140}
                />
              </div>
            ) : result.length == 0 ? (
              <div className="text-center my-8 text-lg text-zinc-500">
                محصولی با این شرایط موجود نیست...
              </div>
            ) : (
              <div className="md:w-[290px] lg:w-[605px] xl:w-[900px] min-[1400px]:w-full flex flex-col gap-14 my-6">
                <div className="flex items-center justify-between mx-4 text-lg">
                  <div>تعداد محصول : {productsCount}</div>
                  <div onClick={() => setMenuIsOpen(true)} className="flex sm:hidden items-center flex-row-reverse gap-1 bg-slate-300 text-white cursor-pointer py-1 px-3 rounded-md">
                    فیلترها
                    <BiFilterAlt />
                  </div>
                </div>
                <div className="flex items-center justify-center md:justify-start gap-4 flex-wrap">
                  {result.map((da, i) => (
                    <SlideBox key={i} {...da} />
                  ))}
                </div>
                <div className="flex flex-col items-center gap-6">
                  <div className="flex gap-4">
                    <Pagination
                      keyword={url.keyword}
                      pn={Number(url.pn ? url.pn : "1")}
                      orderBy={url.orderBy}
                      type={url.type}
                      minP={url.minP}
                      maxP={url.maxP}
                      categories={url.categories}
                      pagesCount={pagesCount}
                    />
                  </div>
                  {pagesCount > 1 ? (
                    <div>
                      صفحه
                      <span className="fa-num"> {url.pn ? url.pn : "1"}</span> از
                      <span className="fa-num">{pagesCount}</span>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
          )}
          </main>
      </div>
    </section>
  );
};

export default ShopComp;
