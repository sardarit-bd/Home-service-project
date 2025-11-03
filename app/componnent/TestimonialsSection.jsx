"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import Image from "next/image";
import profileD from "../../public/profileD.png";

// 🧭 Import Swiper core and required modules
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const testimonials = [
    {
        id: 1,
        name: "Emily Johnson",
        role: "Homeowner - Chicago, IL",
        image: profileD,
        review:
            "I found an amazing electrician through this platform. The service was quick, professional, and reasonably priced. Definitely my go-to for all home repairs!",
        rating: 5,
    },
    {
        id: 2,
        name: "Michael Smith",
        role: "Landlord - Lincoln Park",
        image: profileD,
        review:
            "The site makes it super easy to find trusted plumbers. Reading real reviews helped me choose the right one. Excellent experience overall.",
        rating: 4,
    },
    {
        id: 3,
        name: "Sarah Williams",
        role: "Homeowner - Downtown Chicago",
        image: profileD,
        review:
            "I loved how quickly I could connect with landscapers and compare options. The reviews were spot-on. Highly recommend this service!",
        rating: 5,
    },
    {
        id: 4,
        name: "James Lee",
        role: "Property Manager - Uptown",
        image: profileD,
        review:
            "Very intuitive platform — easy to navigate and book. The professionals I hired through here were fantastic!",
        rating: 5,
    },
    {
        id: 5,
        name: "Emily Johnson",
        role: "Homeowner - Chicago, IL",
        image: profileD,
        review:
            "I found an amazing electrician through this platform. The service was quick, professional, and reasonably priced. Definitely my go-to for all home repairs!",
        rating: 5,
    },
    {
        id: 6,
        name: "Michael Smith",
        role: "Landlord - Lincoln Park",
        image: profileD,
        review:
            "The site makes it super easy to find trusted plumbers. Reading real reviews helped me choose the right one. Excellent experience overall.",
        rating: 4,
    },
    {
        id: 7,
        name: "Sarah Williams",
        role: "Homeowner - Downtown Chicago",
        image: profileD,
        review:
            "I loved how quickly I could connect with landscapers and compare options. The reviews were spot-on. Highly recommend this service!",
        rating: 5,
    },
    {
        id: 8,
        name: "James Lee",
        role: "Property Manager - Uptown",
        image: profileD,
        review:
            "Very intuitive platform — easy to navigate and book. The professionals I hired through here were fantastic!",
        rating: 5,
    },
];

export default function TestimonialsSection() {
    return (
        <section className="py-20 bg-white text-black relative overflow-hidden">
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
                        What Our{" "}
                        <span className="text-[var(--brandColor)]">Users Say</span>
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Real experiences from homeowners and service providers who trust
                        our platform to connect and collaborate.
                    </p>
                </motion.div>

                {/* Slider */}
                <Swiper
                    modules={[Autoplay, Pagination]}
                    spaceBetween={30}
                    slidesPerView={1}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        clickable: true,
                        bulletActiveClass: "swiper-pagination-bullet-active",
                    }}
                    breakpoints={{
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                    }}
                    className="h-fit pb-12"
                >
                    {testimonials.map((testimonial, index) => (
                        <SwiperSlide key={testimonial.id}>
                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.15, duration: 0.6 }}
                                className="bg-gray-50 rounded-[var(--radius-card)] shadow-md hover:shadow-xl transition p-8 text-center h-full flex flex-col justify-between"
                            >
                                {/* User Image */}
                                <div className="relative w-20 h-20 mx-auto mb-5">
                                    <Image
                                        src={testimonial.image}
                                        alt={testimonial.name}
                                        fill
                                        className="object-cover rounded-full border-4 border-[var(--brandBg)]"
                                    />
                                </div>

                                {/* Stars */}
                                <div className="flex justify-center mb-4 text-[var(--brandColor)]">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <Star
                                            key={i}
                                            size={18}
                                            fill={i < testimonial.rating ? "currentColor" : "none"}
                                            strokeWidth={1.5}
                                        />
                                    ))}
                                </div>

                                {/* Review Text */}
                                <p className="text-gray-700 text-sm mb-5 italic leading-relaxed">
                                    “{testimonial.review}”
                                </p>

                                {/* User Info */}
                                <div>
                                    <h4 className="font-semibold text-gray-900">
                                        {testimonial.name}
                                    </h4>
                                    <p className="text-xs text-gray-500">{testimonial.role}</p>
                                </div>
                            </motion.div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* Background Accent */}
            <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-[var(--brandBg)]/10 rounded-full blur-3xl"></div>
        </section>
    );
}

