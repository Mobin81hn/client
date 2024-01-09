import { useRouter } from "next/navigation";

const Btn = ({ keyword , pn , orderBy , type , minP , maxP , categories , num}) => {
  const router = useRouter();
  
  return (
    <button
      onClick={() => {
        router.push(`/shop?${keyword ? `keyword=${keyword}` : ""}&pn=${num}${orderBy ? `&orderBy=${orderBy}` : ""}${type ? `&type=${type}` : ""}${minP ? `&minP=${minP}` : ""}${maxP ? `&maxP=${maxP}` : ""}${categories ? `&categories=${categories}` : ""}`)
      }}
      className={
        num == pn ?
        "w-9 h-9 bg-blue-600 text-white font-bold rounded-lg fa-num" :
        "w-9 h-9 bg-blue-200 text-blue-600 font-bold transition-all duration-300 hover:bg-blue-300 hover:shadow-lg rounded-lg fa-num"
      }
    >
      {num}
    </button>
  );
};

export default Btn;
