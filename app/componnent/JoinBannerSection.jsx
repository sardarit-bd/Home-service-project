"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function JoinBannerSection() {
    return (
        <section className="relative py-20 overflow-hidden">

            <div className="container mx-auto px-6 md:px-10 lg:px-16 text-center text-white relative z-10">
                {/* Title */}
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-3xl md:text-4xl font-bold mb-4 text-black"
                >
                    Join <span className="text-[var(--brandColor)]">Home Services Chicago</span> Today
                </motion.h2>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="text-lg max-w-2xl mx-auto text-gray-700 mb-10"
                >
                    Whether you’re a homeowner looking for trusted professionals or a
                    service provider wanting to reach new clients — join our growing community today.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="flex flex-col md:flex-row justify-center items-center gap-5"
                >
                    <Link
                        href="/services/handyman/carpentry"
                        className="px-8 py-3 rounded-full font-semibold bg-white text-[var(--brandBg)] hover:bg-gray-100 transition"
                    >
                        Join as a User
                    </Link>
                    <Link
                        href="/signin"
                        className="px-8 py-3 rounded-full font-semibold border-2 border-gray-400 text-gray-700 hover:bg-white hover:text-[var(--brandBg)] transition"
                    >
                        Join as a Service Provider
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
