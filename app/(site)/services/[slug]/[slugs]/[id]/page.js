"use client";

import DetailsPageSideImageWrper from "@/app/componnent/DetaillspageSideImageWrper";
import Ratings from "@/app/componnent/Rating";
import ReviewPopUp from "@/app/componnent/ReviewPopUp";
import ProfileSkeleton from "@/app/componnent/skelaton/ProfileSkeleton";
import SpinLoader from "@/app/componnent/SpingLoader";
import getId from "@/utilis/helper/cookie/getid";
import getCookie from "@/utilis/helper/cookie/gettooken";
import maskMiddle from "@/utilis/helper/maskMiddle";
import { motion } from "framer-motion";
import { Mail, Phone, Star } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { CiMail } from "react-icons/ci";
import { LuPhoneCall } from "react-icons/lu";
import { MdOutlineNotificationImportant } from "react-icons/md";
import { SlLocationPin } from "react-icons/sl";
import { toast, ToastContainer } from "react-toastify";





export default function ServiceDetailsPage() {

    const token = getCookie();
    const [Loading, setLoading] = useState(false);
    const [btnLoading, setbtnLoading] = useState(false);
    const [Service, setService] = useState([]);
    const { id } = useParams();
    const [rating, setRating] = useState(0);
    const userId = getId();
    const [newReviewDes, setnewReviewDes] = useState('');



    const handleSubmit = (e) => {
        e.preventDefault();
        if (newReview.name && newReview.text) {
            setReviews([{ ...newReview, id: Date.now() }, ...reviews]);
            setNewReview({ name: "", rating: 5, text: "" });
        }
    };






    //fetch the single service
    // Fetch single service directly
    const fetchService = async () => {
        setLoading(true);
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/singleProduct/${id}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            const data = await res.json();
            if (data.success) setService(data.data);
            else toast.error("❌ Failed to load service details.");
        } catch {
            toast.error("⚠️ Network or server error.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) fetchService();
    }, [id]);




    console.log(Service);




    /*************************** Create Review function is here **********************************/
    const CreateReview = async (e) => {

        e.preventDefault();

        const reviewData = {
            productId: Service?._id,
            userId: userId,
            reviewDescription: newReviewDes,
            reviewStar: rating
        }

        try {
            if (newReviewDes && rating > 0 && token) {
                setbtnLoading(true);

                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_BASE_URL}/createreview`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                        body: JSON.stringify(reviewData),
                    }
                );

                const data = await res.json();

                if (data.success) {
                    toast.success("Review submitted successfully!");
                    setnewReviewDes('');
                    setRating(0);
                    setTimeout(() => {
                        fetchService();
                    }, 1000);
                } else {
                    toast.error("Failed to submit review.");
                }
            } else {
                toast.error("Please provide review description and rating, and ensure you are logged in.");
            }
        } catch (error) {
            console.error("Error submitting review:", error);
            toast.error("Network or server error while submitting review.");
        } finally {
            setbtnLoading(false);
        }

    }






    if (Loading) return <ProfileSkeleton />


    return (
        <section className="bg-gradient-to-b from-gray-50 to-white text-black py-12">
            <div className="container mx-auto px-6 grid md:grid-cols-3 gap-8 ">
                {/* LEFT: MAIN DETAILS */}
                <div className="md:col-span-2 space-y-10 bg-white rounded-lg p-4 lg:p-10 shadow-lg">
                    {/* HEADER */}
                    <motion.div
                        className="relative cursor-pointer group"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h1 className="text-4xl font-bold mb-3 text-[var(--brandColor)]">
                            {Service?.name}
                        </h1>
                        <div className="flex items-center gap-1 text-yellow-500 mb-3">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                    key={i}
                                    size={22}
                                    fill={i < Math.round(Service?.reviews?.analytics?.average) ? "currentColor" : "none"}
                                    strokeWidth={1.5}
                                />
                            ))}
                            <span className="text-gray-600 ml-2 text-sm">{Service?.reviews?.total} Reviews</span>
                        </div>
                        <p className="text-gray-700 max-w-2xl leading-relaxed">
                            {Service?.description}
                        </p>


                        <div className={`absolute top-20 left-0 w-[300px] h-auto rounded=md shadow-md z-50 bg-gray-50`}>

                            <ReviewPopUp Reviews={Service?.reviews} />

                        </div>


                    </motion.div>

                    {/* CONTACT INFO */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="bg-white/90 backdrop-blur-sm border border-gray-100 p-6 rounded-[var(--radius-card)] shadow-md hover:shadow-lg transition"
                    >
                        <h2 className="text-xl font-semibold mb-5 text-[var(--brandColor)] border-b pb-2 border-gray-200 flex items-center gap-1">
                            Contact Information
                            {
                                !token && (
                                    <span className="ml-2 p-1 rounded-lg border border-red-300 text-gray-900 text-xs bg-red-100 flex items-center gap-1">
                                        <MdOutlineNotificationImportant className="text-lg" />
                                        Please log in to view contact details

                                    </span>
                                )
                            }
                        </h2>
                        <div className={`grid sm:grid-cols-2 gap-3 text-gray-700 ${!token && "blurred-text"}`}>
                            <p className="flex items-center gap-2">
                                <Phone size={18} className="text-[var(--brandColor)]" />
                                {Service?.phone}
                            </p>
                            <p className="flex items-center gap-2">
                                <Mail size={18} className="text-[var(--brandColor)]" />
                                {Service?.email}
                            </p>
                        </div>
                    </motion.div>

                    {/* REVIEWS */}
                    <motion.div id="reviews"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="bg-white p-6 rounded-[var(--radius-card)] shadow-md hover:shadow-lg transition scroll-mt-[100px]"
                    >
                        <h2 className="text-xl font-semibold mb-5 text-[var(--brandColor)] border-b pb-2 border-gray-200 flex items-center gap-1">
                            Customer Reviews

                            {
                                !token && (
                                    <span className="ml-2 p-1 rounded-lg border border-red-300 text-gray-900 text-xs bg-red-100 flex items-center gap-1">
                                        <MdOutlineNotificationImportant className="text-lg" />
                                        Please log in to view Customer Reviews
                                    </span>
                                )
                            }

                        </h2>


                        {/* added here start */}

                        <div className={`space-y-6 mb-10 relative ${!token && "blurred-text"}`}>
                            {Service?.reviews?.reviewsDetails?.map((r) => (
                                <div
                                    key={r.id}
                                    className="p-5 bg-white rounded-xl border border-gray-200 shadow-sm"
                                >
                                    {/* Top Section */}
                                    <div className="flex items-start justify-between">
                                        <div>
                                            {/* USER NAME */}
                                            <h4 className="font-semibold text-gray-900 text-[18px]">
                                                {/* {`${r?.user?.fname} ${r?.user?.mname} ${r?.user?.lname}`} */}
                                                {
                                                    maskMiddle(r?.user?.fname + " " + r?.user?.mname + " " + r?.user?.lname)
                                                }
                                            </h4>

                                            {/* USER LOCATION & EMAIL */}
                                            <p className="text-md text-gray-500 mt-0.5 flex items-center gap-1">
                                                <SlLocationPin className="text-sky-400" />
                                                <span>{maskMiddle(r?.user?.address + "," + r?.user?.city + "-" + r?.user?.zipcode)}</span>
                                            </p>
                                            <p className="text-md text-gray-500 flex items-center gap-2">
                                                <div className="flex items-center gap-1">
                                                    <CiMail className="text-sky-400" /> <span>{maskMiddle(r?.user?.email)}</span>
                                                </div>
                                                |
                                                <div className="flex items-center gap-1">
                                                    <LuPhoneCall className="text-sky-400" />
                                                    <span>{maskMiddle(r?.user?.phone)}</span>
                                                </div>
                                            </p>
                                        </div>

                                        {/* Star Rating */}
                                        <div className="flex gap-[2px] text-yellow-500">
                                            {Array.from({ length: 5 }).map((_, i) => (
                                                <Star
                                                    key={i}
                                                    size={20}
                                                    fill={i < r?.reviewStar ? "currentColor" : "none"}
                                                    strokeWidth={1.5}
                                                />
                                            ))}
                                        </div>
                                    </div>

                                    {/* Review Text */}
                                    <p className="text-gray-700 text-sm leading-relaxed mt-3">
                                        {r?.reviewDescription}
                                    </p>
                                </div>
                            ))}
                        </div>




                        {/* added here end */}


















































































































                        {/* Add Review */}
                        <div className="border-t pt-6">
                            <h3 className="font-semibold text-gray-900 mb-4 text-lg">
                                Write a Review <span className="bg-red-100 border-2 border-red-200 rounded-md ml-2 px-1 text-sm">Min:10 And Max:500 characters </span>
                            </h3>
                            <div className="grid gap-3 mb-4">
                                {/* <input
                                    type="text"
                                    placeholder="Your Name"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--brandColor)]"
                                    value={newReview.name}
                                    onChange={(e) =>
                                        setNewReview({ ...newReview, name: e.target.value })
                                    }
                                /> */}
                                <textarea
                                    rows="4"
                                    placeholder="Your Review..."
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--brandColor)]"
                                    value={newReviewDes}
                                    onChange={(e) =>
                                        setnewReviewDes(e.target.value)
                                    }
                                ></textarea>
                                <div className="flex items-center gap-2">
                                    <label className="text-lg font-bold text-gray-700">
                                        Rating:
                                    </label>
                                    <Ratings rating={rating} setRating={setRating} />
                                </div>
                            </div>

                            <button
                                onClick={(e) => { CreateReview(e) }}
                                className="px-6 py-2 bg-[var(--brandBg)] text-white font-semibold rounded-md hover:opacity-90 transition cursor-pointer mt-6 flex items-center gap-4"
                            >

                                {btnLoading && <SpinLoader />}
                                Submit Review
                            </button>
                        </div>
                    </motion.div>
                </div>

                {/* RIGHT: STICKY IMAGE CARD */}
                <DetailsPageSideImageWrper serviceImageUrls={Service?.serviceImages} />

                <ToastContainer />
            </div >
        </section >
    );
}
