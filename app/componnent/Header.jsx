'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";
import useNavIsOpenStore from "../../store/useNavIsOpenStore";
import Navigation from "../componnent/Navigation";
import HeaderAuth from "./HeaderAuth";

const Header = () => {

    const { isOpen, setisOpen } = useNavIsOpenStore();

    const pathName = usePathname();
    const isApplication = pathName.startsWith("/application");



    return (
        <header className="bg-white border border-b border-gray-200 h-[75px] w-full  fixed z-9000">
            <div className="flex items-center h-full w-full justify-center">
                <div className={`px-2 md:px-7 h-full w-full flex items-center justify-between ${!isApplication && " container"}`}>
                    <Link href={'/'} className="flex items-center h-full">
                        {/* <Image src={logo} alt="Logo" className="w-[120px]" /> */}
                        <h2 className="text-2xl font-bold text-[var(--brandColor)]">HomeServices</h2>
                    </Link>
                    <Navigation isOpen={isOpen} setisOpen={setisOpen} />


                    <HeaderAuth isOpen={isOpen} setisOpen={setisOpen} />

                </div>
            </div>
        </header>
    )
}

export default Header;