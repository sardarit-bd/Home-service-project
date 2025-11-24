"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import HeroSearchBar from "./HeroSearchBar";

export default function HeroSection() {


    return (
        <section className="relative h-[95vh] bg-whtie text-black overflow-hidden py-16 md:py-24">

            <div className="container md:flex items-center justify-center  mx-auto px-2 md:px-7 text-center md:text-center">
                <div className="">
                    {/* Headline */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        className="text-3xl text-gray-700 font-semibold md:text-5xl font-bold leading-tight mb-4"
                    >
                        Find, Review & Hire the Best{" "}
                        <br />
                        <span className="text-[var(--brandColor,#00a6f4)]">Home Service Providers </span>
                        in Chicago
                    </motion.h1>

                    {/* Subheadline */}
                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.7 }}
                        className="text-lg py-1 text-center md:text-xl text-gray-400 max-w-3xl mx-auto mb-8"
                    >
                        Compare trusted local professionals for plumbing, electrical, remodeling,
                        cleaning, landscaping, and more — all reviewed by real Chicago homeowners.
                    </motion.p>

                    <HeroSearchBar />
                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.7 }}
                        className="flex flex-col md:flex-row relative z-50 items-center justify-center  gap-4 mt-11" style={{ zIndex: "0" }}
                    >
                        <Link
                            href="/services/handyman/carpentry"
                            className="px-8 py-3 bg-white text-[var(--brandColor,#00a6f4)] font-semibold rounded-full shadow hover:bg-gray-100 transition-all "
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
            </div>


            {/* Decorative wave / bottom shape */}
            {/* <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#00a6f4" fillOpacity="1" d="M0,160L60,181.3C120,203,240,245,360,229.3C480,213,600,139,720,106.7C840,75,960,85,1080,106.7C1200,128,1320,160,1380,176L1440,192L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path></svg>
            </div> */}
        </section >
    );
}











