import Link from "next/link";
import { LuUser } from "react-icons/lu";
import { MdDashboard, MdOutlineAccountCircle } from "react-icons/md";
import { TbLogout2 } from "react-icons/tb";


// ✅ User dropdown menu
const UserMenu = ({ loginUser, handleLogout }) => (
    <div className="flex items-center justify-end w-fit gap-1 h-full text-gray-500 relative cursor-pointer pr-3 md:pr-6">
        {/* <div className="font-semibold text-md text-right line-clamp-1">{loginUser?.name}</div> */}
        <div className="group">
            <MdOutlineAccountCircle className="text-4xl" />
            <div className="flex flex-col hidden absolute top-[30px] right-0 shadow-xl min-w-[220px] min-h-[120px] group-hover:block">
                <div className="bg-transparent h-[15px]" />
                <div className="p-4 bg-white border border-gray-200 rounded-lg tooltipscostom">
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2 mb-3">
                            <MdOutlineAccountCircle className="text-5xl" />
                            <div className="flex flex-col gap-0">
                                <div className="font-semibold text-sm">{loginUser?.name}</div>
                                <span className="text-xs bg-green-100 border border-green-200 rounded-md w-fit px-1">
                                    {loginUser?.role}
                                </span>
                            </div>
                        </div>

                        {loginUser?.role !== "user" && (
                            <>
                                <Link
                                    href={
                                        loginUser?.role === "admin"
                                            ? "/deshboard/admin"
                                            : loginUser?.role === "provider"
                                                ? "/deshboard/provider"
                                                : "/"
                                    }
                                    className="text-gray-600 text-md font-semibold hover:bg-gray-200 rounded-md p-2 flex items-center gap-2"
                                >
                                    <MdDashboard className="text-xl" />
                                    <span>Dashboard</span>
                                </Link>

                                <Link
                                    href="/deshboard/profile"
                                    className="text-gray-600 text-md font-semibold hover:bg-gray-200 rounded-md p-2 flex items-center gap-2"
                                >
                                    <LuUser className="text-xl" />
                                    <span>Profile</span>
                                </Link>
                            </>
                        )}

                        <button
                            onClick={() => { handleLogout() }}
                            className="text-gray-600 text-md font-semibold hover:bg-gray-200 rounded-md p-2 flex items-center gap-2 cursor-pointer"
                        >
                            <TbLogout2 className="text-xl" />
                            <span>Logout</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
);


export default UserMenu;