"use client";

import { motion } from "framer-motion";
import { CheckCircle, Mail, MapPin, Phone, Star } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import bg from "../../../../../../public/home-service-bg.jpg";

export default function ServiceDetailsPage() {
    const [reviews, setReviews] = useState([
        {
            id: 1,
            name: "Emily Johnson",
            rating: 5,
            text: "Incredible craftsmanship! The handyman was polite, professional, and quick to finish the repairs.",
        },
        {
            id: 2,
            name: "Michael Smith",
            rating: 4,
            text: "Great value for money. Arrived on time and fixed multiple issues efficiently.",
        },
    ]);

    const [newReview, setNewReview] = useState({ name: "", rating: 5, text: "" });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newReview.name && newReview.text) {
            setReviews([{ ...newReview, id: Date.now() }, ...reviews]);
            setNewReview({ name: "", rating: 5, text: "" });
        }
    };

    return (
        <section className="bg-gradient-to-b from-gray-50 to-white text-black py-12">
            <div className="container mx-auto px-6 md:px-10 lg:px-16 grid md:grid-cols-3 gap-8 ">
                {/* LEFT: MAIN DETAILS */}
                <div className="md:col-span-2 space-y-10 bg-white rounded-lg p-10 shadow-lg">
                    {/* HEADER */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h1 className="text-4xl font-bold mb-3 text-[var(--brandColor)]">
                            FixRight Handyman
                        </h1>
                        <div className="flex items-center gap-1 text-[var(--brandColor)] mb-3">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                    key={i}
                                    size={18}
                                    fill={i < 5 ? "currentColor" : "none"}
                                    strokeWidth={1.5}
                                />
                            ))}
                            <span className="text-gray-600 ml-2 text-sm">(128 reviews)</span>
                        </div>
                        <p className="text-gray-700 max-w-2xl leading-relaxed">
                            Reliable, experienced, and affordable handyman services across Chicago — handling everything from minor repairs to full home maintenance.
                        </p>
                    </motion.div>

                    {/* CONTACT INFO */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="bg-white/90 backdrop-blur-sm border border-gray-100 p-6 rounded-[var(--radius-card)] shadow-md hover:shadow-lg transition"
                    >
                        <h2 className="text-xl font-semibold mb-5 text-[var(--brandColor)] border-b pb-2 border-gray-200">
                            Contact Information
                        </h2>
                        <div className="grid sm:grid-cols-2 gap-3 text-gray-700">
                            <p className="flex items-center gap-2">
                                <Phone size={18} className="text-[var(--brandColor)]" />
                                +1 (312) 555-1234
                            </p>
                            <p className="flex items-center gap-2">
                                <Mail size={18} className="text-[var(--brandColor)]" />
                                fixright@homeserviceschi.com
                            </p>
                            <p className="flex items-center gap-2 sm:col-span-2">
                                <MapPin size={18} className="text-[var(--brandColor)]" />
                                Chicago, IL 60616
                            </p>
                        </div>
                    </motion.div>

                    {/* OFFERINGS */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="bg-white p-6 rounded-[var(--radius-card)] shadow-md hover:shadow-lg transition"
                    >
                        <h2 className="text-xl font-semibold mb-5 text-[var(--brandColor)] border-b pb-2 border-gray-200">
                            Services Offered
                        </h2>
                        <ul className="grid sm:grid-cols-2 gap-3 text-gray-700">
                            {[
                                "Carpentry & Furniture Repair",
                                "Door, Window & Drywall Installation",
                                "Electrical & Plumbing Maintenance",
                                "Interior & Exterior Painting",
                                "Appliance Setup & TV Mounting",
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-2">
                                    <CheckCircle
                                        size={18}
                                        className="text-[var(--brandColor)] flex-shrink-0"
                                    />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* REVIEWS */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="bg-white p-6 rounded-[var(--radius-card)] shadow-md hover:shadow-lg transition"
                    >
                        <h2 className="text-xl font-semibold mb-5 text-[var(--brandColor)] border-b pb-2 border-gray-200">
                            Customer Reviews
                        </h2>

                        {/* Existing Reviews */}
                        <div className="space-y-6 mb-10">
                            {reviews.map((r) => (
                                <div
                                    key={r.id}
                                    className="p-4 bg-gray-50 rounded-lg border border-gray-100"
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <h4 className="font-semibold text-gray-900">{r.name}</h4>
                                        <div className="flex text-[var(--brandColor)]">
                                            {Array.from({ length: 5 }).map((_, i) => (
                                                <Star
                                                    key={i}
                                                    size={14}
                                                    fill={i < r.rating ? "currentColor" : "none"}
                                                    strokeWidth={1.5}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                    <p className="text-gray-700 text-sm leading-relaxed">{r.text}</p>
                                </div>
                            ))}
                        </div>

                        {/* Add Review */}
                        <form onSubmit={handleSubmit} className="border-t pt-6">
                            <h3 className="font-semibold text-gray-900 mb-4 text-lg">
                                Write a Review
                            </h3>
                            <div className="grid gap-3 mb-4">
                                <input
                                    type="text"
                                    placeholder="Your Name"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--brandColor)]"
                                    value={newReview.name}
                                    onChange={(e) =>
                                        setNewReview({ ...newReview, name: e.target.value })
                                    }
                                />
                                <textarea
                                    rows="4"
                                    placeholder="Your Review..."
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--brandColor)]"
                                    value={newReview.text}
                                    onChange={(e) =>
                                        setNewReview({ ...newReview, text: e.target.value })
                                    }
                                ></textarea>
                                <div className="flex items-center gap-2">
                                    <label className="text-sm font-medium text-gray-700">
                                        Rating:
                                    </label>
                                    <select
                                        className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brandColor)]"
                                        value={newReview.rating}
                                        onChange={(e) =>
                                            setNewReview({
                                                ...newReview,
                                                rating: parseInt(e.target.value),
                                            })
                                        }
                                    >
                                        {[5, 4, 3, 2, 1].map((num) => (
                                            <option key={num} value={num}>
                                                {num} Stars
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="px-6 py-2 bg-[var(--brandBg)] text-white font-semibold rounded-md hover:opacity-90 transition"
                            >
                                Submit Review
                            </button>
                        </form>
                    </motion.div>
                </div>

                {/* RIGHT: STICKY IMAGE CARD */}
                <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className=" self-start sticky top-[100px] border"
                >
                    <div className="rounded-[var(--radius-card)] overflow-hidden shadow-xl group relative">
                        <Image
                            src={bg}
                            alt="FixRight Handyman"
                            width={600}
                            height={600}
                            className="object-cover w-full h-[450px] group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/30 to-transparent"></div>
                        <div className="absolute bottom-5 left-0 right-0 text-center text-white">
                            <h3 className="text-xl font-semibold mb-1">
                                FixRight Handyman
                            </h3>
                            <p className="text-sm text-gray-200">Chicago, IL</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
