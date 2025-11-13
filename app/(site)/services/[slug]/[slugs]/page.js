"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import Electricals from "../../../../../public/Electricals.jpg";
import handyman from "../../../../../public/handyman.jpeg";
import outdoor from "../../../../../public/outdoor.jpg";
import plumbing from "../../../../../public/plumbing.jpg";


const providers = [
    {
        id: 1,
        name: "John’s Handyman Services",
        category: "Handyman",
        rating: 4.9,
        reviews: 128,
        image: handyman,
    },
    {
        id: 2,
        name: "GreenLeaf Landscaping",
        category: "Landscaping",
        rating: 4.8,
        reviews: 97,
        image: outdoor,
    },
    {
        id: 3,
        name: "AquaPro Plumbing",
        category: "Plumbing",
        rating: 5.0,
        reviews: 156,
        image: plumbing,
    },
    {
        id: 4,
        name: "SmartFix Electricals",
        category: "Electrical",
        rating: 4.7,
        reviews: 88,
        image: Electricals,
    },
    {
        id: 1,
        name: "John’s Handyman Services",
        category: "Handyman",
        rating: 4.9,
        reviews: 128,
        image: handyman,
    },
    {
        id: 2,
        name: "GreenLeaf Landscaping",
        category: "Landscaping",
        rating: 4.8,
        reviews: 97,
        image: outdoor,
    },
    {
        id: 3,
        name: "AquaPro Plumbing",
        category: "Plumbing",
        rating: 5.0,
        reviews: 156,
        image: plumbing,
    },
    {
        id: 4,
        name: "SmartFix Electricals",
        category: "Electrical",
        rating: 4.7,
        reviews: 88,
        image: Electricals,
    },
    {
        id: 1,
        name: "John’s Handyman Services",
        category: "Handyman",
        rating: 4.9,
        reviews: 128,
        image: handyman,
    },
    {
        id: 2,
        name: "GreenLeaf Landscaping",
        category: "Landscaping",
        rating: 4.8,
        reviews: 97,
        image: outdoor,
    },
    {
        id: 3,
        name: "AquaPro Plumbing",
        category: "Plumbing",
        rating: 5.0,
        reviews: 156,
        image: plumbing,
    },
    {
        id: 4,
        name: "SmartFix Electricals",
        category: "Electrical",
        rating: 4.7,
        reviews: 88,
        image: Electricals,
    },
    {
        id: 1,
        name: "John’s Handyman Services",
        category: "Handyman",
        rating: 4.9,
        reviews: 128,
        image: handyman,
    },
    {
        id: 2,
        name: "GreenLeaf Landscaping",
        category: "Landscaping",
        rating: 4.8,
        reviews: 97,
        image: outdoor,
    },
    {
        id: 3,
        name: "AquaPro Plumbing",
        category: "Plumbing",
        rating: 5.0,
        reviews: 156,
        image: plumbing,
    },
    {
        id: 4,
        name: "SmartFix Electricals",
        category: "Electrical",
        rating: 4.7,
        reviews: 88,
        image: Electricals,
    },
];

export default function FeaturedProvidersSection() {
    const params = useParams()
    const query = useSearchParams();
    const pathName = usePathname();
    const search = query.get('q');
    return (
        <section className="py-20 bg-white text-black relative">
            <div className="container mx-auto px-6 md:px-10 lg:px-16">


                <div className="flex flex-col md:flex-row items-center justify-between w-full bg-sky-50 mb-10 px-1 md:px-5 py-3 rounded-2xl shadow-sm border border-sky-100">

                    {/* Left Title */}
                    <h2 className="text-xl md:text-3xl font-semibold text-gray-800 text-nowrap flex flex-col md:flex-row items-center gap-2">
                        <span>
                            Search For:
                        </span>
                        <span className="text-sm lg:text-2xl text-gray-600">
                            {pathName.split("/")[pathName.split("/").length - 2].toLocaleUpperCase()} , {pathName.split("/")[pathName.split("/").length - 1].toLocaleUpperCase()}
                        </span>

                    </h2>

                    {/* Right Dropdown */}
                    <div className="flex mt-3 md:mt-0 items-center justify-end w-full">
                        <select className="px-1 md:px-5 w-full md:w-fit py-2 bg-white border border-gray-300 rounded-lg shadow-sm text-gray-700 focus:ring-2 focus:ring-[var(--brandColor)] focus:outline-none cursor-pointer">

                            <option>Aurora</option>
                            <option>ANTIOCH</option>
                            <option>ARLINGTON HEIGHTS</option>
                            <option>ELK GROVE VILLAGE</option>
                            <option>BARRINGTON</option>
                            <option>CRYSTAL LAKE</option>
                            <option>CARY</option>
                            <option>DEERFIELD</option>
                            <option>DES PLAINES</option>
                            <option>FOX LAKE</option>
                            <option>FOX RIVER GROVE</option>
                            <option>GLENCOE</option>
                            <option>GLENVIEW</option>
                            <option>GRAYSLAKE</option>
                            <option>GURNEE</option>
                            <option>HARVARD</option>
                            <option>HIGHLAND PARK</option>
                            <option>LAKE BLUFF</option>
                            <option>LAKE FOREST</option>
                            <option>LAKE VILLA</option>
                            <option>LAKE ZURICH</option>
                            <option>LIBERTYVILLE</option>
                            <option>MCHENRY</option>
                            <option>MORTON GROVE</option>
                            <option>MOUNT PROSPECT</option>
                            <option>MUNDELEIN</option>

                        </select>
                    </div>
                </div>


                {/* Providers Grid */}
                <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-8">
                    {providers.map((provider, index) => (
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
                                    src={provider.image}
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
                                            fill={i < Math.round(provider.rating) ? "currentColor" : "none"}
                                            strokeWidth={1.5}
                                        />
                                    ))}
                                    <span className="text-gray-600 text-sm ml-1">
                                        ({provider.reviews} reviews)
                                    </span>
                                </div>

                                <Link
                                    href={`/services/handyman/carpentry/${provider.id}`}
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
