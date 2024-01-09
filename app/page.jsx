import MainSlider from "@/components/sliders/mainSlider";
import MiddleBanner from "@/components/middle-banner";
import ProductsSlider from "@/components/sliders/products-slider";
import GraphicSlider from "@/components/sliders/graphic-slider";
import NewBlogs from "@/components/newBlogs";
import Categories from "@/components/categories";

const getData = async () => {
  const data = await fetch("https://mernfa-fileshop-server.iran.liara.run/api/product/new-products",{cache: "no-store"});
  return data.json();
}

const Home = async () => {
  const data = await getData();
  
  return (
    <div className="mt-10">
      <>
        <title>فروشگاه فایل مرن فا</title>
      </>
      <main>
        <MainSlider />
        <ProductsSlider data={data.apps} title="اپلیکیشن ها" compLink="apps" />
        <MiddleBanner />
        <ProductsSlider data={data.books} title="کتاب ها" compLink="books" />
        <Categories />
        <GraphicSlider data={data.graphicFiles}/>
        <NewBlogs/> 
      </main>
    </div>
  );
}

export default Home;