"use client";
import { useEffect , useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Image from "next/image";
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

const SliderDetails = ({id , setSliderDetCtrl}) => {
    const [updateButtonDisabled , setUpdateButtonDisabled] = useState(false);
    const [removeButtonDisabled , setRemoveButtonDisabled] = useState(false);
    const [loading , setLoading] = useState(true);
    const [image , setImage] = useState("")
    const [imageAlt , setImageAlt] = useState("")
    const [sorter , setSorter] = useState(1)
    const [link , setLink] = useState("")
    const [situation , setSituation] = useState(true)
    const [showDialog , setShowDialog] = useState(false)

    const onOpenModal = () => setShowDialog(true);
    const onCloseModal = () => setShowDialog(false);

    const goTopCtrl = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }; 

    const removeSlider = async () => {
        try {
            setRemoveButtonDisabled(true)
            await axios.delete(`https://mernfa-fileshop-server.iran.liara.run/api/slider/remove-slider/${id}`)
            setRemoveButtonDisabled(false)
            onCloseModal()
            toast.success("اسلایدر با موفقیت حذف شد.",{position: "top-right",autoClose: 5000,rtl: true,className: 'toast-message'})
            setTimeout(() => {
                setSliderDetCtrl("")
            }, 500);
        } catch (error) {
            toast.error("خطا در حذف اسلایدر",{position: "top-right",autoClose: 5000,rtl: true,className: 'toast-message'})
        }
    }

    const formSubmit = async (e) => {
        e.preventDefault();
        if(image == "" || imageAlt == "" || sorter == "" || link == ""){
            return toast.error("خطا در بروزرسانی اسلایدر",{position: "top-right",autoClose: 5000,rtl: true,className: 'toast-message'})
        }

        setUpdateButtonDisabled(true);
        
        const formData = {
            image,
            imageAlt, 
            sorter,
            link,
            situation
        }
        
        try {
            await axios.put(`https://mernfa-fileshop-server.iran.liara.run/api/slider/update-slider/${id}`,formData);
            toast.success("اسلایدر با موفقیت بروزرسانی شد.",{position: "top-right",autoClose: 5000,rtl: true,className: 'toast-message'})
        } catch (error) {
            toast.error("خطا در بروزرسانی اسلایدر",{position: "top-right",autoClose: 5000,rtl: true,className: 'toast-message'})
        }

        setUpdateButtonDisabled(false);
    }

    useEffect(()=>{
        goTopCtrl();
        axios.get(`https://mernfa-fileshop-server.iran.liara.run/api/slider/one-slider/${id}`)
        .then((d) => {
            setImage(d.data.data.image)
            setImageAlt(d.data.data.imageAlt)
            setSorter(d.data.data.sorter)
            setLink(d.data.data.link)
            setSituation(d.data.data.situation)
            setLoading(false)
        })
        .catch(e => {
            toast.error("خطا در لود اطلاعات",{position: "top-right",autoClose: 5000,rtl: true,className: 'toast-message'})
            console.log(e)
        })
    },[])

    return ( 
        <div className="flex flex-col gap-6">
            {
                loading ? (
                    <div className="flex justify-center py-5">
                        <Image alt="loading gif" src={"/loading.gif"} width={120} height={120} /> 
                    </div>
                ) : (
                    <>
                        <div className="flex justify-between items-center mt-4">
                            <h2 className="text-orange-500 text-xl">اطلاعات اسلایدر</h2>
                            <button className="bg-red-500 text-white px-4 py-1 rounded-md transition-all duration-300 hover:bg-red-600" onClick={onOpenModal}>حذف اسلایدر</button>
                            <Modal open={showDialog} onClose={onCloseModal} center>
                              <div>
                                <h1 className="py-10">آیا مطمئن هستید که می خواهید این اسلایدر را حذف کنید؟</h1>
                                <div className="flex flex-row-reverse gap-2">
                                    <button onClick={removeSlider} disabled={removeButtonDisabled} className="flex items-center px-4 py-1 outline-none rounded-md bg-red-500 text-white transition-all duration-300 hover:shadow-[0px_1px_8px_rgba(200,0,0,0.75)]">
                                        حذف
                                        {
                                            removeButtonDisabled
                                            &&
                                            <svg aria-hidden="true" className="inline w-4 h-4 mr-2 text-gray-400 animate-spin dark:text-gray-600 fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                            </svg>
                                        }
                                    </button>
                                    <button onClick={onCloseModal} className="px-4 py-1 outline-none rounded-md bg-gray-300 text-slate-600 transition-all duration-300 hover:shadow-[0px_1px_6px_rgba(0,0,0,0.25)]">لغو</button>
                                </div>
                              </div>
                            </Modal>
                        </div>
                        <form onSubmit={formSubmit} className="flex flex-col gap-6">
                            <div className="flex flex-col gap-2">
                                <label htmlFor="imageSrc">آدرس عکس</label>
                                <input id="imageSrc" value={image} onChange={(e) => setImage(e.target.value)} type="text" className="p-2 ltr-input rounded-md w-full outline-none border-2 border-zinc-300 focus:border-orange-400"/>
                                {image ? <></> :<p className="text-base sm:text-sm text-red-600">آدرس عکس را وارد نکرده اید.</p>}
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="imageAlt">آلت عکس</label>
                                <input id="imageAlt" value={imageAlt} onChange={(e) => setImageAlt(e.target.value)} type="text" className="p-2 rounded-md w-full outline-none border-2 border-zinc-300 focus:border-orange-400"/>
                                {imageAlt ? <></> :<p className="text-base sm:text-sm text-red-600">آلت عکس را وارد نکرده اید.</p>}
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="sorter">سورتر</label>
                                <input id="sorter" value={sorter} onChange={(e) => setSorter(e.target.value)} type="number" min={1} className="p-2 rounded-md w-full outline-none border-2 border-zinc-300 focus:border-orange-400"/>
                                {sorter ? <></> :<p className="text-base sm:text-sm text-red-600">سورتر را وارد نکرده اید.</p>}
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="imageLink">لینک عکس</label>
                                <input id="imageLink" value={link} onChange={(e) => setLink(e.target.value)} type="text" className="p-2 ltr-input rounded-md w-full outline-none border-2 border-zinc-300 focus:border-orange-400"/>
                                {link ? <></> :<p className="text-base sm:text-sm text-red-600">لینک عکس را وارد نکرده اید.</p>}
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="imageSitu">وضعیت</label>
                                <select id="imageSitu" value={situation} onChange={(e) => setSituation(e.target.value)} className="p-2 rounded-md w-full outline-none border-2 border-zinc-300 focus:border-orange-400">
                                    <option value={true}>روشن</option>
                                    <option value={false}>خاموش</option>
                                </select>
                            </div>
                            <button type="submit" disabled={updateButtonDisabled} className="w-full flex justify-center gap-1 py-3 mt-8 bg-blue-600 text-white rounded-md transition-all duration-500 hover:bg-blue-700">
                                بروزرسانی 
                                {
                                    updateButtonDisabled
                                    &&
                                    <svg aria-hidden="true" className="inline w-6 h-6 mr-2 text-gray-400 animate-spin dark:text-gray-600 fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                    </svg>
                                }
                            </button>
                        </form>
                    </>
                )
            }
        </div>
     );
}
 
export default SliderDetails;