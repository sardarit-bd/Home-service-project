"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Play, Search } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function HeroSection() {
    const router = useRouter();
    const [showVideo, setShowVideo] = useState(false);

    const handleSearch = (e) => {
        e.preventDefault();
        const form = e.target;

        console.log("Search query:", form[0].value);
        // For simplicity, redirecting to a fixed service page

        router.push(`/services/handyman/carpentry?q=${form[0].value}`);

    };


    return (
        <section className="relative h-[95vh] bg-whtie text-black overflow-hidden py-16 md:py-24">

            <div className="container md:flex items-center  mx-auto px-2 md:px-7 text-center md:text-left">
                <div>
                    {/* Headline */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4"
                    >
                        Find, Review & Hire the Best{" "}
                        <br />
                        <span className="text-[var(--brandColor,#00a6f4)]">Home Service Providers</span>
                        <br /> in Chicago
                    </motion.h1>

                    {/* Subheadline */}
                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.7 }}
                        className="text-lg md:text-xl text-gray-800 max-w-2xl mb-8"
                    >
                        Compare trusted local professionals for plumbing, electrical, remodeling,
                        cleaning, landscaping, and more — all reviewed by real Chicago homeowners.
                    </motion.p>

                    {/* Search Bar */}
                    <motion.form
                        onSubmit={(e) => { handleSearch(e) }}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.7 }}
                        className="flex relative z-50 items-center justify-center md:justify-start bg-white/90 backdrop-blur-md rounded-full p-2 pl-4 w-full max-w-2xl mx-auto md:mx-0"
                    >
                        <Search className="text-gray-600" size={22} />
                        <input
                            type="text"
                            placeholder="Search services or area (e.g., Plumbing in Lakeview)"
                            className="flex-1 bg-transparent outline-none px-3 text-gray-800 placeholder-gray-500"
                        />
                        <button type="submit" className="bg-[var(--brandColor,#00a6f4)] text-white px-6 py-2 rounded-full font-semibold hover:opacity-90 transition-all">
                            Search
                        </button>
                    </motion.form>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.7 }}
                        className="flex flex-col md:flex-row relative z-50 items-center justify-center md:justify-start gap-4 mt-10"
                    >
                        <Link
                            href="/services/handyman/carpentry"
                            className="px-8 py-3 bg-white text-[var(--brandColor,#00a6f4)] font-semibold rounded-full shadow hover:bg-gray-100 transition-all"
                        >
                            Write a Review
                        </Link>
                        <Link
                            href="/signin"
                            className="px-8 py-3 border border-gray-400 text-gray-500 font-semibold rounded-full hover:bg-white/10 transition-all"
                        >
                            Join as a Service Provider
                        </Link>
                    </motion.div>
                </div>

                {/* ---------- RIGHT SIDE VIDEO BUTTON ---------- */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.7 }}
                    className="flex justify-center md:justify-end items-center flex-1 relative"
                >
                    <button
                        onClick={() => setShowVideo(true)}
                        className="w-[350px] h-[350px] md:w-[360px] md:h-[360px] rounded-full flex items-center justify-center bg-gradient-to-tr from-[var(--brandColor,#00a6f4)] to-sky-400 shadow-lg hover:scale-105 transition-transform animate-spin-smooth"
                    >
                        <Play size={200} className="text-white ml-1" />
                    </button>


                </motion.div>
            </div>
            {/* ---------- VIDEO POPUP MODAL ---------- */}
            <AnimatePresence>
                {showVideo && (
                    <motion.div
                        className="fixed inset-0 bg-black/70 flex items-center justify-center z-[999]"
                        initial={{ opacity: .5 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: .5, y: 30 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.8, opacity: 0, y: 30 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            className="relative bg-white rounded-xl shadow-xl overflow-hidden w-[90%] max-w-3xl aspect-video"
                        >
                            <iframe width="560" height="315" src="https://www.youtube.com/embed/QTXSmRAan5U?si=OMtRjiZthpCxILja&amp;controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen className="w-full h-full"></iframe>

                            {/* Close button */}
                            <button
                                onClick={() => setShowVideo(false)}
                                className="absolute top-3 right-3 bg-white/80 hover:bg-white text-black font-bold rounded-full w-8 h-8 flex items-center justify-center"
                            >
                                ×
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Decorative wave / bottom shape */}
            <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#00a6f4" fill-opacity="1" d="M0,160L60,181.3C120,203,240,245,360,229.3C480,213,600,139,720,106.7C840,75,960,85,1080,106.7C1200,128,1320,160,1380,176L1440,192L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path></svg>
            </div>
        </section >
    );
}











