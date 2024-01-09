import Image from "next/image";

const AboutPage = () => {
    return ( 
        <div className="text-center my-10">
            <span className="bg-orange-400 p-4">درباره ما</span>
            <Image alt="image" width={300} height={300} src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKRzHHirDMQU_v0RHsILVKVt2O2RzpYR_EA_wiH5XaZQiOO_SBqb_8clGzD2cNXMTFoB0&usqp=CAU"} />
            
        </div>
     );
}
 
export default AboutPage;