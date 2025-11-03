"use client";

import { motion } from "framer-motion";
import { Clock, MapPin, ShieldCheck, ThumbsUp } from "lucide-react";

const benefits = [
    {
        icon: <ShieldCheck size={38} />,
        title: "Verified & Trusted Pros",
        description:
            "All our service providers are vetted and reviewed by real homeowners, ensuring quality and professionalism every time.",
    },
    {
        icon: <Clock size={38} />,
        title: "Fast Response Time",
        description:
            "Get quick responses and estimates from local experts who value your time and handle your service requests promptly.",
    },
    {
        icon: <ThumbsUp size={38} />,
        title: "Top-Rated Quality",
        description:
            "We feature only the best-rated professionals — ensuring every project meets high standards of workmanship and service.",
    },
    {
        icon: <MapPin size={38} />,
        title: "Local Chicago Experts",
        description:
            "Connect with home service professionals right in your neighborhood — supporting the Chicago community while saving time.",
    },
];

export default function WhyChooseUsSection() {
    return (
        <section className="py-20 bg-gray-50 text-black relative">
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
                        Why <span className="text-[var(--brandColor)]">Choose Us</span>
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        We make finding and reviewing home service professionals in Chicago
                        effortless, reliable, and transparent.
                    </p>
                </motion.div>

                {/* Benefits Grid */}
                <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-8">
                    {benefits.map((benefit, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.15, duration: 0.5 }}
                            className="bg-white p-8 rounded-[var(--radius-card)] shadow-md hover:shadow-xl transition group text-center"
                        >
                            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-5 rounded-full bg-[var(--brandBg)] text-white group-hover:scale-110 transition-transform">
                                {benefit.icon}
                            </div>
                            <h3 className="font-semibold text-lg text-gray-900 mb-2">
                                {benefit.title}
                            </h3>
                            <p className="text-gray-600 text-sm">{benefit.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
