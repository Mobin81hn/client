import ShopComp from "@/components/shopComp";

const ShopPage = ({searchParams}) => {
    return ( 
        <ShopComp url={searchParams}/>
     );
}
 
export default ShopPage;