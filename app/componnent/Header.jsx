"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import logo from "../../public/logo.png";
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
            <Image src={logo} alt="Logo" className="w-[90px]" />
          </Link>
          <Navigation isOpen={isOpen} setisOpen={setisOpen} />

          <HeaderAuth isOpen={isOpen} setisOpen={setisOpen} />
        </div>
      </div>
    </header>
  );
};

export default Header;
