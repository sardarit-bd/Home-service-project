import getCookie from "@/utilis/helper/cookie/gettooken";
import { Star } from "lucide-react";
import Link from "next/link";
import { MdOutlineNotificationImportant } from "react-icons/md";

const ReviewPopUp = ({ Reviews }) => {


    const token = getCookie();


    return (
        <div className="hidden transition duration-300 max-w-md w-full bg-white p-6 rounded-lg shadow-2xl space-y-4 group-hover:block">

            {/* Heading */}
            <h2 className="text-xl font-bold text-[var(--brandColor)]">Customer reviews</h2>

            {/* Rating Summary */}
            <div className="flex items-center gap-2">
                <div className="flex text-yellow-500 text-2xl">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                            key={i}
                            size={18}
                            fill={i < Math.round(Reviews?.analytics?.average) ? "currentColor" : "none"}
                            strokeWidth={1.5}
                        />
                    ))}
                </div>
                <p className="text-gray-800 font-semibold text-lg">{Reviews?.analytics?.average} out of 5</p>
            </div>

            {/* Rating Bars */}
            <div className={`space-y-3`}>

                {
                    token ? (
                        <>
                            {/* <p className="text-gray-500 text-sm pb-2">8 global ratings</p> */}

                            {/* 5 Star */}
                            <div className="flex items-center gap-3">
                                <span className="text-gray-600 font-medium w-14 cursor-pointer">5 star</span>
                                <div className="flex-1 h-4 bg-gray-200 rounded relative overflow-hidden">
                                    <div className="h-full bg-yellow-500" style={{ width: Reviews?.analytics?.star5?.parsentage + "%" }}></div>
                                </div>
                                <span className="text-gray-700 text-sm w-10">{Reviews?.analytics?.star5?.parsentage}%</span>
                            </div>

                            {/* 4 Star */}
                            <div className="flex items-center gap-3">
                                <span className="text-gray-600 font-medium w-14 cursor-pointer">4 star</span>
                                <div className="flex-1 h-4 bg-gray-200 rounded relative overflow-hidden">
                                    <div className="h-full bg-yellow-500" style={{ width: Reviews?.analytics?.star4?.parsentage + "%" }}></div>
                                </div>
                                <span className="text-gray-700 text-sm w-10">{Reviews?.analytics?.star4?.parsentage}%</span>
                            </div>

                            {/* 3 Star */}
                            <div className="flex items-center gap-3">
                                <span className="text-gray-600 font-medium w-14 cursor-pointer">3 star</span>
                                <div className="flex-1 h-4 bg-gray-200 rounded relative overflow-hidden">
                                    <div className="h-full bg-yellow-500" style={{ width: Reviews?.analytics?.star3?.parsentage + "%" }}></div>
                                </div>
                                <span className="text-gray-700 text-sm w-10">{Reviews?.analytics?.star3?.parsentage}%</span>
                            </div>

                            {/* 2 Star */}
                            <div className="flex items-center gap-3">
                                <span className="text-gray-600 font-medium w-14 cursor-pointer">2 star</span>
                                <div className="flex-1 h-4 bg-gray-200 rounded relative overflow-hidden">
                                    <div className="h-full bg-yellow-500" style={{ width: Reviews?.analytics?.star2?.parsentage + "%" }}></div>
                                </div>
                                <span className="text-gray-700 text-sm w-10">{Reviews?.analytics?.star2?.parsentage}%</span>
                            </div>

                            {/* 1 Star */}
                            <div className="flex items-center gap-3">
                                <span className="text-gray-600 font-medium w-14 cursor-pointer">1 star</span>
                                <div className="flex-1 h-4 bg-gray-200 rounded relative overflow-hidden">
                                    <div className="h-full bg-yellow-500" style={{ width: Reviews?.analytics?.star1?.parsentage + "%" }}></div>
                                </div>
                                <span className="text-gray-700 text-sm w-10">{Reviews?.analytics?.star1?.parsentage}%</span>
                            </div>
                        </>
                    ) : (
                        <div>
                            <div className="py-4 blurred-text">
                                <div className="flex items-center gap-3">
                                    <span className="text-gray-600 font-medium w-14 cursor-pointer">5 star</span>
                                    <div className="flex-1 h-4 bg-gray-200 rounded relative overflow-hidden">
                                        <div className="h-full bg-yellow-500" style={{ width: "46%" }}></div>
                                    </div>
                                    <span className="text-gray-700 text-sm w-10">46%</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-gray-600 font-medium w-14 cursor-pointer">5 star</span>
                                    <div className="flex-1 h-4 bg-gray-200 rounded relative overflow-hidden">
                                        <div className="h-full bg-yellow-500" style={{ width: "46%" }}></div>
                                    </div>
                                    <span className="text-gray-700 text-sm w-10">46%</span>
                                </div>
                            </div>
                            <span className="ml-2 p-1 rounded-lg border border-red-300 text-gray-900 text-xs bg-red-100 flex items-center gap-1">
                                <MdOutlineNotificationImportant className="text-lg" />
                                Please log in to view Reviews Analysis
                            </span>
                            <div className="w-full flex items-center justify-center">
                                <Link href="#reviews" className="w-full text-center text-xs text-sky-400 pt-3 cursor-pointer">See Customer Reviews</Link>
                            </div>
                        </div>
                    )
                }

            </div>
        </div>
    )
}

export default ReviewPopUp;