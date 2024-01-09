"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";

const MostViewedPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get("https://mernfa-fileshop-server.iran.liara.run/api/post/get-most-viewed-posts")
      .then((d) => {
        setPosts(d.data.data);
        setLoading(false);
      })
      .catch((e) => console.log(e));
  }, []);
  return (
    <div className="flex flex-col gap-6 rounded-lg shadow-[0px_0px_8px_rgba(0,0,0,0.35)] p-4">
      {loading ? (
        <div className="flex justify-center py-5">
          <Image
            alt="loading gif"
            src={"/loading.gif"}
            width={120}
            height={120}
          />
        </div>
      ) : (
        <>
          <h3 className="text-lg text-blue-500 ">پربازدید ترین مقالات</h3>
          <ul className="flex flex-col gap-5">
            {posts.length == 0 ? (
              <h1>مقاله ای وجود ندارد</h1>
            ) : (
              posts.map((p,i) => (
                <li key={i}>
                  <Link
                    className="border-r-2 border-zinc-600 pr-2 leading-7 text-base sm:text-sm sm:leading-6"
                    href={`/blog/${p.slug}`}
                  >
                    {p.title}
                  </Link>
                </li>
              ))
            )}
          </ul>
        </>
      )}
      </div>
  );
};

export default MostViewedPosts;
