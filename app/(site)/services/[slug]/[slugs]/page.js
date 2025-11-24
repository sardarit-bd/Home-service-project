"use client";

import SkeletonList from "@/app/componnent/skelaton/SkeletonList";
import useSearchStore from "@/store/useSearchStore";
import filterServices from "@/utilis/helper/filterServices";
import getLastTwoArray from "@/utilis/helper/getLastTwoArray";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";



export default function FeaturedProvidersSection() {



    const params = useParams()
    const query = useSearchParams();
    const pathName = usePathname();
    const search = query.get('q');
    const [Areas, setAreas] = useState([]);
    const [Services, setServices] = useState([]);
    const [Loading, setLoading] = useState(false);
    const { services, setsubservices, subservices, setservices, area, setarea } = useSearchStore();




    // --- Fetch All Areas ---
    const fetchAreas = async () => {
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/allarea`,
            );
            const data = await res.json();
            if (data.success) setAreas(data.total || []);
        } catch (err) {
            console.error("Failed to load areas:", err);
        }
    };



    const fetchServices = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/allproducts`, {
                method: "GET"
            });
            const data = await res.json();
            if (data.success) setServices(data.data || []);
            else toast.error("❌ Failed to fetch services.");
        } catch {
            toast.error("⚠️ Network or server error.");
        } finally {
            setLoading(false);
        }
    };



    useEffect(() => {
        fetchAreas();
        fetchServices();
        const result = getLastTwoArray(pathName);
        setservices(result[0]);
        setsubservices(result[1]);
    }, []);





    //filter services here
    const filteredServices = filterServices(Services, { area, category: services, sub: subservices });






    console.log(filteredServices);


// handyman

// carpentry


    if (Loading) return <SkeletonList />


    return (
        <section className="py-8 bg-white text-black relative">
            <div className="container mx-auto px-6 md:px-10 lg:px-16">


                <div className="flex flex-col md:flex-row items-center justify-between w-full mb-10 px-1 md:px-5 py-3">



                    <div>
                        <h3 className="text-2xl text-nowrap capitalize">{`${services.toLowerCase()},${subservices.toLowerCase()} `}Services Providers Profile</h3>
                    </div>


                    {/* Right Dropdown */}
                    <div value={area} onChange={(e) => { setarea(e.target.value.toLowerCase()) }} className="flex md:mt-0 items-center justify-end w-full">
                        <select className="px-1 md:px-5 w-full md:w-fit py-2 bg-white border border-gray-300 rounded-lg shadow-sm text-gray-700 focus:outline-none cursor-pointer capitalize outline-none">

                            {
                                Areas?.map((item, index) => {
                                    return (
                                        <option className="capitalize" value={item?.areaName.toLowerCase()} key={index}>{item?.areaName?.toLowerCase()}</option>
                                    )
                                })
                            }

                        </select>
                    </div>
                </div>


                {/* Providers Grid */}
                <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-8">
                    {Services.map((provider, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.15, duration: 0.6 }}
                            className="bg-white rounded-[var(--radius-card)] overflow-hidden shadow-md hover:shadow-xl transition group"
                        >
                            {/* Image */}
                            <div className="relative h-52 overflow-hidden">
                                <Image
                                    src={provider.serviceImageUrls[0] ? provider.serviceImageUrls[0] : "/imagenotfound.png"}
                                    alt={provider.name}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition"></div>
                            </div>

                            {/* Info */}
                            <div className="p-5">
                                <h3 className="font-semibold text-lg text-gray-900 mb-1">
                                    {provider.name}
                                </h3>
                                <p className="text-sm text-gray-600 mb-3">
                                    {provider.category}
                                </p>
                                <div className="flex items-center gap-1 text-[var(--brandColor)] mb-3">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <Star
                                            key={i}
                                            size={16}
                                            fill={i < Math.round(provider?.reviews?.analytics?.average) ? "currentColor" : "none"}
                                            strokeWidth={1.5}
                                        />
                                    ))}
                                    <span className="text-gray-600 text-sm ml-1">
                                        ({provider?.reviews?.total} reviews)
                                    </span>
                                </div>

                                <Link
                                    href={`/services/handyman/carpentry/${provider._id}`}
                                    className="inline-block mt-2 px-4 py-2 text-sm font-semibold rounded-md bg-[var(--brandBg)] text-white hover:opacity-90 transition"
                                >
                                    View Profile
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
