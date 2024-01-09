import Link from "next/link";
import BlogBox from "./BlogBox";

const getData = async () => {
  const data = await fetch("https://mernfa-fileshop-server.iran.liara.run/api/post/new-posts",{cache: "no-store"})
  return data.json();
}

const NewBlogs = async () => {
  const data = await getData();
  
  return (
    <section className="mb-10 px-4 xs:px-8 lg:px-4">
      {
        data.data.length == 0 ? <></> : (
          <>
            <header className="flex justify-between items-center mb-6 px-2 xs:px-10 sm:px-6 lg:px-2">
              <h2 className="text-xl">آخرین مقالات</h2>
              <Link href={"/blog"} className="bg-zinc-500 text-white rounded-md px-3 py-2 text-base sm:text-sm transition-all duration-500 hover:bg-zinc-600">برو به وبلاگ</Link>
            </header>
            <div className="flex items-center justify-between flex-wrap lg:flex-nowrap">
              {
                data.data.map((p , i) => (
                  <BlogBox key={i} {...p} />
                ))
              }
            </div>
          </>
        )
      }
    </section>
  );
};

export default NewBlogs;
