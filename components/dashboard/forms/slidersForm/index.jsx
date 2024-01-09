"use client";
import { useEffect, useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import AllSliders from "./allSliders";
import NewSlider from "./newSlider";
import SliderDetails from "./sliderDetails";

const SliderMain = () => {
    const [sliderDetCtrl , setSliderDetCtrl] = useState("")
    const [currentButton , setCurrentButton] = useState("allslides")
    const [detail,setDetail] = useState(<AllSliders setSliderDetCtrl={setSliderDetCtrl}/>);

    useEffect(()=>{
        if(sliderDetCtrl != ""){
            setDetail(<SliderDetails id={sliderDetCtrl} setSliderDetCtrl={setSliderDetCtrl}/>)
        }else{
            setDetail(<AllSliders setSliderDetCtrl={setSliderDetCtrl}/>)
        }
    },[sliderDetCtrl])

    return ( 
        <div className="flex flex-col gap-4">
            <section className="flex justify-between">
                <h1 className="text-blue-500 text-xl">اسلایدر ها</h1>
                <div className="flex items-center gap-2">
                    {
                        sliderDetCtrl ? (
                            <>
                                <span>بازگشت</span>
                                <button onClick={() => {
                                   setSliderDetCtrl("")
                                   setDetail(<AllSliders setSliderDetCtrl={setSliderDetCtrl}/>)
                                   }} className="flex justify-center items-center bg-orange-500 text-white w-8 h-8 rounded-md transition-colors duration-300 hover:bg-blue-600"><BsArrowLeft className="w-5 h-5"/></button> 
                            </>
                        ) : (
                            <>
                                <button onClick={() => {
                                    setDetail(<AllSliders setSliderDetCtrl={setSliderDetCtrl}/>)
                                    setCurrentButton("allslides")
                                }} className={
                                    currentButton == "allslides" ?
                                    "px-3 py-1 rounded-md bg-blue-500 text-white transition-colors duration-500" :
                                    "px-3 py-1 rounded-md bg-orange-500 text-white transition-colors duration-500 hover:bg-orange-600"
                                }>
                                    همه
                                </button>
                                <button onClick={() => {
                                    setDetail(<NewSlider/>)
                                    setCurrentButton("newSlider")
                                }} className={
                                    currentButton == "newSlider" ?
                                    "px-3 py-1 rounded-md bg-blue-500 text-white transition-colors duration-500" :
                                    "px-3 py-1 rounded-md bg-orange-500 text-white transition-colors duration-500 hover:bg-orange-600"
                                }>
                                    اسلایدر جدید
                                </button>
                            </>
                        )
                    }
                </div>
            </section>
            <section>
                {detail}
            </section>
        </div>
     );
}
 
export default SliderMain;