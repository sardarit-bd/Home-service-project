"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import aboutImage from "../../../public/home-service-bg.jpg";


export default function AboutPage() {
    return (
        <section className="min-h-screen bg-white text-gray-800">
            {/* === Hero / Intro Section === */}
            <div className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                <Image
                    src={aboutImage}
                    alt="About Home Services Review"
                    fill
                    className="object-cover brightness-[0.55]"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-transparent" />
                <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    className="relative z-10 text-center px-4"
                >
                    <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg">
                        About <span className="text-[var(--brandColor,#00a6f4)]">Home Service</span>
                    </h1>
                    <p className="mt-4 text-lg text-gray-200 max-w-2xl mx-auto">
                        Building trust between homeowners and service professionals — one review at a time.
                    </p>
                </motion.div>
            </div>

            {/* === Mission Section === */}
            <div className="container mx-auto px-6 md:px-10 lg:px-16 py-16">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[var(--brandColor,#00a6f4)]">
                            Our Mission
                        </h2>
                        <p className="text-lg text-gray-700 leading-relaxed mb-4">
                            We’re on a mission to simplify how Chicago homeowners find trusted,
                            qualified professionals for every home service — from plumbing to painting,
                            and everything in between.
                        </p>
                        <p className="text-lg text-gray-700 leading-relaxed">
                            Our platform empowers users to make informed decisions based on verified reviews,
                            while giving skilled service providers the visibility and credibility they deserve.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="relative w-full h-[350px] rounded-xl overflow-hidden shadow-lg"
                    >
                        <Image
                            src={aboutImage}
                            alt="Mission - Trusted Home Services"
                            fill
                            className="object-cover"
                        />
                    </motion.div>
                </div>
            </div>

            {/* === Values Section === */}
            <div className="bg-[var(--brandBg,#f8fcfd)] py-16">
                <div className="container mx-auto px-6 md:px-10 lg:px-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-3xl md:text-4xl font-bold text-center mb-12 text-[var(--brandColor,#00a6f4)]"
                    >
                        Our Core Values
                    </motion.h2>

                    <div className="grid md:grid-cols-3 gap-10">
                        {[
                            {
                                title: "Trust & Transparency",
                                desc: "Every review is from real users, verified to maintain honesty and fairness.",
                                icon: "🤝",
                            },
                            {
                                title: "Quality Service",
                                desc: "We promote reliable, licensed professionals with proven records of excellence.",
                                icon: "🏆",
                            },
                            {
                                title: "Community First",
                                desc: "Built by Chicagoans, for Chicagoans — supporting local talent and honest work.",
                                icon: "🏙️",
                            },
                        ].map((value, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 25 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2, duration: 0.5 }}
                                className="bg-white shadow-lg rounded-xl p-8 text-center hover:shadow-[0_0_20px_rgba(4,210,240,0.15)] transition-all"
                            >
                                <div className="text-5xl mb-4">{value.icon}</div>
                                <h3 className="text-xl font-semibold mb-3 text-gray-800">
                                    {value.title}
                                </h3>
                                <p className="text-gray-600">{value.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* === CTA Section === */}
            <div className="container mx-auto px-6 md:px-10 lg:px-16 py-20 text-center">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-3xl md:text-4xl font-bold mb-4"
                >
                    Ready to Join the <span className="text-[var(--brandColor,#00a6f4)]">Community?</span>
                </motion.h2>
                <p className="text-gray-600 max-w-2xl mx-auto mb-8 text-lg">
                    Whether you’re a homeowner looking to find trusted help or a professional ready to grow your reputation — Home Service Reviews connects you to the right people.
                </p>

                <div className="flex flex-col md:flex-row justify-center items-center gap-5">
                    <Link
                        href="/services/handyman/carpentry"
                        className="px-8 py-3 bg-[var(--brandColor,#00a6f4)] text-white font-semibold rounded-full shadow hover:opacity-90 transition-all"
                    >
                        Write a Review
                    </Link>
                    <Link
                        href="/signin"
                        className="px-8 py-3 border border-[var(--brandColor,#00a6f4)] text-[var(--brandColor,#00a6f4)] font-semibold rounded-full hover:bg-[var(--brandColor,#00a6f4)] hover:text-white transition-all"
                    >
                        Join as Provider
                    </Link>
                </div>
            </div>
        </section>
    );
}
