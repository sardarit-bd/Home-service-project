"use client";

import useLogedUserStore from "@/store/useLogedUser";
import getEmail from "@/utilis/helper/cookie/getemail";
import getRole from "@/utilis/helper/cookie/getrole";
import getCookie from "@/utilis/helper/cookie/gettooken";
import setCookie from "@/utilis/helper/cookie/setcookie";
import MakePost from "@/utilis/requestrespose/post";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import { toast } from "react-toastify";
import UserMenu from "./UserMenu";

const HeaderAuth = ({ isOpen, setisOpen }) => {



  const pathname = usePathname();
  const [hoveredMain, setHoveredMain] = useState(null);
  const router = useRouter();
  const { loginUser, setLoginUser } = useLogedUserStore();

  const token = getCookie();
  const role = getRole();
  const name = getEmail();

  useEffect(() => {
    setLoginUser({ name, token, role });
  }, []);

  /*************** handle logout funciton is here ******************/
  const handlelogout = async () => {
    const response = await MakePost("logout", {}, token);

    if (response.success) {
      setCookie("token", "", 1);
      setCookie("name", "", 1);
      setCookie("id", "", 1);
      setCookie("role", "", 1);
      // ✅ Immediately clear loginUser state so UI updates
      setLoginUser({ name: null, token: null, role: null });
      router.push("/signin");
      toast.success(response.message);
    } else {
      toast.error("Somethign went Wrong");
    }
  };

  return (
    <div className="flex items-center justify-end">
      {/* Auth Section */}
      {!token ? (

        <div className="flex flex-row items-center justify-start px-6 md:justify-end gap-4">
          <Link
            href="/signin"
            className="px-4 py-2 md:w-fit text-center bg-white text-[var(--brandColor,#00a6f4)] font-semibold rounded-full shadow hover:bg-gray-100 transition-all"
          >
            Join & Review
          </Link>
          <Link
            href="/signin"
            className="px-4 py-2 md:w-fit text-center bg-sky-400 text-white font-semibold rounded-full shadow hover:bg-sky-500 transition-all hidden md:block"
          >
            Service Provider
          </Link>
        </div>
      ) : (
        <div className="flex items-center justify-end gap-3">
          <Link
            href="/services/handyman/carpentry"
            className="px-4 py-2 md:w-fit text-center bg-white text-[var(--brandColor,#00a6f4)] font-semibold rounded-full shadow hover:bg-gray-100 transition-all"
          >
            Join & Review
          </Link>
          <UserMenu loginUser={loginUser} handleLogout={handlelogout} />
        </div>
      )}
      <div onClick={() => setisOpen(!isOpen)} className="flex items-center justify-center lg:hidden border-2 border-gray-300 rounded-full w-10 h-10 cursor-pointer hover:bg-gray-200">

        {
          isOpen ? (
            <RxCross1 className="text-2xl text-gray-700" />
          ) : (
            <FaBars className="text-2xl text-gray-700" />
          )
        }
      </div>
    </div>
  );
};

export default HeaderAuth;
















