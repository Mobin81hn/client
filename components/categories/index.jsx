import CatBox from "./box";

const getData = async () => {
  const data = await fetch("https://mernfa-fileshop-server.iran.liara.run/api/category/active-categories", { cache: "no-store" });
  return data.json();
};
/*  سوال برای هندل کردن ارور در سرور ساید ها  */

const Categories = async () => {
    try {
        const data = await getData();
        return (
          <>
            {data.data.length != 0 && (
              <section className="container mx-auto flex justify-center items-center gap-y-2 gap-x-4 flex-wrap">
                  {
                    data.data.map((c , i) => (
                      <CatBox key={i} {...c}/>
                    ))
                  }
              </section>
            )}
          </>
        );
    } catch (error) {
        return <></>
    }
};

export default Categories;
