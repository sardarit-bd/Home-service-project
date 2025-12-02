"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";



export default function FeaturedProvidersSection() {


    const [Services, setServices] = useState([]);
    const [Loading, setLoading] = useState(false);


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
        fetchServices();
    }, []);

    const reviewsart = Services?.sort((a, b) => {
        return b?.reviews?.total - a?.reviews?.total;
    });

    const FeaturedServices = reviewsart.slice(0, 8);


    return (
        <section className="py-20 bg-white text-black relative">
            <div className="container mx-auto px-6 md:px-10 lg:px-16">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-14"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-3">
                        Featured{" "}
                        <span className="text-[var(--brandColor)]">Top-Rated Providers</span>
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Discover trusted professionals in your area — rated by real
                        homeowners for quality, reliability, and service excellence.
                    </p>
                </motion.div>

                {/* Providers Grid */}
                <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-8">
                    {FeaturedServices?.map((provider, index) => (
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
                                    src={provider.serviceImages[0]}
                                    alt={provider?.name}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition"></div>
                            </div>

                            {/* Info */}
                            <div className="p-5">
                                <h3 className="font-semibold text-lg text-gray-900 mb-1">
                                    {provider?.name}
                                </h3>
                                <p className="text-sm text-gray-600 mb-3">
                                    {provider?.selectedCategories}
                                </p>
                                <div className="flex items-center gap-1 text-yellow-500 mb-3">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <Star
                                            key={i}
                                            size={16}
                                            fill={i < Math.round(provider.reviews?.analytics?.average) ? "currentColor" : "none"}
                                            strokeWidth={1.5}
                                        />
                                    ))}
                                    <span className="text-gray-600 text-sm ml-1">
                                        ({provider.reviews?.total} reviews)
                                    </span>
                                </div>

                                <Link
                                    href={`/services/handyman/carpentry/${provider?._id}`}
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
