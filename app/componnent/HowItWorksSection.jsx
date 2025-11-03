"use client";

import { motion } from "framer-motion";
import { Handshake, Search, Star } from "lucide-react";

const steps = [
    {
        icon: <Search size={40} />,
        title: "Search for a Service",
        description:
            "Browse verified professionals across Chicago in categories like Handyman, Landscaping, and Plumbing — all in one place.",
    },
    {
        icon: <Star size={40} />,
        title: "Read & Leave Reviews",
        description:
            "Check authentic reviews from local homeowners and share your own experiences to help others make informed choices.",
    },
    {
        icon: <Handshake size={40} />,
        title: "Connect & Hire",
        description:
            "Reach out directly to the provider that fits your needs, compare quotes, and schedule your service seamlessly.",
    },
];

export default function HowItWorksSection() {
    return (
        <section className="py-20 bg-gray-50 text-black relative">
            <div className="container mx-auto px-6 md:px-10 lg:px-16">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-14"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-3">
                        How It <span className="text-[var(--brandColor)]">Works</span>
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Simple steps to find trusted professionals and keep your home in top shape.
                    </p>
                </motion.div>

                {/* Steps Grid */}
                <div className="grid md:grid-cols-3 gap-8">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2, duration: 0.6 }}
                            className="bg-white rounded-[var(--radius-card)] p-8 text-center shadow-md hover:shadow-xl transition group"
                        >
                            <div className="inline-flex items-center justify-center w-16 h-16 mx-auto rounded-full bg-[var(--brandBg)] text-white mb-6 group-hover:scale-110 transition-transform">
                                {step.icon}
                            </div>
                            <h3 className="text-xl font-semibold mb-3 text-gray-900">
                                {step.title}
                            </h3>
                            <p className="text-gray-600">{step.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
