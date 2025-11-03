'use client'

import usedeshboardsidebercontroller from "@/store/deshboardsidebercontroller";
import useLoadingStore from "@/store/useLoadingStore";
import useLogedUserStore from "@/store/useLogedUser";
import getCookie from "@/utilis/helper/cookie/gettooken";
import setCookie from "@/utilis/helper/cookie/setcookie";
import MakePost from "@/utilis/requestrespose/post";
import { useRouter } from "next/navigation";
import { IoMdSettings } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { toast, ToastContainer } from "react-toastify";
import DeshboardNavigation from "../componnent/Deshboardnavigation";
import SpinLoader from "../componnent/SpingLoader";

const Deshboardlayout = ({ children }) => {

    const token = getCookie();
    const router = useRouter();
    const { loginUser, setLoginUser } = useLogedUserStore();
    const { isSideberOpen, setisSideberOpen } = usedeshboardsidebercontroller();
    const { isLoading, setLoading } = useLoadingStore();




    /*************** handle logout funciton is here ******************/
    const handlelogout = async () => {

        setLoading(true);

        const response = await MakePost('logout', {}, token);

        if (response.success) {
            setCookie("token", '', 1);
            setCookie("name", '', 1);
            setCookie("id", '', 1);
            setCookie("role", '', 1);
            setLoginUser({ name: null, token: null, role: null });
            setLoading(false);
            router.push('/signin');
            toast.success(response.message);
        } else {
            setLoading(false);
            toast.error("Somethign went Wrong");
        }


    }

    return (
        <div className="h-fit text-black">
            {
                !isSideberOpen && <div onClick={() => { setisSideberOpen(true) }} className={`absolute flex lg:hidden z-50 bg-sky-400 text-white  items-center justify-center rounded-md  p-2 -translate-x-3 mt-4 cursor-pointer`}>
                    <IoMdSettings className="animate-spin" />
                </div>
            }
            <div className="">
                <div className={`fixed bg-white border-r border-gray-200 w-[250px] h-screen px-3 py-4 ${isSideberOpen ? "block lg:block" : "hidden lg:block"}`}>

                    <div onClick={() => { setisSideberOpen(false) }} className={`absolute w-[25px] h-[25px] right-0 top-0 bg-sky-300 rounded-sm cursor-pointer text-white flex lg:hidden items-center justify-center hover:rotate-180 transition duration-400`}>
                        <RxCross2 className="" />
                    </div>


                    <DeshboardNavigation loginUser={loginUser} />


                    <button onClick={() => { handlelogout() }} className="bg-sky-400 text-white w-[90%] text-center py-2 rounded-md absolute bottom-24 left-3 cursor-pointer flex items-center justify-center gap-2">
                        {
                            isLoading && <SpinLoader />
                        }
                        Log out
                    </button>
                </div>
                <div className="px-6 w-full h-fit pt-6 pl-6 lg:pl-[270px] min-h-screen h-fit pb-6">
                    <div className=" bg-white rounded-2xl shadow-lg p-6 w-full max-w-full">
                        {children}
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default Deshboardlayout;