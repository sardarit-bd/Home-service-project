"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";

export default function ContactPage() {
    return (
        <section className="relative min-h-screen text-black bg-white overflow-hidden py-16 md:py-24">

            <div className="container mx-auto px-6 md:px-10 lg:px-16 relative z-10">
                {/* Title */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-4xl md:text-5xl font-bold text-black text-center mb-4"
                >
                    Get in <span className="text-[var(--brandColor)]">Touch</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="text-gray-700 text-center max-w-2xl mx-auto mb-12"
                >
                    Have questions or want to get in touch? Our team is here to help. Fill out the form below, and we’ll respond as soon as possible.
                </motion.p>

                <div className="grid md:grid-cols-2 gap-10 bg-white/90 backdrop-blur-md p-8 md:p-12 rounded-[var(--radius-card)] shadow-lg">
                    {/* Contact Form */}
                    <motion.form
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="space-y-5"
                        onSubmit={(e) => e.preventDefault()}
                    >
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Full Name
                            </label>
                            <input
                                type="text"
                                placeholder="John Doe"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--brandColor)]"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Email Address
                            </label>
                            <input
                                type="email"
                                placeholder="you@example.com"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--brandColor)]"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Message
                            </label>
                            <textarea
                                rows="4"
                                placeholder="Write your message..."
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--brandColor)]"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3 font-semibold text-white rounded-lg bg-[var(--brandBg)] hover:opacity-90 transition"
                        >
                            Send Message
                        </button>
                    </motion.form>

                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="flex flex-col justify-center space-y-6"
                    >
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-[var(--brandBg)] rounded-full text-white">
                                <MapPin size={22} />
                            </div>
                            <p className="text-gray-800 font-medium">
                                Chicago, IL, United States
                            </p>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-[var(--brandBg)] rounded-full text-white">
                                <Phone size={22} />
                            </div>
                            <p className="text-gray-800 font-medium">+1 (312) 555-1234</p>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-[var(--brandBg)] rounded-full text-white">
                                <Mail size={22} />
                            </div>
                            <p className="text-gray-800 font-medium">
                                support@homeserviceschi.com
                            </p>
                        </div>

                        <div className="mt-6">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2968.9672374934684!2d-87.62979868455436!3d41.87811317922061!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880e2ca54089c9bb%3A0xbbbdf52b24476d6d!2sChicago%2C%20IL!5e0!3m2!1sen!2sus!4v1687439323457!5m2!1sen!2sus"
                                width="100%"
                                height="220"
                                allowFullScreen=""
                                loading="lazy"
                                className="rounded-lg border border-gray-300"
                            ></iframe>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
