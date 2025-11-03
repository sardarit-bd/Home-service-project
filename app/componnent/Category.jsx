"use client";

import { motion } from "framer-motion";
import { Droplets, Leaf, Wrench } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import handyman from "../../public/handyman.jpeg";
import outdoor from "../../public/outdoor.jpg";
import plumbing from "../../public/plumbing.jpg";

const services = [
    {
        title: "Handyman Services",
        description:
            "From carpentry and electrical work to painting and moving help — our verified professionals handle every household task with precision and care.",
        icon: <Wrench size={36} />,
        link: "/services/handyman",
        image: handyman,
    },
    {
        title: "Landscaping & Outdoor",
        description:
            "Beautify your outdoors with expert lawn care, patio design, fencing, and full landscaping solutions crafted for Chicago homes.",
        icon: <Leaf size={36} />,
        link: "/services/landscaping",
        image: outdoor,
    },
    {
        title: "Plumbing Solutions",
        description:
            "Licensed plumbers ready to fix leaks, install water heaters, and repair systems — ensuring your home runs smoothly, inside and out.",
        icon: <Droplets size={36} />,
        link: "/services/plumbing",
        image: plumbing,
    },
];

export default function AfterHeroSection() {
    return (
        <section className="relative py-20 bg-white text-black">
            <div className="container mx-auto px-6 md:px-10 lg:px-16">
                {/* Section Title */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-14"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-3">
                        Explore Our{" "}
                        <span className="text-[var(--brandColor)]">Home Services</span>
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Choose from trusted professionals across Chicago — whether you need
                        repairs, renovation, or maintenance.
                    </p>
                </motion.div>

                {/* Services Grid */}
                <div className="grid md:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2, duration: 0.6 }}
                            className="group rounded-[var(--radius-card)] overflow-hidden shadow-md hover:shadow-xl transition bg-white"
                        >
                            {/* Image */}
                            <div className="relative h-56 overflow-hidden">
                                <Image
                                    src={service.image}
                                    alt={service.title}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition"></div>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <div className="text-[var(--brandColor)] mb-3">
                                    {service.icon}
                                </div>
                                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                                <p className="text-gray-600 mb-5">{service.description}</p>

                                <Link
                                    href={service.link}
                                    className="inline-block font-semibold text-[var(--brandColor)] hover:underline"
                                >
                                    Learn More →
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
