import Image from "next/image";

const Loading = () => {
    return ( 
        <div className="flex justify-center py-10">
            <Image alt="loading" width={140} height={140} src={"/loading.gif"}/>
        </div>
     );
}
 
export default Loading;