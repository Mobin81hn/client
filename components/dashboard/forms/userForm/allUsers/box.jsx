

const Box = ({_id,username,displayname,email,createdAt,viewed,userIsActive,setUserDetCtrl}) => {
    return ( 
        <div onClick={() => setUserDetCtrl(_id)} className="flex justify-between gap-6 p-6 cursor-pointer bg-zinc-100 border-2 border-zinc-200 rounded-md transition-all duration-300 hover:border-orange-400">
            <div className="flex flex-col gap-3">
                <div>نام کاربری : {username}</div>
                <div>نام نمایشی : {displayname}</div>
                <div>ایمیل : {email}</div>
                <div>تاریخ ثبت نام : {createdAt}</div>
                <div>وضعیت حساب : {userIsActive ? <span className="bg-green-600 text-white px-3 py-1 rounded-md text-base sm:text-xs">فعال</span> : <span className="bg-rose-600 text-white px-2 py-1 rounded-md text-base sm:text-xs">غیرفعال</span>}</div>
            </div>
            <div>
                {
                    viewed ? <></> : <span className="bg-blue-500 text-white px-2 py-1 rounded-md text-base sm:text-xs">جدید</span>
                }
            </div>
        </div>
     );
}
 
export default Box;