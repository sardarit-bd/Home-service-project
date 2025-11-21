"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { TbBrandGoogleHome } from "react-icons/tb";
import useNavIsOpenStore from "../../store/useNavIsOpenStore";
import Navigation from "../componnent/Navigation";
import HeaderAuth from "./HeaderAuth";

const Header = () => {
  const { isOpen, setisOpen } = useNavIsOpenStore();

  const pathName = usePathname();
  const isDasboard = pathName.startsWith("/deshboard");



  return (
    <header className="bg-white border border-b border-gray-200 h-[75px] w-full  fixed z-9000">
      <div className="flex items-center h-full w-full justify-center">
        <div
          className={`px-3 h-full w-full flex items-center justify-between ${!isDasboard && "container px-6"
            }`}
        >
          <Link href={"/"} className="flex items-center h-full">
            {/* <Image src={logo} alt="Logo" className="w-[120px]" /> */}
            <h2 className="text-2xl font-bold text-[var(--brandColor)] flex items-center gap-1">
              <TbBrandGoogleHome className="text-5xl" />
              <span className="hidden md:block text-md font-semibold pt-1">Services</span>
            </h2>
          </Link>
          <Navigation isOpen={isOpen} setisOpen={setisOpen} />

          <HeaderAuth isOpen={isOpen} setisOpen={setisOpen} />
        </div>
      </div>
    </header>
  );
};

export default Header;
