import Image from "next/image";
import Link from "next/link";
const getData = async () => {
    const data = await fetch("https://mernfa-fileshop-server.iran.liara.run/api/middle-banner/active-middle-banners",{cache: "no-store"});
    return data.json();
}

const MiddleBanner = async () => {
    const data = await getData();
    
    return ( 
        <section className="container mx-auto flex flex-col md:flex-row justify-center items-center px-4 gap-10 md:gap-6 lg:gap-10 xl:gap-32">
            {
                data.data.map((banner , i) => (
                    i < 2 ? (
                        <Link key={i} href={banner.link}>
                            <Image 
                                className="rounded-xl"
                                width={600} 
                                height={200}
                                src={banner.image} 
                                alt={banner.imageAlt}
                            />
                        </Link>
                    ) : <></>
                ))
            }
        </section>
     );
}
 
export default MiddleBanner;