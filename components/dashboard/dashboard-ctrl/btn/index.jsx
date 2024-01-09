"use client";
const DashboardCtrlBtn = ({title,content,currentButton,setCurrentButton,setContentChanger}) => {
    return ( 
        <button 
        onClick={() => {
            setContentChanger(content)
            setCurrentButton(content)
        }} 
        className={
            currentButton == content 
            ? "w-full h-12 flex justify-center items-center rounded-md bg-blue-500 text-white"
            : "w-full h-12 flex justify-center items-center rounded-md bg-orange-500 text-white transition-all duration-300 hover:bg-orange-600"
        }>
            {title}
        </button>
     );
}
 
export default DashboardCtrlBtn;